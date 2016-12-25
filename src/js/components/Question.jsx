import questionCss from '../../css/components/Question.scss'
import Countdown from './Countdown'
import React, { Component } from 'react'

class Question extends Component {
  constructor (props) {
    super(props)

    this.state = {
      timeleft: 10000,
      addTime: props.addTime,
      addedTime: 0
    }
    this.timeout = {}
  }

  componentDidUpdate () {
    const { addTime, onTimeout } = this.props
    if (this.state.addTime !== addTime) {
      this.setState({
        addTime,
        timeleft: this.state.timeleft + addTime
      })
    }
    if (this.timeleft() <= 0) {
      onTimeout()
    }
  }

  componentDidMount () {
    const loop = () => {
      if (this.timeleft() <= 0) return
      this.setState({ timeleft: this.state.timeleft - 100 })
      this.timeout.countdown = setTimeout(loop, 100)
    }
    loop()
  }

  componentWillUnmount () {
    clearTimeout(this.timeout.countdown)
  }

  timeleft () {
    return this.state.timeleft
  }

  render () {
    const { word, colour, readColourRound } = this.props
    return (
      <section className={questionCss.card}>
        { this.props.addTime }{ this.state.timeleft }
        {readColourRound ?
          (<span className={questionCss.highlight}>📖 read</span>) :
          (<span className={questionCss.highlightAlt}>see 👀</span>)}
        <Countdown timeLeft={this.state.timeleft} totalTime={10000} />
        <h2 className={`${questionCss[colour]} ${questionCss.question}`}>{ word }</h2>
      </section>
    )
  }
}

Question.defaultProps = {
  totalTime: 0,
  addTime: 0
}

export default Question
