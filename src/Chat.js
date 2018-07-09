import React, { Component } from 'react'

import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import base from './base'

class Chat extends Component{
    constructor(){
        super()
        
        this.state={messages: []}
    
    }

    componentWillMount(){
        this.messagesRef = base.syncState(`messages/${this.props.room.name}`,{
            context: this,
            state: 'messages',
            asArray: true,
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.messagesRef)
      }

addMessage = (body) => {
    const messages = [...this.state.messages]
    const user = this.props.userInfo

    messages.push({
      id: `${user.uid}-${Date.now()}`,
      user,
      body,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`
    })

    this.setState({ messages })
  }

  render(){
    return(
        <div className="Chat" style={styles}>
            <ChatHeader room={this.props.room}/>
            <MessageList room={this.props.room} messages={this.state.messages} user={this.props.userInfo}/>
            <MessageForm messages={this.state.messages} addMessage={this.addMessage}/>
        </div>
    )
}

}

const styles={
    flex: 1,
  display: 'flex',
  flexDirection: 'column',
}

export default Chat