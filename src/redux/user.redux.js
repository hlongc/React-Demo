import axios from 'axios'
import { getRedirectPath } from '../util'

const ERROR_MSG = 'ERROR_MSG'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
  user: '',
  type: '',
  msg: ''
}

export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case LOGOUT: 
      return {...initState, redirectTo: '/login'}
    case ERROR_MSG:
      return {...state, msg: action.msg}
    default:
      return state
  }
}
function authSuccess(obj) {
  const {pwd, ...data} = obj
  return {type: AUTH_SUCCESS, payload: data}
}

function errorMsg(msg) {
  return {msg, type: ERROR_MSG}
}

export function loadData(userInfo) {
  return {type: LOAD_DATA, payload: userInfo}
}

export function userLogout() {
  return {type: LOGOUT}
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code ===0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function login({user, pwd}) {
  if (!user||!pwd) {
    return errorMsg('用户名和密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
      .then(res => {
        if (res.status === 200 && res.data.code ===0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
export function register({user, pwd, repwd, type}) {
  if (!user||!pwd||!repwd) {
    return errorMsg('用户名与密码必须输入!')
  }
  if (pwd !== repwd) {
    return errorMsg('密码不一致!')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({user, pwd, type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}


















