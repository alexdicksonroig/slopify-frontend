import {useEffect, useRef, RefObject} from 'react'

export function useOutsideClick<T extends HTMLElement>(
  callback: () => void
): RefObject<T | null> {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    function handleDocumentMouseDown(event: MouseEvent) {
      const element = elementRef.current
      if (element && event.target instanceof Node && !element.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleDocumentMouseDown)
    return () => document.removeEventListener('mousedown', handleDocumentMouseDown)
  }, [callback])

  return elementRef
}
