import appCss from '../../css/pages/app.scss'
import buttonCss from '../../css/components/Button.scss'
import questionCss from '../../css/components/Question.scss'
import React, { Component } from 'react'

import Question from '../components/Question'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      score: 0,
      options: ['red', 'blue', 'green', 'yellow'],
      question: {
        word: '',
        colour: ''
      },
      addTime: 0,
      readColourRound: true, // round types: read colour, see colour
      optionClicked: '',
      correctAnswer: '',
      outOfTime: false, // reasons for game end: out of time, wrong answer
      gameState: 'playing', // 'waiting', 'playing', 'ended'
    }

    this.savedState = this.state
    this.onTimeout = this.onTimeout.bind(this)
    this.onNewGame = this.onNewGame.bind(this)
  }

  randomN (maxN) {
    return Math.floor(maxN * Math.random())
  }

  componentDidMount () {
    this.setRound()
  }

  setRound (previousWord) {
    // Determine Round Modes: read/see? + normal/rainbow?
    this.setState({
      readColourRound: !(this.state.score > 5 && !this.randomN(2 + 10/this.state.score))
    })

    // Set Question
    const decoyList = this.state.options
    const decoy = decoyList[this.randomN(decoyList.length)]
    const answerList = decoyList.filter(colour => colour !== previousWord && colour !== decoy)
    const answer = answerList[this.randomN(answerList.length)]
    this.setState({
      question: {
        word: this.state.readColourRound ? answer : decoy,
        colour: this.state.readColourRound ? decoy : answer
      }
    })
  }

  onButtonClick (e) {
    e.preventDefault()
    const answer = this.state.readColourRound ?
      this.state.question.word : this.state.question.colour
    if (e.target.value === answer) {
      this.setState({ score: this.state.score + 1 })
      this.setRound(this.state.question.word)
      this.setState({ addTime: this.randomN(1000) })
    } else {
      this.setState({ optionClicked: e.target.value, correctAnswer: answer })
      this.setState({ gameState: 'ended' })
    }
  }

  onTimeout () {
    this.setState({ gameState: 'ended' })
    this.setState({ outOfTime: true })
  }

  onNewGame () {
    this.setState(this.savedState)
    this.setRound()
  }

  render () {
    return (
      <div key='game'>
         { this.state.gameState == 'playing' ?
           (<div className={appCss.body}>
              <header>
                <h2 className={appCss.score}>{this.state.score}</h2>
                <Question
                  word={this.state.question.word}
                  colour={this.state.question.colour}
                  readColourRound={this.state.readColourRound}
                  addTime={this.state.addTime}
                  onTimeout={this.onTimeout}
                />
              </header>

              <section className={buttonCss.group}>
                {this.state.options.map(option => {
                  return (
                    <button
                      value={ option }
                      key={ option }
                      onClick={e => this.onButtonClick(e)}
                      className={buttonCss[option]}
                    />
                  )
                })}
              </section>
            </div>) : (
              <div className={appCss.body}>
                <h1 className={appCss.title}>Game Over</h1>

                <h2 className={appCss.finalScore}>Score: {this.state.score}</h2>

                {this.state.outOfTime ? <p className={appCss.footer}>You ran out of time.</p> :
                  (<div className={appCss.smallCard}>
                    <Question
                      word={this.state.question.word}
                      colour={this.state.question.colour}
                      readColourRound={this.state.readColourRound}
                      totalTime={0}
                      addTime={this.state.addTime}
                      onTimeout={() => {}}
                    />
                    <p className={appCss.footer}>
                      You clicked{' '}
                      <b className={questionCss[this.state.optionClicked]}>
                        {this.state.optionClicked}
                      </b> instead of{' '}
                      <b className={questionCss[this.state.correctAnswer]}>
                        {this.state.correctAnswer}
                      </b>.
                    </p>
                  </div>)
                }

                <button className={buttonCss.primaryButton} onClick={this.onNewGame}>Start new game</button>
              </div>
            ) }
      </div>
    )
  }
}
