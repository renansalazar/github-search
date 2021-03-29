
import Head from 'next/head'
import { useRouter } from 'next/router'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch, faUsers } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()

  const handleClickUser = (e) => {
    e.preventDefault()
    router.push('/users')
  }

  const handleClickRepo = (e) => {
    e.preventDefault()
    router.push('/repos')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Github Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.main__usersearch}>
          <div className={styles.main__referencia}>
            <div type="button" id="button-addon1" className={styles.main__title}>
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h2>Buscar Usuarios en Github</h2>
            <button
              onClick={handleClickUser} 
              className={styles.main__button+" btn btn-outline-secondary"} type="button" id="button-addon1">
              <span>
              Ir a Buscador de Usuarios</span> 
            </button>
          </div>
        </div>
        <div className={styles.main__reposearch}>
          <div className={styles.main__referencia}>
            <div type="button" id="button-addon1" className={styles.main__title}>
              <FontAwesomeIcon icon={faCodeBranch} />
            </div>
              <h2>Buscar Repositorios en Github</h2>
            <button 
              onClick={handleClickRepo} 
              className={styles.main__button+" btn btn-outline-secondary"} type="button" id="button-addon1">
              <span>
              Ir a Buscador de Repos</span> 
            </button>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
