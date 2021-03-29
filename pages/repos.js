
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCodeBranch, faEye, faStar, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Users.module.css'
import { useState } from 'react'

const MESSAGES = {
  'msgBienvenida': 'Escriba un criterio de búsqueda para empezar',
  'msgVacio': 'Debe ingresar un criterio de búsqueda',
  'msgError': 'Hubo un error al intentar buscar Usuarios',
  'msgNoResults': 'No se encontraron resultados'
}


export default function Home() {
  const [querySearch, setQuerySearch] = useState('')
  const [message, setMessage] = useState('msgBienvenida')
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [moreButton, setMoreButton] = useState(true)
  const [resultsUsers, setResultsUsers] = useState([])
  
  const handleSearch = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    if(querySearch!==""){
      const rsp = await more(1)
      const results = rsp.items
      setResultsUsers(results)
      if(results.length==0){
        setMessage('msgNoResults')
        setMoreButton(false)
      }else{
        if(results.length<20){
          setMoreButton(false)
        }else{
          setMoreButton(true)
        }
      }
      setIsLoading(false)
      
    }else{
      setIsLoading(false)
      setMessage('msgVacio')
      setResultsUsers([])
    }
  }
  
  const more = async (pageResult) => fetch(`https://api.github.com/search/repositories?q=${querySearch}&per_page=${20}&page=${pageResult}`)
  .then(rsp=>rsp.json())
  
  const handleInputSearch = (event) => {
    setQuerySearch(event.target.value)
  }
  
  const handleMore = async () => {
    const moreResults = await more(page+1)
    if(moreResults.items.length<20){
      setMoreButton(false)
    }else{
      setMoreButton(true)
    }
    setPage(prev=>prev+1)
    setResultsUsers(prev=>[...prev, ...moreResults.items])
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Buscar Usuarios en Github</title>
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
              isLoading?
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              :
                resultsUsers.length===0?
                  <div class="alert alert-info" role="alert">
                    {MESSAGES[message]}
                  </div>
                :
                  <div>
                  
                    <ul className={styles.results}>
                      {resultsUsers.map(repo=>{
                        return (
                          <li>
                            <div className={styles.detail}>
                              <h3>{repo.name}
                              <a href={repo.html_url} target="__blank">
                                <FontAwesomeIcon icon={faExternalLinkSquareAlt} /> 
                              </a></h3>
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
