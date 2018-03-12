import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import { Redirect }  from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)

class GeniusInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      avatar: '',
      title: '',
      desc: ''
    }
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    console.log(redirect)
    return (
      <div>
        { redirect && redirect !== path ? <Redirect to={redirect}></Redirect> : null}
        <NavBar mode="dark" >牛人信息完善页面</NavBar>
        <AvatarSelector selectAvatar={
          (text) => {
            this.setState({avatar: text})
          }
        }></AvatarSelector>
        <WhiteSpace></WhiteSpace>
        <InputItem
          onChange={v=>this.handleChange('title',v)}
        >
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={v=>this.handleChange('desc',v)}
          rows="3"
          autoHeight
          title="个人简介"
        >
        </TextareaItem>
        <Button 
          onClick={() => {
            this.props.update(this.state)
          }}
          type="primary">保存</Button>
      </div>
    )
  }
}

export default GeniusInfo