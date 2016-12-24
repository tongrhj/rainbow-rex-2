import countdownCss from '../../css/components/Countdown.scss'
import React from 'react'

export default ({timeLeft, totalTime}) => {
  timeLeft = timeLeft / totalTime
  return (
    <div className={countdownCss.countdown}>
      <div className={countdownCss.remaining}
        style={{ width: `${timeLeft * 100}%` }}
      />
    </div>
  )
}
