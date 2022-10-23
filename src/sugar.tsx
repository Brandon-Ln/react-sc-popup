import ReactDOM from 'react-dom/client';

import { PopupInstance, PopupProps, UncontrolledPopupProps } from './interface';
import { Popup } from './Popup';

/**
 * 等待被卸载的 Popup 实例列表
 */
const existPopupList: PopupInstance[] = [];

function noop() {}

/**
 * 渲染 Popup 的语法糖
 * @param props 非受控场景下的 props
 * @param root 弹出层渲染的容器
 */
function renderSugarPopup(props: PopupProps, root: ReactDOM.Root) {
  root.render(<Popup {...props} />);
  return root;
}

function unmountSugarPopup(
  mountRoot: ReactDOM.Root,
  rootElement: Element,
  instance: PopupInstance
) {
  mountRoot.unmount();
  const parent = rootElement.parentElement;
  parent && parent.removeChild(rootElement);

  for (let i = 0; i < existPopupList.length; i++) {
    const currInstance = existPopupList[i];
    if (currInstance === instance) {
      existPopupList.splice(i, 1);
    }
  }
}

export function mountSugar(props: UncontrolledPopupProps): PopupInstance {
  const { container = () => document.body } = props;
  // mount root node into the container
  const realElement =
    typeof container === 'string'
      ? (document.querySelector(container) as HTMLElement)
      : typeof container === 'function'
      ? container()
      : container;
  if (!realElement) {
    throw new Error('[React-sc-popup]: Could not find the match element of popup container');
  }
  const div = document.createElement('div');
  realElement.appendChild(div);
  const mountRoot = ReactDOM.createRoot(div);

  Object.assign(props, { container: div });

  const instance: PopupInstance = {
    unmount: noop,
    update: noop,
  };

  // unmount instance method
  const unmount: PopupInstance['unmount'] = () => {
    const onClosedWrapper = () => {
      unmountSugarPopup(mountRoot, div, instance);
      props.onClosed && props.onClosed();
    };
    renderSugarPopup({ ...props, visible: false, onClosed: onClosedWrapper }, mountRoot);
  };

  const onChangeWrapper: PopupProps['onBeforeClose'] = () => {
    props.onChange && props.onChange(false);
    unmount();
  };

  // update instance method
  const update: PopupInstance['update'] = (updateProps: UncontrolledPopupProps) => {
    Object.assign(props, updateProps); // trigger effects
    renderSugarPopup({ ...props, visible: true, onChange: onChangeWrapper }, mountRoot);
  };

  // mount method
  instance.unmount = unmount;
  instance.update = update;

  // enqueue instance
  existPopupList.push(instance);

  // render component
  renderSugarPopup({ ...props, visible: true, onChange: onChangeWrapper }, mountRoot);

  return instance;
}

export function unmountAllSugars() {
  while (existPopupList.length) {
    const currInstance = existPopupList.shift();
    currInstance && currInstance.unmount();
  }
}

export function getAllInstanceSugars() {
  return existPopupList;
}
