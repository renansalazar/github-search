import styles from '../styles/Footer.module.css'

export default () => {
    return (
      <footer className={styles.footer+" justify-content-md-center"}>
        <a
          href="https://github.com/renansalazar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center"
        >
          Hecho con 💟 por Renan Salazar
        </a>
      </footer>
    )
}