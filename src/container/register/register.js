import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import imoocForm from '../../component/imooc-form/imooc-form'

@connect(
  state => state.user,
  { register }
)
@imoocForm
class Register extends React.Component{
  constructor(props) {
    super(props)
    this.userRegister = this.userRegister.bind(this)
  }

  componentDidMount() {
    this.props.handleChange('type', 'boss')
  }

  userRegister() {
    this.props.register(this.props.state)
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
            onChange={v=>this.props.handleChange('user', v)}
          >用户名</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange={v=>this.props.handleChange('pwd', v)}
          >密码</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange={v=>this.props.handleChange('repwd', v)}
          >确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem 
            checked={this.props.state.type !== 'boss'}
            onChange={v=>this.props.handleChange('type', 'genius')}
          >牛人</RadioItem>
          <RadioItem 
            checked={this.props.state.type === 'boss'}
            onChange={v=>this.props.handleChange('type', 'boss')}
          >BOSS</RadioItem>
          <WhiteSpace/>
          <Button type="primary" onClick={this.userRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register