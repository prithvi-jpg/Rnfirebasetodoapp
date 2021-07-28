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
import { Audio } from 'expo-av';

const Chatscd = ({route,navigation}) => {
  const [recording, setRecording] = React.useState();
  const [chatText,setChatText]=useState("");
 const { Userph } = route.params;
 const { liDate } = route.params; //this is an object be careful with the use of this variable format or Json.stringify it
  //display the params Userph and liDate
//   console.log(Userph);
//   console.log(liDate);

//   //match user phone no. with the database and get reciever userid
//   const ref = firebase.database().ref('UsersList/' + Userph);
//   ref.once('value').then((snapshot) => {
//     const userdb = snapshot.val();
//     if(Userph.phoneNumber == userdb.phoneNumber){
//         const recuserid = userdb.id;
//     }
//   });
// //create a message text input field and change its state on text input
//   const [message, setMessage] = useState('');


//  const sendMessage = async (currentid, recuserid, message) => {
//      try {
//          return await firebase
//            .database()
//            .ref('MessagesList/' + currentid)
//            .child(recuserid)
//            .push({
//              message: message,
//              sender: currentid,
//              reciever: recuserid,
//              timestamp: new Date().toString(),
//            });
//        }
//      }

//  }

const insertTask = () => {
  console.log(1)
  let tasksRef = firebase.database().ref('/tasks/');
  let createdTask = tasksRef.push();
  console.log(2)
  let task = {id: createdTask.key, task: chatText, done: false, date:moment().format("MM ddd, YYYY hh:mm:ss a"), user: Userph};
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
  console.log('Recording stopped and stored at', uri);
}
  return (
    <View style={{ flex: 1,padding:15}}>
      <View style={{backgroundColor:'#D6FCF7',padding:10,borderColor:'black',borderTopWidth:2,borderRightWidth:2,borderLeftWidth:2,borderBottomWidth:5,borderRadius:10,height:'90%'}}>
        <Text style={{backgroundColor:'white',borderColor:'black',borderRadius:10,borderLeftWidth:2,borderBottomWidth:5,borderTopWidth:2,borderRightWidth:2,padding:5,textAlign:'center',width:100,fontSize:15}}>{moment().format("HH:mm A")}</Text>
        <Image source={require('../assets/audio_background.png')} style={{width:300,height:200,marginTop:'50%'}} resizeMode="contain"/>
        {/* <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}  onPress={recording ? stopRecording : startRecording}>
          <Image source={require('../assets/audio.png')} style={{height:72,width:72}}/>
        </TouchableOpacity> */}
        <View style={{position:'absolute',bottom:10,borderRadius:66,borderColor:'black',borderWidth:1,width:'100%',padding:10,backgroundColor:'white',left:'4%'}}>
        <TextInput placeholder="Type your message" value={chatText} onChangeText={e=>setChatText(e)}/>
      </View>
      </View>
      <TouchableOpacity style={{position:'absolute',width:'100%',bottom:0,padding:10,backgroundColor:'black',borderRadius:10,justifyContent:'center',alignItems:'center',left:'4%'}}
      onPress={()=>insertTask()}>
        <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Chatscd;