import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.notfound_container}>
        <h1>404</h1>
        <span>This page could not be found.</span>
    </div>
  )
}

export default NotFound