import React, { Component, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import _ from 'lodash';
import firebase from 'firebase';
 
export default function Calendar({ route, navigation }) {

  let authedUser = firebase.auth().currentUser.uid;
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const onDateChange = (date, type) => {
      setSelectedStartDate(date);
      // console.log(date);
  };


  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    getTasks(selectedStartDate);
    }, [selectedStartDate]);

  const getTasks = () => {
    let tasksRef = firebase.database().ref('/tasks/');
    tasksRef.orderByChild("date").equalTo( selectedStartDate.toString()).on('value', snapshot => {
      let val = snapshot.val();
      //console.log(val)

      let valToArray = _.map(val, element => {
        return {...element};
      });
      setTasks(valToArray);
    });
  };

 

  const keyExtractor = (item, index) => index.toString();


  const Displaytasks = ({tasksobj}) => {
    if (tasksobj.user == authedUser){
      return <Text style={styles.item}>{tasksobj.task} </Text>
    }
     return <View />;
  }

  // const Displaytasks = ({tasksobj}) => {
  //     return <Text style={styles.item}>{tasksobj.task} </Text>
  // }

  //tries to show list of taks for only the selected date..
  // const Displaytasks = ({tasksobj}) => {
  //   if (tasksobj.user == 1 && tasksobj.date == selectedStartDate){
  //     return <Text style={styles.item}>{tasksobj.task} </Text>
  //   }
  //    return <View />;
  // }


  
  


  return (
    <View style={styles.container}>
      <CalendarPicker
        selectedDayColor="#6B8CCE"
        selectedDayTextColor="#FFFFFF"
        todayBackgroundColor="#91afed"
        onDateChange={onDateChange}
      />
      <View>
        <Text>SELECTED START DATE:{startDate}</Text>
      </View>
      <View style={styles.listSection}>
      <FlatList
          keyExtractor={keyExtractor}
          data={tasks}
          renderItem={({item}) => 
          (
            <Displaytasks tasksobj = {item} /> 
          )
        }
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listSection: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
  }

});