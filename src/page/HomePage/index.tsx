import main from '../../image/mainpage/mainPageImage.png'
import styles from './HomePage.module.scss'

const Homepage = () => {
  return (
    <div className={styles.main}>
      <img src={main}/>
    </div>
  )
}

export default Homepage