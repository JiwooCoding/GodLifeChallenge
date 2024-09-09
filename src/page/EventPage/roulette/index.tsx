import RouletteContent from './roulette-content/RouletteContent'
import styles from './roulette-content/RouletteContent.module.scss'
import background from '../../../image/event/roulette.png'

const Roulette = () => {
  return (
    <div>
      <div className={styles.event_top}>
        <h1>룰렛 이벤트🎁💝</h1>
        <div className={styles.event_detail}>
          <p>07.01 MON-09.30 MON</p>
        </div>
      </div>
      <div className={styles.background}>
        <img src={background} alt='background'/>
          <div className={styles.roulette_page}>
            <RouletteContent/>
          </div>
        </div>
      </div>
  )
}

export default Roulette