import { useEffect, useRef } from 'react'

export const useInterval = (callback, delay) => {
  const savedCalledback = useRef()
  
  useEffect(() => {
    savedCalledback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCalledback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [callback, delay])
}