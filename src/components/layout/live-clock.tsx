'use client'

import { useState, useEffect } from 'react'
import { AnimatedClockSegment } from './animated-clock-segment'

// Helper function to format time and pad with leading zeros
const formatTime = (date: Date) => {
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'

  const strHours = hours.toString().padStart(2, '0')
  const strMinutes = minutes.toString().padStart(2, '0')

  return {
    hours: strHours,
    minutes: strMinutes,
    ampm,
  }
}

export function LiveClock() {
  const [time, setTime] = useState(formatTime(new Date()))

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(formatTime(new Date()))
    }, 1000 * 60) // Update every minute

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerId)
  }, [])

  return (
    <div className="hidden md:flex items-center gap-1 font-book text-sm">
      <span className="font-main uppercase">BCN</span>
      <div className="flex">
        <AnimatedClockSegment digit={time.hours[0]} />
        <AnimatedClockSegment digit={time.hours[1]} />
      </div>
      <span className="animate-pulse">:</span>
      <div className="flex">
        <AnimatedClockSegment digit={time.minutes[0]} />
        <AnimatedClockSegment digit={time.minutes[1]} />
      </div>
      <div className="flex">
        <AnimatedClockSegment digit={time.ampm[0]} />
        <AnimatedClockSegment digit={time.ampm[1]} />
      </div>
    </div>
  )
}