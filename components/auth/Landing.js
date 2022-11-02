import React from 'react'
import { Text, View, Button } from 'react-native'
// This is the first screen that will pop up when you open the app
// there are two buttons: Registar and Login 
export default function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <Button
       title='Register'
       onPress={() => navigation.navigate("Register")}
      />
      <Button
       title='Login'
       onPress={() => navigation.navigate("Login")}
      />
    </View>
  )
}
