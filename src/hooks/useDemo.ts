import { useEffect } from 'react';

export function useDemo() {
  useEffect(() => {
    console.log('USE DEMO HOOK EXECUTE.');
  }, []);
}
