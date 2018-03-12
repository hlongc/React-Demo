import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import AuthRoute from './component/authRoute/authRoute'
import Dashboard from './component/dashboard/dashboard'
import reducer from './reducer' 
import './config'
import './index.css'

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))


ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>   
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/geniusinfo" component={GeniusInfo}></Route>
          <Route path="/login" component={Login}></Route>  
          <Route path="/register" component={Register}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>   
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
























