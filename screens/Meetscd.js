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

  const DATA = [
    {
      id: "1",
      title: "10:00am",
    },
    {
      id: "2",
      title: "12:00pm",
    },
    {
      id: "3",
      title: "3:30pm",
    },
    {
      id: "4",
      title: "8:00pm",
    },
  ];
  

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.itemTitle, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6B8CCE" : "#F5FCFE";
    const color = item.id === selectedId ? 'white' : 'black';


    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
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
        Select the time available,
      </Text>
      <View>
        <Text>SELECTED START DATE:{startDate}</Text>
      </View>
      <SafeAreaView style={styles.listContainer}>
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
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#bbb',
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 32,
  }
});

export default Meetscd;



  

  

  