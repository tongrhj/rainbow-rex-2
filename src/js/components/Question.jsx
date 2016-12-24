import questionCss from '../../css/components/Question.scss'
import Countdown from './Countdown'
import React, { Component } from 'react'

class Question extends Component {
  constructor (props) {
    super(props)

    const startTime = Date.now() + props.totalTime
    this.state = { startTime }
    this.state.timeleft = this.timeleft()
  }

  timeleft () {
    return this.state.startTime - Date.now()
  }

  componentDidMount () {
    const { onTimeout, totalTime } = this.props

    const to = this.timeout = {}
    to.action = setTimeout(() => {
      onTimeout()
    }, totalTime)

    const loop = () => {
      let timeleft = this.timeleft()
      if (timeleft < 0) timeleft = 0
      this.setState({ timeleft })
      if (!timeleft) return
      to.count = setTimeout(loop, 100)
    }
    loop()
  }

  componentWillUnmount () {
    clearTimeout(this.timeout.action)
    clearTimeout(this.timeout.count)
  }

  render () {
    const { word, colour, readColourRound, totalTime } = this.props
    return (
      <section className={questionCss.card}>
        <p>
          What colour do you <b className={questionCss.highlight}>
            {readColourRound ? 'read' : 'see'}
          </b>?
        </p>
        <Countdown timeLeft={this.state.timeleft} totalTime={totalTime} />
        <h2 className={questionCss[colour]}>{ word }</h2>
      </section>
    )
  }
}

Question.defaultProps = {
  totalTime: 100000
}

export default Question
