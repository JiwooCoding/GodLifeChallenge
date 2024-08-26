import styles from './Loading.module.scss'
import { BeatLoader } from "react-spinners"

const Loading = () => {
  return (
    <div className={styles.loaderContainer }>
      <BeatLoader
        size={10}
        color="gray"
      />
    </div>
  )
}

export default Loading