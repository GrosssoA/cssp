import React, {useState} from 'react'
import { View , Image, TextInput, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase'
require("firebase/firestore")
require("firebase/storage")
//import '@firebase/storage';

//saving posts to firebase database 
export default function Save(props, {navigation}) {
    //console.log(props)
    const [caption, setCaption] = useState("")
    const uploadImage = async () => {
       const uri = props.route.params.image;
       const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase.storage().ref().child(childPath).put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
        //savePostData(downloadURl);
    }
//will record tje download url, the caption that will be written for post and then timestamp 
//downloadURL
    const savePostData = (downloadURL) => {

        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then((function () {
            props.navigation.popToTop()
        }))

    }

//this is the code to write the caption and then upload the image 
  return (
    <View style={{flex: 1}}>
        <Image source={{uri: props.route.params.image}}/>
        <TextInput
            placeholder="Write a Caption . . . "
            onChangeText={(caption) => setCaption(caption)}
        />

        <Button title='Save' onPress={() => uploadImage()}/>
    </View>
  )
}
