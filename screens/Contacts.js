import * as React from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
let data;
export default class Contactspage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: [],
      tabSelected:'people'
    };
  }

  loadContacts = async (compare) => {
    const permission = await Permissions.askAsync(
      Permissions.CONTACTS
    );

    if (permission.status !== 'granted') {
      return;
    }
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
    });

   data.map((item)=>{
      if(item.phoneNumbers){
        item.phoneNumbers.forEach(num=>{
          if (num.label === "mobile" || num.label === "" ) {
            const phoneToAdd = num.number;
            // console.log('ggg',phoneToAdd)
            compare.forEach(number=>{
              if(phoneToAdd==number){
                let object={
                  'firstName':item.firstName,
                  'lastName':item.lastName,
                  'phoneNumbers':[
                    phoneToAdd
                  ]
                }
                var joined=this.state.contacts.concat(object);
                this.setState({ contacts: [...new Set(joined)], isLoading: false });
              }
            })
          }
        })
      }
    })
    // this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('contact')
        if(jsonValue!==null){
          data=JSON.parse(jsonValue)
        }
         console.log('data',data)
         data && this.loadContacts(data)
      } catch(e) {
        console.log('r',e)
      }
    }
    getData()
    
  }
  
  renderItem = ({ item,index }) => (   
    <View style={{ minHeight: 25 }}>
      <Text style={index%2==0?{backgroundColor:'#ECF4F7',fontSize:14,padding:15}:{backgroundColor:'white',fontSize:14,padding:15}}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      {/* {console.log('item',item)} */}
      {/* <Text style={{ color: '#000000'}}>
        {item.phoneNumbers[0].number}
      </Text> */}
    </View>
  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();
      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };
  
  render() {
    console.log('fgfgfgfg',this.state.contacts)
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
           onChangeText={value => this.searchContacts(value)}
         />
         </View>
         <View style={{flexDirection:'row'}}>
           <TouchableOpacity style={this.state.tabSelected=='people'?{width:'50%',height:52,borderBottomColor:'black',justifyContent:'center',alignItems:'center',borderBottomWidth:5}:{width:'50%',height:42,justifyContent:'center',alignItems:'center'}} onPress={()=>{
             this.setState({tabSelected:'people'})
           }}>
           <Text style={{textAlign:'center',fontSize:14}}>People</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{width:'50%',height:52,justifyContent:'center',alignItems:'center'}}>
           <Text style={{textAlign:'center',fontSize:14}}>Invites Recieved</Text>
           </TouchableOpacity>
         </View>
           <View style={{  backgroundColor: '#FFFFFF' }}>
          {this.state.isLoading ? (
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
          {this.state.contacts && (
           <FlatList
           data={this.state.contacts}
           renderItem={this.renderItem}
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
          )}
          </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});