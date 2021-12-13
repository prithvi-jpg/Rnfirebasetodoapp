import React, {useEffect, useState, useRef} from 'react';
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
import Header from './header';
import firebase from 'firebase';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// console.log(firebase.auth().currentUser);
// console.log(firebase.database().ref.name);
// console.log(firebase.auth().currentUser.phoneNumber);
// console.log(firebase.auth().currentUser.uid);
// console.log(firebase.auth().currentUser.displayName);
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import _ from 'lodash';


//import {ListItem} from 'react-native-elements';



const Home = ({ navigation }) => {
  var comparisonArr=[];
  var finalArr=[];
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState(' ');
  const [tasks, setTasks] = useState([]);
  const [authenticated, setAutheticated] = useState(false);
  const [phoneContact,setPhoneContact]=useState([]);
  const [userList,setUserList]=useState([]);
  firebase.auth().onAuthStateChanged((userauth) => {
    if (userauth) {
      setAutheticated(true);
    }
  });

  let authedUser = firebase.auth().currentUser.uid;
  let today = moment().set({'hour':12,'minute':0,'second':0,'millisecond':0}).toString();
  // console.log(authedUser);
  // const [user, setUser] = useState();
  // Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
  // async function registerForPushNotificationsAsync() {
  //   const { status: existingStatus } = await Permissions.getAsync(
  //     Permissions.NOTIFICATIONS
  //   );
  //   let finalStatus = existingStatus;
  //   // only ask if permissions have not already been determined, because
  //   // iOS won't necessarily prompt the user a second time.
  //   if (existingStatus !== 'granted') {
  //     // Android remote notification permissions are granted during the app
  //     // install, so this will only ask on iOS
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }
  //   // Stop here if the user did not grant permissions
  //   if (finalStatus !== 'granted') {
  //     return;
  //   }
  //   // Get the token that uniquely identifies this device
  //   let token = await Notifications.getExpoPushTokenAsync();
  //   // console.log(token);
  //   // POST the token to your backend server from where you can retrieve it to send push notifications.
  //   return token;
  // }


  useEffect(() => {
    getTasks();
    firebase.database().ref('users/').on('value',(snapshot)=>{
      const rec=snapshot.val();
      // console.log('ooo',rec)
      setUserList(rec);
    })
    firebase.database().ref('/UsersList/').on('value',(snapshot)=>{
      const rec=snapshot.val();
      let valToArray=_.map(rec,element=>{
        return {...element}
      })
      // console.log('ppp',valToArray)
      valToArray.map((item)=>{
        // console.log('phone number',item.uphonenumber)
        comparisonArr.push(item.uphonenumber);
      })
      // setUserList(rec);     
    })
    const loadContacts = async () => {
      const permission = await Permissions.askAsync(
        Permissions.CONTACTS
      ); 
      if (permission.status !== 'granted') {
        return;
      } 
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
        sort: Contacts.SortTypes.PhoneNumbers 
      });
      if(data.length>0){
      data.forEach(contact=>{
        if(contact.phoneNumbers){
          contact.phoneNumbers.forEach(num => {
            if (num.label === "mobile" || num.label === "") {
              const phoneToAdd = num.number;
              // console.log('ggg',phoneToAdd)
              comparisonArr.forEach(number=>{
                if(phoneToAdd==number){
                  console.log('sss',phoneToAdd)
                  finalArr=finalArr.concat(phoneToAdd)      
                }
              })
            }
          });   
        }
      })
      console.log(1,finalArr)
      finalArr.length>0 && display(finalArr)
      }     
    };   
    loadContacts();   
  }, []);
  // console.log('iiï',phoneContact)
    const display=(item)=>{
      console.log(2)
      setPhoneContact(item);
    }
  const getTasks = () => {
    let tasksRef = firebase.database().ref('/tasks/');
    // console.log('here')
    tasksRef.on('value', snapshot => {
      let val = snapshot.val();

      let valToArray = _.map(val, element => {
        return {...element};
      });
      // console.log('value',valToArray)
      setTasks(valToArray);
    });
  };

 

  const insertTask = () => {
    setModalVisible(false);

    let tasksRef = firebase.database().ref('/tasks/');
    let createdTask = tasksRef.push();

    let task = {id: createdTask.key, task: newTask, done: false, date: today, user: authedUser};

    createdTask
      .set(task)
      .then(res => {
        setNewTask(res);
      })
      .catch(err => console.log(err));
  };


  const pressHandler = () => {
    
    navigation.navigate('Calendar');
    // navigation.navigate('Calendar');
  }

  const pushHandler = () => {
    console.log('phone',phoneContact)
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('contact', jsonValue)
      } catch (e) {
        // saving error
      }
    }
    if(phoneContact){
      storeData(phoneContact)
      navigation.navigate('Contactpg');
    } 
    
    
  }

  const signoutHandler = () => {
    firebase.auth().signOut().then(() => {
       navigation.navigate('Login');
    }).catch((error) => {
      console.log("An error happened");
    });
  }


  const updateTask = item => {
    let taskRef = firebase.database().ref('/tasks/' + item.id);
    taskRef
      .update({done: !item.done})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const deleteTask = item => {
    let taskRef = firebase.database().ref('/tasks/' + item.id);

    taskRef
      .remove()
      .then()
      .catch();
  };

  const keyExtractor = (item, index) => index.toString();

  //userobj.user == autduser.id
  const Displaytasks = ({userobj}) => {
    if (userobj.user1 == authedUser){
      return <Text style={styles.item}>{userobj.task} </Text>
    }
     return <View />;
  }
  
  return (
    <View style={styles.conatainer}>
       <Header navigation={navigation}/>
       <View style={{backgroundColor:'white',marginTop:'30%',borderTopLeftRadius:20,borderTopRightRadius:20,position:'absolute',bottom:0,width:'100%',height:'70%',padding:15}}>
         <Text style={{fontSize:24}}>People</Text>
        {userList!==[] && (
          <View style={{flexDirection:'row'}}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
           <View style={{height:50,width:50,borderRadius:25,borderWidth:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#'+Math.random().toString(16).substr(2,6)!=='#000000' || '#'+Math.random().toString(16).substr(2,6)!=='#FFFFFF'  && '#'+Math.random().toString(16).substr(2,6)}}>
             <Text style={{textAlign:'center',fontSize:18}}>{userList.userName ? userList.userName.charAt(0):'C'}</Text>
           </View>
          <Text style={{fontSize:18}}>{userList.userName}</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{height:50,width:50,borderRadius:25,borderWidth:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#'+Math.random().toString(16).substr(2,6)!=='#000000' || '#'+Math.random().toString(16).substr(2,6)!=='#FFFFFF'  && '#'+Math.random().toString(16).substr(2,6),marginLeft:5}}>
            <Text style={{textAlign:'center',fontSize:17}}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>pushHandler()} style={{height:50,width:50,borderRadius:25,borderWidth:0.5,justifyContent:'center',alignItems:'center',backgroundColor:'#'+Math.random().toString(16).substr(2,6)!=='#000000' || '#'+Math.random().toString(16).substr(2,6)!=='#FFFFFF'  && '#'+Math.random().toString(16).substr(2,6),marginLeft:5}}
          disabled={phoneContact.length>1?true:false}>
            <Text style={{textAlign:'center',fontSize:17}}>More</Text>
          </TouchableOpacity>
          </View>
        )}
        <View style={{marginTop:10}}>
          <Text style={{fontSize:24}}>Today's schedule</Text>
          <View style={styles.listSection}>
        <FlatList
          keyExtractor={keyExtractor}
          data={tasks}
          renderItem={({item}) => 
          (
            <Displaytasks userobj = {item} /> 
          )
        }
        />
        </View>
        </View>
       </View>
      <Modal visible={modalVisible}>
        <View style={styles.modal}>
          <TextInput
            style={styles.textInput}
            value={newTask}
            onChangeText={text => setNewTask(text)}
          />
          <View style={{flexDirection: 'row'}}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            <Button title="Confirm" onPress={() => insertTask()} />
          </View>
        </View>
      </Modal>
      <View style={styles.listSection}>
        <FlatList
          keyExtractor={keyExtractor}
          data={tasks}
          renderItem={({item}) => 
          (
            <Displaytasks userobj = {item} /> 
          )
        }
        />

      </View>
      {/* <View style={styles.buttonSection}>
        <Button title="Add task" onPress={() => setModalVisible(true)} /> */}
        {/* <Button title="go to calendar page" onPress={pressHandler}/>
        <Button title="contacts" onPress={pushHandler}/>
        <Button title="Signout" onPress={signoutHandler}/>  */}
        
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  conatainer: {
    // padding: 25,
    //backgroundColor: 'grey',
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  // modal: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  modal: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    justifyContent: 'center',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  listSection: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop:15
  },
  buttonSection: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  textInput: {
    width: 300,
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    padding: 10,
  },
  item: {
    borderColor:'black',
    borderRadius:16,
    borderTopWidth:2,
    borderLeftWidth:2,borderRightWidth:2,
    borderBottomWidth:5,
    padding:24,
    margin:8,
    fontSize:18
    
  }
});
export default Home;