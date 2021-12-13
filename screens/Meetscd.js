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
  ScrollView
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import firebase from 'firebase';
import { letterSpacing } from 'styled-system';


//get phonenumber from Contactpg.js through route,params and display it
//get name from Contactpg.js through route,params and display it


const Meetscd = ({ route, navigation }) => {
  // Get the param Userph passed to the component
  const { Userph } = route.params;
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const minDate = new Date();
  const onDateChange = (date, type) => {
      setSelectedStartDate(date);
  };

  
  const [selectedId, setSelectedId] = useState(null);

  //DATE DATA Array

  let DATA = [];
  if (selectedStartDate){
    let a = selectedStartDate.hour(10).minute(30).second(0).format("hh:mm A");
    // console.log('a',a)
    let obj1 = {
      id: "1",
      liDate: a,
    }
    DATA=[...DATA,obj1];
  }
  else{
    console.log("no date selected errororo");
  }
  if (selectedStartDate){
    let b = selectedStartDate.hour(12).minute(0).second(0).format("hh:mm A");
    // console.log('b',b)
    let obj2 = {
      id: "2",
      liDate: b,
    }
    DATA=[...DATA,obj2];
  }
  else{
    console.log("no date selected errororo");
  }
  if (selectedStartDate){
    let c = selectedStartDate.hour(15).minute(30).second(0).format("hh:mm A");
    // console.log('c',c)
    let obj3 = {
      id: "3",
      liDate: c,
    }
    DATA=[...DATA,obj3];
  }
  else{
    console.log("no date selected errororo");
  }
  if (selectedStartDate){
    let d = selectedStartDate.hour(17).minute(30).second(0).format("hh:mm A");
    // console.log('d',d)
    let obj = {
      id: "4",
      liDate: d,
    }
    DATA=[...DATA,obj];
  }
  else{
    console.log("no date selected errororo");
  }
  // console.log('aaa',DATA);
// console.log(a,b,c,d)

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.Datelist, textColor]}>{item.liDate}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "pink" : "white";
    const color = item.id === selectedId ? 'white' : 'black';


    return (
      <Item
        item={item}
        //onPress setSelectedId as item.id and Navigate to the Chatscd route with params Userph and the liDate for the selectedId
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate('Chatscd', { Userph: Userph, liDate: item.liDate });
        }}
        
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.dispMessage}>
        Schedule a Meeting with {JSON.stringify(Userph)},
      </Text>
      
      <View style={styles.calContainer}>
      <CalendarPicker
        selectedDayColor="#6B8CCE"
        selectedDayTextColor="#FFFFFF"
        todayBackgroundColor="#91afed"
        onDateChange={onDateChange}
        minDate={minDate}
      />
      </View>
      <Text style={styles.dispMeetMessage}>
        Select the time available
      </Text>
      {/* <View>
        <Text>SELECTED START DATE:{startDate}</Text>
      </View> */}
      {/* <SafeAreaView style={styles.listContainer}>
        <ScrollView>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
      </ScrollView>
    </SafeAreaView> */}
      <SafeAreaView style={styles.flatcont}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>

    </View>
  );
}

//create stylesheet for container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dispMessage: {
    fontSize: 17,
    textAlign: 'center',
    margin: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  //move calContainer to the top of the page below dispmessage
  calContainer: {
    position: 'absolute',
    top: 30,
  },
  //display dispMeetMessage below after calContainer
  dispMeetMessage: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    position: 'absolute',
    top: 340,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 370,
    flexGrow: 1,
  },
  flatcont: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 370,
    flexGrow: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor:'black',
    borderRadius: 10,
    borderLeftWidth:2,
    borderTopWidth:2,
    borderRightWidth:2,
    borderBottomWidth:5
  },
  Datelist: {
    fontSize: 32,
  }
});

export default Meetscd;



  

  

  