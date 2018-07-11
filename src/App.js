import React, { Component } from 'react'
import {Route , Switch, Redirect} from 'react-router-dom'

import './App.css'
import Main from './Main'
import Login from './Login'

import base, {auth} from './base'


class App extends Component {
  constructor(){
    super()
    const user = JSON.parse(localStorage.getItem('user'))
      this.state={
        
        user: user || {},
  
      }
  }

  componentDidMount(){
    auth.onAuthStateChanged(
      user =>{
      if(user){

      this.handleAuth(user)
      }
      else{
        this.handleUnauth()
      }

    })
  }
 

  handleAuth = (oAuthUser) => {
    const user = {
      uid: oAuthUser.uid || oAuthUser.email,
      displayName: oAuthUser.displayName,
      email: oAuthUser.email,
      photoUrl: oAuthUser.photoURL,
    }
    this.syncUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  syncUser = user => {
    this.userRef = base.syncState(
      `users/${this.state.user.uid}`,
      {
        context: this,
        state: 'user',
        then: () => this.setState({ user })
      }
    )
  }

  updateUser = userData => {
    console.log('trying')
    const forbiddenAttributes = ['email', 'uid', 'password']
    const user = {...this.state.user}

    Object.keys(userData).forEach(
      attribute => {
        if (forbiddenAttributes.indexOf(attribute) === -1) {
          user[attribute] = userData[attribute]
        }
      }
    )

    this.setState({ user })
  }

signedIn = () => {
  return this.state.user.uid
}

signOut = () => {
  auth.signOut()
}

handleUnauth = () => {
  if (this.userRef) {
    base.removeBinding(this.userRef)
  }

  this.setState({ user: {} })
  localStorage.removeItem('user')
}

render() {

  return (
    <div className="App">
    <Switch>
      <Route path="/sign-in" 
      render = {()=>{
        return(
        this.signedIn()
        ? <Redirect to="/chat" />
        : <Login/>)
      }}/>
      <Route path="/chat/rooms/:roomName" 
      render ={(navProps)=>{
        return(
          this.signedIn()
          ? <Main 
          userInfo={this.state.user} 
          signOut={this.signOut} 
          {...navProps} 
          />
          : <Redirect to="/sign-in"/>)
      }}/>
      <Route path="/chat" 
      render ={(navProps)=>{
        return(
          this.signedIn()
          ? <Main userInfo={this.state.user} 
          signOut={this.signOut} 
          {...navProps} />
          : <Redirect to="/sign-in"/>)
      }}/>
      <Route render ={()=>{
        return(
          this.signedIn()
          ? <Redirect to="/chat"/>
          : <Redirect to="/sign-in"/>)
      }}/>

      </Switch>
   
    </div>)

}

}

export default App
