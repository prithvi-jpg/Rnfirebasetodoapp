import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
export default function Header(props) {
  const {navigation}=props;
  return (
    <View style={styles.header}>
      <View style={{ flexDirection:'row',
    justifyContent:'space-between',}}>
      <TouchableOpacity onPress={()=>props.navigation.navigate('Calendar')}>
      <FontAwesome name="calendar-o" size={24} color="black" style={{marginTop:20}}/>
      </TouchableOpacity>
      <Text style={styles.title}>chits</Text>
      <TouchableOpacity onPress={()=>{
      //   firebase.auth().signOut().then(() => {
      //     navigation.navigate('Login',{screen:'PhoneAuth'});
      //  }).catch((error) => {
      //    console.log("An error happened");
      //  });
      navigation.navigate('Login',{screen:'PhoneAuth'});
      }}>
        <MaterialIcons name="logout" size={24} color="black" style={{marginTop:20}}/>
      </TouchableOpacity>
      </View>
      
      <Text style={{color:'black',textAlign:'center',fontSize:30,marginTop:'5%'}}>Welcome Back!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // height: 80,
    height:'50%',
    padding:10,
    paddingTop:40,
    //flex: 1,
    // padding: 20,
    backgroundColor: '#99ccff',
  },
  title: {
    textAlign: 'center',
    color: '#000',
    fontSize: 48,
    fontWeight: 'bold',
  }
});