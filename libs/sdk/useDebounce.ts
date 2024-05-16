import { useEffect, useRef } from "react";

export function useDebounce(cb: any, deps: any[] = [], delay: number = 500) {
  const timeout = useRef<any>(null);
  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      cb();
    }, delay);
    return () => {
      clearTimeout(timeout.current);
    };
  }, deps);
}
