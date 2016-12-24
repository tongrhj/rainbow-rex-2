import styles from '../../css/pages/app.scss'
import buttonCss from '../../css/components/Button.scss'
import React from 'react'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <h1>It Works!</h1>
        <p>This React project just works including <span className={styles.redBg}>module</span> local styles.</p>
        <p>Enjoy!</p>
        <button className={buttonCss.primary}>START</button>
      </div>
    )
  }
}
