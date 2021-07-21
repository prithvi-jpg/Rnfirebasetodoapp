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
  TouchableOpacity,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import firebase from 'firebase';


const Chatscd = ({route,navigation}) => {
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
    

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
         🎉
         {Userph} {liDate.format("hh:mm A")}
         
      </Text>
    </View>
  );
}

export default Chatscd;