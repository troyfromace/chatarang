import React, { Component } from 'react'

import UserInfo from './UserInfo'
import RoomList from './RoomList'

class Sidebar extends Component{
render(){
    return(
        <div className="Sidebar" style={styles.sidebar}>
            <UserInfo userInfo={this.props.userInfo}/>
            <RoomList />
        </div>
    )
}

}

const styles = {
    sidebar: {
      backgroundColor: '#333344',
      color: 'rgba(255, 255, 255, 0.8)',
      width: '12rem',
      padding: '1rem 0',
      display: 'flex',
      flexDirection: 'column',
    },
  
    children: {
      padding: '0 1rem',
    },
  
    h1: {
      color: 'white',
      fontSize: '1.2rem',
      marginTop: 0,
      padding: '0 1rem',
    }
  }

export default Sidebar