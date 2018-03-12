import React from 'react'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../../component/usercard/usercard'
import { connect } from 'react-redux'

@connect(
  state=>state.chatuser,
  { getUserList }
)
class Boss extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  
  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    return <UserCard userList={this.props.userList}></UserCard>
  }
  
}

export default Boss