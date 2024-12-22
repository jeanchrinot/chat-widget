import React, { useState, useEffect } from "react"

interface SwapChildrenProps {
  children: React.ReactNode[]
}

const SwapChildren: React.FC<SwapChildrenProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length)
    }, 5000) // 5 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [children.length])

  return <>{children[currentIndex]}</>
}

export default SwapChildren
