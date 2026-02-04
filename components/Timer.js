import { useEffect, useState } from 'react'
import { Clock, AlertCircle } from 'lucide-react'

export default function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isWarning, setIsWarning] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1
        if (newTime === 300) setIsWarning(true) // 5 minutes warning
        if (newTime === 0) onTimeUp()
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const percentage = (timeLeft / (duration * 60)) * 100

  return (
    <div className={`card mb-6 ${isWarning ? 'border-l-4 border-orange-500' : 'border-l-4 border-indigo-600'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock size={20} className={isWarning ? 'text-orange-600' : 'text-indigo-600'} />
          <span className="font-semibold text-gray-900">Time Remaining</span>
        </div>
        {isWarning && <AlertCircle className="text-orange-600" size={20} />}
      </div>

      <div className="text-3xl font-bold text-center mb-4 font-mono">
        <span className={isWarning ? 'text-orange-600' : 'text-indigo-600'}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            isWarning ? 'bg-orange-500' : 'bg-indigo-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isWarning && (
        <p className="mt-4 text-sm text-orange-600 font-semibold">⚠️ Less than 5 minutes remaining!</p>
      )}
    </div>
  )
}
