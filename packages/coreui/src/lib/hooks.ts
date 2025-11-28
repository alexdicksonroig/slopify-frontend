import { type RefObject, useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
  callback: () => void,
): RefObject<T | null> {
  const elementRef = useRef<T>(null);

  function handleDocumentMouseDown(event: MouseEvent) {
    const element = elementRef.current;
    if (
      element &&
      event.target instanceof Node &&
      !element.contains(event.target)
    ) {
      event.stopPropagation();
      event.preventDefault();
      callback();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseDown);
    };
  }, [callback]);

  return elementRef;
}
