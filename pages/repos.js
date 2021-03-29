import React, {useState, useEffect} from 'react'
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCodeBranch, faEye, faStar, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Users.module.css'
import { searchRepo, emptyRepo } from '../actions'

const MESSAGES = {
  'msgBienvenida': 'Escriba un criterio de búsqueda para empezar',
  'msgVacio': 'Debe ingresar un criterio de búsqueda',
  'msgError': 'Hubo un error al intentar buscar Usuarios',
  'msgNoResults': 'No se encontraron resultados'
}


export default function Repos() {
  
  const [querySearch, setQuerySearch] = useState('')
  const [message, setMessage] = useState('msgBienvenida')
  const [page, setPage] = useState(1)
  const [moreButton, setMoreButton] = useState(true)

  let repos = useSelector((state) => state.repos.items)
  let loading = useSelector((state) => state.repos.loading)
  let error = useSelector((state) => state.repos.error)
  let dispatch = useDispatch()

  useEffect(()=>{
    if(repos.length==0){
      setMessage('msgNoResults')
      setMoreButton(false)
    }else{
      if(repos.length<20){
        setMoreButton(false)
      }else{
        setMoreButton(true)
      }
    }
  },[repos])

  const handleSearch = async (event) => {
    event.preventDefault()
    if(querySearch!==""){
      dispatch(searchRepo(querySearch, 1))
    }else{
      dispatch(emptyRepo())
      setMessage('msgVacio')
    }
  }

  const handleInputSearch = (event) => {
    setQuerySearch(event.target.value)
  }
  
  const handleMore = async () => {
    dispatch(searchRepo(querySearch, page+1))
    setPage(prev=>prev+1)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Buscar Repositorios en Github</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="w-100">
        <div className={styles.main__usersearch}>
          <h2 className={styles.main__usersearch__title}>Buscar Repositorios en Github</h2>
          <form
            className={styles.main__usersearch__form} 
            onSubmit={handleSearch}>
            <div className="input-group mb-3">
              <input 
                type="text" 
                className="form-control" 
                onChange={handleInputSearch}
                placeholder="Buscar Repositorios en Github" 
                aria-label="Texto de Búsqueda de Repositorio" aria-describedby="button-addon1"
              />
              <button 
                className={styles.main__button+" btn btn-outline-secondary"} 
                type="submit" id="button-addon1"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
          <div className={styles.main__results}>
            {
              loading && repos.length===0?
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              :
                repos.length===0?
                  <div className={error!==null? "alert alert-danger":"alert alert-info"} role="alert">
                    {error!==null? error:MESSAGES[message]}
                  </div>
                :
                  <div>
                  
                    <ul className={styles.results}>
                      {repos.map((repo, indexRepo)=>{
                        return (
                          <li key={indexRepo}>
                            <div className={styles.detail}>
                              <h4>{repo.name}
                              <br/>
                              <a href={repo.html_url} target="__blank">
                                <FontAwesomeIcon icon={faExternalLinkSquareAlt} /> 
                              </a></h4>
                              <p>
                                  {repo.description}
                              </p>
                              <p>
                              {
                                    repo.owner.avatar_url?
                                    <img
                                        src={repo.owner.avatar_url}
                                        alt={"Avatar de "+repo.owner.login}
                                    />
                                    :
                                    <img
                                        src="/img/Octocat.png"
                                        alt={"Avatar Predeterminado"}
                                    />

                                }{" "}
                                 <span>{repo.owner.login}</span>
                                </p>
                                <div className={styles.count}>
                                    <div>
                                        <span><FontAwesomeIcon icon={faStar} /></span>
                                        {repo.stargazers_count}
                                    </div>
                                    <div>
                                        <span><FontAwesomeIcon icon={faEye} /></span>
                                        {repo.watchers_count}
                                    </div>
                                    <div>
                                        <span><FontAwesomeIcon icon={faCodeBranch} /></span>
                                        {repo.forks_count}
                                    </div>
                                </div>
                            </div>
                          </li>
                        )
                      })}
                      {
                        loading?
                          <div className="spinner-border mt-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        :
                          moreButton && 
                          <button
                            className="btn btn-outline-secondary mt-3" 
                            type="button" 
                            id="button-addon1"
                            onClick={handleMore}
                          >
                            Cargar más Repos
                          </button>
                      }
                      
                    </ul>
                  </div>
            }
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
