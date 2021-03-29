import * as types from './types'

// SEARCH USER
export const searchUser = (querySearch, pageResult) => (dispatch) =>{
    dispatch({ type: types.SEARCH_USERS })
    fetch(`https://api.github.com/search/users?q=${querySearch}&per_page=${20}&page=${pageResult}`)
    .then(rsp=>rsp.json())
    .then(rsp=>{
        dispatch({ type: types.SEARCH_USERS_SUCCESS, payload: { results: rsp.items, page: pageResult } })
    },
    error=>{
        console.log(error)
        dispatch({ type: types.SEARCH_USERS_FAIL, payload: { error: 'Ocurrio un problema al intentar realizar la búsqueda' } })
    })
}

export const emptyUser = () => ({ type: types.USERS_EMPTY })

// SEARC REPO
export const searchRepo = (querySearch, pageResult) => (dispatch) =>{
    dispatch({ type: types.SEARCH_REPOS })
    fetch(`https://api.github.com/search/repositories?q=${querySearch}&per_page=${20}&page=${pageResult}`)
    .then(rsp=>rsp.json())
    .then(rsp=>{
        dispatch({ type: types.SEARCH_REPOS_SUCCESS, payload: { results: rsp.items, page: pageResult } })
    },
    error=>{
        console.log(error)
        dispatch({ type: types.SEARCH_USERS_FAIL, payload: { error: 'Ocurrio un problema al intentar realizar la búsqueda' } })
    })
}

export const emptyRepo = () => ({ type: types.REPOS_EMPTY })
