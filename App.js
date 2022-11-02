import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
//import firebase from 'firebase'
import {Provider} from 'react-redux'
//might be createStore
import { legacy_createStore as createStore, applyMiddleware} from 'redux'
//import { configureStore as createStore, applyMiddleware} from 'redux'
import {connect} from "react-redux";
//import {applyMiddleware} from 'redux'
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
// Firebase Database configuation 
import * as firebase from 'firebase'
const store = createStore(rootReducer, applyMiddleware(thunk))
//const store = configureStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMTAV_wDCnKqCF4DOeLTcLr-2soCnYMdA",
  authDomain: "csseniorproject-78fb8.firebaseapp.com",
  projectId: "csseniorproject-78fb8",
  storageBucket: "csseniorproject-78fb8.appspot.com",
  messagingSenderId: "256595280679",
  appId: "1:256595280679:web:334b18d945b2ef7ac3df02",
  measurementId: "G-MBGWS5H6JR"
};


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
} 

import { NavigationContainer } from '@react-navigation/native' 
import { createStackNavigator } from '@react-navigation/stack' 
import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'

const Stack = createStackNavigator();

import React, { Component } from 'react'

export class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      loaded: false,
    }
  }
  componentDidMount(){//the states for loggedin and loading 
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {//if the page is not loading then the screen will say loading with a blank screen
    const {loggedIn, loaded} = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
     )
    }
    if(!loggedIn){ // if the user is not logged into the application 
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Login" component={LoginScreen}/>
          </Stack.Navigator>
        </NavigationContainer> 
        );
      }
      return(// navigation for adding/posting image screens
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
              <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
        
        
      )
    }
  }


  
export default App

// import React, { Component } from 'react'

// export default class App extends Component {
//   render() {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Landing">
//           <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
//           <Stack.Screen name="Register" component={RegisterScreen}/>
//           <Stack.Screen name="Login" component={LoginScreen}/>
//         </Stack.Navigator>
//       </NavigationContainer> 
//       );
//   }
// }




