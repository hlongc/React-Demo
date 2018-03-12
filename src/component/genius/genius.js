import React from 'react'
import { getUserList } from '../../redux/chatuser.redux'
import { connect } from 'react-redux'
import UserCard from '../../component/usercard/usercard'

@connect(
  state=>state.chatuser,
  { getUserList }
)
class Genius extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  
  componentDidMount() {
    this.props.getUserList('boss')
  }

  render() {
    return <UserCard userList={this.props.userList}></UserCard>
  }
  
}

export default Genius