import React, {useState, useEffect} from 'react'
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Users.module.css'
import { searchUser, emptyUser } from '../actions'

const MESSAGES = {
  'msgBienvenida': 'Escriba un criterio de búsqueda para empezar',
  'msgVacio': 'Debe ingresar un criterio de búsqueda',
  'msgError': 'Hubo un error al intentar buscar Usuarios',
  'msgNoResults': 'No se encontraron resultados'
}


export default function Users() {
  const [querySearch, setQuerySearch] = useState('')
  const [message, setMessage] = useState('msgBienvenida')
  const [page, setPage] = useState(1)
  const [moreButton, setMoreButton] = useState(true)

  let users = useSelector((state) => state.users.items)
  let loading = useSelector((state) => state.users.loading)
  let error = useSelector((state) => state.users.error)
  let dispatch = useDispatch()

  useEffect(()=>{
    if(users.length==0){
      setMessage('msgNoResults')
      setMoreButton(false)
    }else{
      if(users.length<20){
        setMoreButton(false)
      }else{
        setMoreButton(true)
      }
    }
  },[users])

  const handleSearch = async (event) => {
    event.preventDefault()
    if(querySearch!==""){
      dispatch(searchUser(querySearch, 1))
    }else{
      dispatch(emptyUser())
      setMessage('msgVacio')
    }
  }

  const handleInputSearch = (event) => {
    setQuerySearch(event.target.value)
  }
  
  const handleMore = async () => {
    dispatch(searchUser(querySearch, page+1))
    setPage(prev=>prev+1)
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
          <h2 className={styles.main__usersearch__title}>Buscar Usuarios en Github</h2>
          <form
            className={styles.main__usersearch__form} 
            onSubmit={handleSearch}>
            <div className="input-group mb-3">
              <input 
                type="text" 
                className="form-control" 
                id="searchUserInput"
                onChange={handleInputSearch}
                placeholder="Buscar Usuarios en Github" 
                aria-label="Texto de Búsqueda de usuario" aria-describedby="button-addon1"
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
              loading && users.length===0?
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              :
                users.length===0?
                  <div className={error!==null? "alert alert-danger":"alert alert-info"} role="alert">
                    {error!==null? error:MESSAGES[message]}
                  </div>
                :
                  <div>
                  
                    <ul className={styles.results}>
                      {users.map((user, indexUser)=>{
                        return (
                          <li key={indexUser}>
                            <div className={styles.avatar}>
                              {
                                user.avatar_url?
                                  <img
                                      src={user.avatar_url}
                                      alt={"Avatar de "+user.login}
                                  />
                                :
                                  <img
                                      src="/img/Octocat.png"
                                      alt={"Avatar Predeterminado"}
                                  />

                              }
                              
                            </div>
                            <div className={styles.profile}>
                              {user.login}
                              <a href={user.html_url} target="__blank">
                                <FontAwesomeIcon icon={faExternalLinkSquareAlt} /> 
                              </a>
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
