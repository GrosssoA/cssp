import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'

import firebase from 'firebase'


export default class Register extends Component {
    constructor(props){
        super(props);
        // There are 3 states/needs to registar
        this.state = {
            email : '',
            password : '',
            name : ''
        }

        this.onSignup = this.onSignup.bind(this)
    }
    // this will create an account in firebase 
    onSignup(){
        const {email, password, name} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
//UI of the Registration page
  render() {
    return (
      <View>
        <TextInput
            placeholder='name'
            onChangeText={(name) => this.setState({name})}
        />
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
            onPress={() => this.onSignup()}
            title="Sign up"
        />
      </View>
    )
  }
}
