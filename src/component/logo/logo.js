import React from 'react'
import logoimg from './job.png'
import './logo.css'

class Logo extends React.Component{
  render() {
    return (
      <div className="logo-container">
        <img src={logoimg} alt="logo" />
      </div>
    )
  }
}

export default Logo