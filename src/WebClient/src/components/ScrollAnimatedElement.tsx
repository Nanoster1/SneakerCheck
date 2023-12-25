import React, { useState, useEffect } from 'react'

const ScrollAnimatedElement = ({ children }: { children: React.ReactNode }) => {
  const [isAnimated, setAnimated] = useState(false)
  const [isFixed, setFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('animated-element')
      if (element) {
        const elementRect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        if (elementRect.top < viewportHeight && elementRect.bottom >= 0) {
          setAnimated(true)

          if (elementRect.top <= 0) {
            setFixed(true)
          } else {
            setFixed(false)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div id="animated-element" className={`animated-element ${isAnimated ? 'animated' : ''} ${isFixed ? 'fixed' : ''}`}>
      {children}
    </div>
  )
}

export default ScrollAnimatedElement
