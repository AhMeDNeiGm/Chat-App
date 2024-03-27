import { useState, useEffect, useRef } from 'react'

function useToggle(
  initialState: boolean = false
): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  React.RefObject<HTMLDivElement>
] {
  const [isToggled, setIsToggled] = useState<boolean>(initialState)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsToggled(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return [isToggled, setIsToggled, elementRef]
}

export default useToggle
