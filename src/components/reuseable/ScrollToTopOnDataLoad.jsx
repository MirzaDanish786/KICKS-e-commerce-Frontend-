
import React, { useEffect } from 'react'

const ScrollToTopOnDataLoad = ({isLoading}) => {
      useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);
  return null
}

export default ScrollToTopOnDataLoad
