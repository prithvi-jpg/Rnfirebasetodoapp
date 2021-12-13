import React, { useEffect, useState, useContext }from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import Expo from 'expo';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';

export default function Contactpg({ navigation }) {

  const [tabSelected, setTabSelected] = useState('people');
  const [contacts, setContacts] = useState([]);
  const [inMemoryContacts, setInMemoryContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (loadContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
          setInMemoryContacts(data);
          
        }
      }
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadContacts();
  }, [])

  //onPress navigate to Meetscd and pass in phonenumber 
  const onPress = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        navigation.navigate('Meetscd', {
          Userph: data[0].phoneNumbers[0].number,
        });
      }
    }
  };
  
 
  const renderItem = ({ item,index }) => (
    <View style={{ minHeight: 25 }}>
      <TouchableOpacity onPress={() => {
          navigation.navigate('Meetscd', {
            Userph: item.phoneNumbers[0].number,
          });
        }}>
      <Text style={index%2==0?{backgroundColor:'#ECF4F7',fontSize:14,padding:15}:{backgroundColor:'white',fontSize:14,padding:15}}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      </TouchableOpacity>
      {/* {console.log('item',item)} */}
      {/* <Text style={{ color: '#000000'}}>
        {item.phoneNumbers[0].number}
      </Text> */}
    </View>
  );

  const searchContacts = value => {
    const filteredContacts = inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();
      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    setContacts(filteredContacts);
  };

  return (
    <SafeAreaView >
        <View style={{flexDirection:'row'}}>
        <AntDesign name="arrowleft" size={20} color="black" style={{marginTop:43,marginLeft:5}}/>
        <Text style={{fontSize:22,color:'black',marginTop:40,marginLeft:5}}>Back</Text>
        </View>
        
        <View style={{padding:10}}>
        <TextInput
           placeholder="Search People to invite"
           placeholderTextColor="#414142"
           style={{
             backgroundColor: '#FFFFFF',
             height: 50,
             fontSize: 21,
             color: 'black',
             borderTopWidth:2,
             borderLeftWidth:2,
             borderRightWidth:2,
             borderBottomWidth:5,
             borderRadius:16,
             padding:10
           }}
           onChangeText={value => searchContacts(value)}
         />
         </View>
         <View style={{flexDirection:'row'}}>
           <TouchableOpacity style={tabSelected=='people'?{width:'50%',height:52,borderBottomColor:'black',justifyContent:'center',alignItems:'center',borderBottomWidth:5}:{width:'50%',height:42,justifyContent:'center',alignItems:'center'}} onPress={()=>{
             setTabSelected('people')
           }}>
           <Text style={{textAlign:'center',fontSize:14}}>People</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{width:'50%',height:52,justifyContent:'center',alignItems:'center'}}>
           <Text style={{textAlign:'center',fontSize:14}}>Invites Recieved</Text>
           </TouchableOpacity>
         </View>
           <View style={{  backgroundColor: '#FFFFFF' }}>
          {isLoading ? (
             <View
               style={{
                 ...StyleSheet.absoluteFill,
                 alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator size="large" color="#bad555" />
            </View>
          ) : null}
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50
                }}
              >
                <Text style={{ color: '#bad555' }}>No Contacts Found</Text>
              </View>
            )}
          />
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});