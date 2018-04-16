import React from 'react'
import { connect } from 'react-redux'
import { NavBar, Button } from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'

class Msg extends React.Component{
  render() {
    return (
      <div>信息页面</div>
    )
  }
}

@connect(
  state => state
)

class Dashboard extends React.Component{
  constructor(props) {
    super(props)
    this.test = this.test.bind(this)
  }

  test() {
    console.log('测试一下点击事件')
  }

  render() {
    const user = this.props.user
    const pathname = this.props.location.pathname
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className="fixed-header" mode="dark">{navList.find(v=>v.path===pathname).text}</NavBar>
        <div>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        {/* <NavLinkBar data={navList}></NavLinkBar> */}
      </div>
    )
  }
}

export default Dashboard