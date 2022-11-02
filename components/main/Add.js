import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
//adding function to access camera, take pictures, get picture from cameraroll and save the picture 
export default function Add({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraRollPermission, requestcameraRollPermission] = ImagePicker.useMediaLibraryPermissions();

//Sets the images that is taken as the image
  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null);
        setImage(data.uri);
    }
  }
//Permissions to access cameraroll and camera 
  if (!cameraRollPermission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!cameraRollPermission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.premissionContainer}>
        <Text style={{ textAlign: 'center' }}>We need your permission to use camera roll</Text>
        <Button onPress={requestcameraRollPermission} title="grant permission" />
      </View>
    );
  }
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
//this is the function to pick the image 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {//when you cancel the request to select a photo
        setImage(result.uri);
      }
    };
  function toggleCameraType() {//togging between front and back camera 
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
//html code for ui disply of the camera, flip camera button, take photo button and save photo button 
  return (
    <View style={styles.container}>
      <Camera ref={ref => setCamera(ref)} style={styles.camera} type={type} ratio={'1:1'}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <MaterialCommunityIcons name="rotate-3d-variant" color='white' size={26}/>
          </TouchableOpacity>
          </View>
        <View style={styles.cameraBtnContainer}>
          <Button title='Take Picture' color={'white'} onPress={() => takePicture()}/>
          <Button title='Choose Image' color={'white'} onPress={() => pickImage()}/>
        </View>
      </Camera>
      <Button title="Save" onPress={() => navigation.navigate('Save', {image})}/>
      {image && <Image source={{uri: image}} style={{flex:1}}/>}
    </View> 
  );
}
//Stylesheets
const styles = StyleSheet.create({
  premissionContainer:{
    flex: 1,
    flexDirection: 'column',
    marginTop: 300,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    //flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 30,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
  },
  cameraBtnContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 150,
    marginTop: 200,  
  },
  pickImageContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: 150,
    marginTop: 225,
  },
});