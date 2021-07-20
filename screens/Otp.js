import React,{useState,useEffect} from 'react';
import { View,Text,Image,TextInput,TouchableOpacity,Alert } from 'react-native';
import firebase from 'firebase';
export default function Otp(props){
    const {navigation,route}=props;
    const [verificationId, setVerificationId] = React.useState(route.params.verificationId);
    const [verificationCode, setVerificationCode] = React.useState('');
    const [confirmError, setConfirmError] = React.useState();
    const [confirmInProgress, setConfirmInProgress] = React.useState(false);
   
    return(
        <View style={{flex:1,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:27,fontWeight:'bold'}}>Enter otp</Text>
           <Image source={require('../assets/otp_peep.png')} style={{width:254,height:276}} resizeMode="contain"/>
           <TextInput
          style={{fontSize: 15,borderRadius:5,borderColor:'black',borderWidth:1,marginTop:10}}
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={verificationCode=> setVerificationCode(verificationCode)}   
        />
        <TouchableOpacity style={{width:200,height:60,backgroundColor:'black',borderRadius:10,margin:10,justifyContent:'center',alignItems:'center'}}
        onPress={async () => {
            try {
              setConfirmError(undefined);
              setConfirmInProgress(true);
              const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              const authResult = await firebase.auth().signInWithCredential(credential);
              setConfirmInProgress(false);
              setVerificationId('');
              setVerificationCode('');
              await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
              if (authResult) {
                Alert.alert('Successfully logged in', '✅', [
                  {
                    text: 'Close',
                    // onPress: () => navigation.navigate('Home'),
                    onPress: () => navigation.navigate('Loading'),
                  },
                ]);
              }
              //Alert.alert('Phone authentication successful!');
            } catch (err) {
              setConfirmError(err);
              setConfirmInProgress(false);
            }
          }}>
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Verify</Text>
        </TouchableOpacity>
        </View>
    )
}