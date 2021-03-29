import { combineReducers } from 'redux'
import * as types from './types'

// INITIAL USER STATE
const initialUserState = {
    items: [],
    error: null,
    loading: false
}

// COUNTER REDUCER
const userReducer = (state = initialUserState, { type, payload }) => {
    switch (type) {
      case types.SEARCH_USERS:
        return {
          ...state,
          loading: true
        }
        case types.SEARCH_USERS_SUCCESS:
            return {
                items: payload.page>1?[...state.items, ...payload.results]: payload.results,
                error: null,
            loading: false
      }
      case types.SEARCH_USERS_FAIL:
          return {
            items:[],
            error: payload.error,
            loading: false
        }
      case types.USERS_EMPTY:
        return {
            ...state,
            items:[]
        }
      default:
        return state
    }
}

// INITIAL REPO STATE
const initialRepoState = {
  items: [],
  error: null,
  loading: false
}

// REPO REDUCER
const repoReducer = (state = initialRepoState, { type, payload }) => {
    switch (type) {
        case types.SEARCH_REPOS:
            return {
            ...state,
            loading: true
            }
            case types.SEARCH_REPOS_SUCCESS:
                return {
                    items: payload.page>1?[...state.items, ...payload.results]: payload.results,
                    error: null,
                loading: false
        }
        case types.SEARCH_REPOS_FAIL:
            return {
                items:[],
                error: payload.error,
                loading: false
            }
        case types.REPOS_EMPTY:
            return {
                ...state,
                items:[]
            }
        default:
            return state
    }
}

// COMBINED REDUCERS
const reducers = {
  users: userReducer,
  repos: repoReducer,
}

export default combineReducers(reducers)