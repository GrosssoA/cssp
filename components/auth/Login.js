import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'

import firebase from 'firebase'


export default class Login extends Component {
    constructor(props){
        super(props);
        // there are two state, email and password which will be used to login
        this.state = {
            email : '',
            password : ''
        }

        this.onSignIn = this.onSignIn.bind(this)
    }
// this will check with firebase to see if you have an account to login with
    onSignIn(){
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
// here are the buttons and place holders for the login screen 
  render() {
    return (
      <View>
        <TextInput
            placeholder='email'
            onChangeText={(email) => this.setState({email})}
        />
        <TextInput
            placeholder='password'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
        />
        <Button
            onPress={() => this.onSignIn()}
            title="Login"
        />
      </View>
    )
  }
}

