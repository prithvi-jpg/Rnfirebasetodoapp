import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';


import * as firebase from 'firebase';

export default LoadingScreen = ({ navigation }) => {

  let UserName = firebase.auth().currentUser.displayName;
  let UserId = firebase.auth().currentUser.uid;
  let UserPhno = firebase.auth().currentUser.phoneNumber;

   firebase.database().ref('UsersList/').push({
                name: UserName,
                uid: UserId,
                uphonenumber: UserPhno
            }).then((data)=>{
                    console.log('data success ' , data)
                }).catch((error)=>{
                    console.log('error ' , error)
                });
  
  //The bug here would be everytime i log in, it would push the user name and used id again into db,
  //there should either be an "if case" to compare with the existent data in the db,
  //or we need to add in rules in the firebase set to prevent entry into the db.

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    });
  }, []);

  return (
        <View >
          <ActivityIndicator size='large' />
        </View>
      );
};

