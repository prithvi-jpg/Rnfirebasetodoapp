import React, { useEffect, useState, useContext }from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Modal,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import firebase from 'firebase';
import _ from 'lodash';
import { Audio } from 'expo-av';
const Chatscd = ({route,navigation}) => {
 let authedUser = firebase.auth().currentUser;
 const [recording, setRecording] = React.useState();
 const [chatText,setChatText]=useState("");
 const [ Userlph, setUserlph] = useState([]);
 const [userList, setUserList] = useState([]);
//  let Userph = JSON.stringify(route.params.Userph)
 const { liDate } = route.params; //this is an object be careful with the use of this variable format or Json.stringify it
 let today = moment().set({'hour':12,'minute':0,'second':0,'millisecond':0}).toString();
//  console.log("today",today)
//  Userph = Userph.replace(/\s/g, '');

 //  console.log(authedUser);
 
  useEffect(() => {
    getUserlist();
   }, []);

   const getUserlist = () => {
     let userRef = firebase.database().ref('/UsersList/');
     userRef.on('value', snapshot => {
       let val = snapshot.val();
       // console.log(val)
       let valToArray = _.map(val, element => {
         return {...element};
       });
       setUserList(valToArray);
       console.log("____________________--------------------_________________");
       valToArray.map(element => {
         // console.log(element.uid);
         // console.log(element.uphonenumber);
         let mynumber = "+919986039758";
         //check if mynumber is present in element.uphonenumber
         if(element.uphonenumber.includes(mynumber)){
           setUserlph(element.uid);
          //  console.log(Userlph);
         }
       });
      });
    };
    

const insertTask = () => {
  console.log(1)
  let tasksRef = firebase.database().ref('/tasks/');
  let createdTask = tasksRef.push();
  console.log(2)
  let task = {id: createdTask.key, task: chatText, done: false, date:today, user2: Userlph, user1: authedUser.uid};
  console.log(3)
  createdTask
    .set(task)
    .then(res => {
      // Alert.alert('Task successfully created', [
      //   {
      //     text: 'Close',
      //     // onPress: () => navigation.navigate('Home'),
      //     onPress: () => navigation.navigate('Home'),
      //   },
      // ]);
      console.log('res',res)
    })
    .catch(err => console.log(err));
    Alert.alert(
      "Chits",
      "Task is successfully created",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => navigation.navigate('Home') }
      ]
    );
    console.log(4)
};
    
async function startRecording() {
  try {
    console.log('Requesting permissions..');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    }); 
    console.log('Starting recording..');
    const { recording } = await Audio.Recording.createAsync(
       Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    );
    setRecording(recording);
    console.log('Recording started');
  } catch (err) {
    console.error('Failed to start recording', err);
  }
}

async function stopRecording() {
  console.log('Stopping recording..');
  setRecording(undefined);
  await recording.stopAndUnloadAsync();
  const uri = recording.getURI(); 
  // const info = await FileSystem.getInfoAsync(recording.getURI());
  // console.log(`FILE INFO: ${JSON.stringify(info)}`);
  console.log('Recording stopped and stored at', uri);
}
const uploadAudio = async () => {
  try {
    const urill = recording.getURI();
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', urill, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(`audio/${recording.getURI().split('/').pop()}`);
    const snapshot = await ref.put(blob);
    blob.close();
    const url = await snapshot.ref.getDownloadURL();
    console.log('url', url);
    return url;
  } catch (error) {
    console.log(error);
  }
};
const downloadAudio = async () => {
  const uri = await firebase
    .storage()
    .ref("nameOfTheFile.filetype")
    .getDownloadURL();

  console.log("uri:", uri);

  // The rest of this plays the audio
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync({ uri });
    await soundObject.playAsync();
  } catch (error) {
    console.log("error:", error);
  }
};


  return (
    <View style={{ flex: 1,padding:15}}>
      <View style={{backgroundColor:'#D6FCF7',padding:10,borderColor:'black',borderTopWidth:2,borderRightWidth:2,borderLeftWidth:2,borderBottomWidth:5,borderRadius:10,height:'90%'}}>
        <Text style={{backgroundColor:'white',borderColor:'black',borderRadius:10,borderLeftWidth:2,borderBottomWidth:5,borderTopWidth:2,borderRightWidth:2,padding:5,textAlign:'center',width:100,fontSize:15}}>{moment().format("HH:mm A")}</Text>
        <Image source={require('../assets/audio_background.png')} style={{width:300,height:200,marginTop:'50%'}} resizeMode="contain"/>
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}  onPress={recording ? stopRecording : startRecording}>
          <Image source={require('../assets/audio.png')} style={{height:72,width:72}}/>
        </TouchableOpacity>
        <View style={{position:'absolute',bottom:10,borderRadius:66,borderColor:'black',borderWidth:1,width:'100%',padding:10,backgroundColor:'white',left:'4%'}}>
        <TextInput placeholder="Type your message" value={chatText} onChangeText={e=>setChatText(e)}/>
      </View>
      </View>
      {/* <TouchableOpacity style={{position:'absolute',width:'100%',bottom:40,padding:10,backgroundColor:'blue',borderRadius:10,justifyContent:'center',alignItems:'center',left:'4%'}}
      onPress={()=>uploadAudio()}>
        <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>upload audio</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={{position:'absolute',width:'100%',bottom:0,padding:10,backgroundColor:'black',borderRadius:10,justifyContent:'center',alignItems:'center',left:'4%'}}
      onPress={()=>insertTask()}>
        <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Chatscd;