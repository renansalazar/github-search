import React, {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Header.module.css'
import { useEffect } from 'react'

const SCHEMES = {
    DARK: 'dark-theme',
    LIGHT: 'light-theme'
}



export default () =>{
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [scheme, setScheme] = useState(() => {
        if (typeof window !== "undefined") {
            const value = window.localStorage.getItem('theme')
            return value !== null ? value : SCHEMES.LIGHT
        }
        return SCHEMES.LIGHT
      });

    useEffect(()=>{
        const html = document.querySelector('html')
        scheme === SCHEMES.SYSTEM
          ? html.removeAttribute('scheme')
          : html.setAttribute('scheme', scheme)
    }, [scheme])

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)

    const handleChange = e => {
        e.preventDefault()
        const { target } = e
        setScheme(target.value)
        window.localStorage.setItem('theme', target.value)
    }

    return (
        <header className={styles.header}>
            <div className="d-flex">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid p-0">
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarRutas" 
                    aria-controls="navbarRutas" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    onClick={handleNavCollapse}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div 
                    className={(isNavCollapsed?"collapse ":"collapse-show " +"navbar-collapse ")+styles.header__collapse} 
                    id="navbarRutas">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link href="/users">
                            <a className="nav-link" aria-current="page">Buscar Usuarios</a>
                        </Link>
                    </li> 
                    <li className="nav-item">
                        <Link href="/repos">
                            <a className="nav-link">Buscar Repositorios</a>
                        </Link>
                    </li>
                    </ul>
                </div>
                
                </div>
            </nav>
            </div>
            <div className="pt-3 text-center">
            <Link href="/">
                <a>
                    <Image
                        src="/img/Octocat.png"
                        alt="Logo de GIthub Search"
                        width={45}
                        height={45}
                    />
                </a>
            </Link>
            </div>
            <div className="d-flex justify-content-end align-items-center">
            <section className={styles.themeswitch}>
                <label data-checked={scheme === SCHEMES.LIGHT}>
                    <input
                        onChange={handleChange}
                        name='switch'
                        value={SCHEMES.LIGHT}
                        type='radio'
                        />
                    <span
                        aria-label="Sol"
                        role='img'
                    >
                        🌞
                    </span>
                </label> 
                <label data-checked={scheme === SCHEMES.DARK}>
                    <input
                        onChange={handleChange}
                        name='switch'
                        value={SCHEMES.DARK}
                        type='radio'
                        data-location='calc(200% - 4px)'
                    />
                    <span
                        aria-label="Luna"
                        role='img'
                    >
                        🌚
                    </span>    
                </label> 
            </section>
            </div>
        </header>
    )
}