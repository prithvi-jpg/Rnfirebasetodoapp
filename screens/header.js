import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Header(props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={()=>props.navigation.navigate('Calendar')}>
      <FontAwesome name="calendar-o" size={24} color="black" style={{marginTop:20}}/>
      </TouchableOpacity>
      <Text style={styles.title}>chits</Text>
      <MaterialCommunityIcons name="face-profile" size={24} color="black" style={{marginTop:20}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // height: 80,
    padding:10,
    paddingTop:40,
    flexDirection:'row',
    justifyContent:'space-between',
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