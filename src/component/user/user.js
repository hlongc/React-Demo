import React from 'react'
import {connect} from 'react-redux'
import { Modal, Result, List, WhiteSpace, Button } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {Redirect} from 'react-router-dom'
import {userLogout} from '../../redux/user.redux'

@connect(
  state=>state.user,
  {userLogout}
)

class User extends React.Component{
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    browserCookie.erase('userid')
    this.props.userLogout()
  }
  render() {
    const alert = Modal.alert
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user?(
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt=""/>}
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
        />
        <List renderHeader={()=>'简介'}>
          <Item multipleLine>
            {this.props.title}
            {this.props.type==='boss'?<p>薪资：{this.props.money}</p>:null}
            {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace> 
        <Button type='primary' onClick={() => alert('注销', '确认退出登录?', [
          { text: 'Cancel', onPress: () => console.log('cancel') },
          { text: 'Ok', onPress: () => this.logout },
        ])}
        >退出登录</Button>       
        {/* <Button onClick={this.logout}>退出登录</Button> */}
      </div>
    ):<Redirect to={this.props.redirectTo} />
  }
}

export default User