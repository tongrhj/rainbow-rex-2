import styles from '../../css/pages/app.scss'

import buttonCss from '../../css/components/Button.scss'
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
      readColourRound: true, // determines if read or see colour
      gameState: 'playing' // 'waiting', 'playing', 'ended'
    }

    this.onTimeout = this.onTimeout.bind(this)
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
    } else {
      this.setState({ gameState: 'ended' })
    }
  }

  onTimeout () {
    this.setState({ gameState: 'ended' })
  }

  render () {
    return (
      <div>
         { this.state.gameState == 'playing' ?
           (<div>
              <header>
                <h2>{ this.state.score }</h2>
                <Question
                  word={this.state.question.word}
                  colour={this.state.question.colour}
                  readColourRound={this.state.readColourRound}
                  onTimeout={this.onTimeout}
                />
              </header>

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
            </div>) : (<h1>GAME OVER</h1>) }
      </div>
    )
  }
}
