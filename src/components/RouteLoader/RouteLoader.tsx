import styles from './RouteLoader.module.css'

export default function RouteLoader() {
  return (
    <div className={styles.root} aria-label="Loading" role="status">
      <div className={styles.dot} />
    </div>
  )
}
