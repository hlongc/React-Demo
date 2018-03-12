import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { register }
)

class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repwd: '',
      type: 'boss'
    }
    this.userRegister = this.userRegister.bind(this)
  }

  handelChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  userRegister() {
    this.props.register(this.state)
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        <List>
          { this.props.msg ? <p className="errNotie">{this.props.msg}</p> : null }
          <InputItem
            onChange={v=>this.handelChange('user', v)}
          >用户名</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange={v=>this.handelChange('pwd', v)}
          >密码</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange={v=>this.handelChange('repwd', v)}
          >确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem 
            checked={this.state.type !== 'boss'}
            onChange={v=>this.handelChange('type', 'genius')}
          >牛人</RadioItem>
          <RadioItem 
            checked={this.state.type === 'boss'}
            onChange={v=>this.handelChange('type', 'boss')}
          >BOSS</RadioItem>
          <WhiteSpace/>
          <Button type="primary" onClick={this.userRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register