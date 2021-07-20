import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import * as FirebaseRecaptcha from 'expo-firebase-recaptcha';
import Constants from 'expo-constants';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
export default function PhoneAuthScreen({navigation}) {
  const recaptchaVerifier = React.useRef(null);
  const verificationCodeTextInput = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [verificationId, setVerificationId] = React.useState('');
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState('');
  const [confirmError, setConfirmError] = React.useState();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  const [userAu, setUserAu] = React.useState(null);
  const isConfigValid = !!Constants.manifest.extra.firebase.apiKey;

  return (

      <LinearGradient
        // Background Linear Gradient
        colors={["blue", "skyblue"]}
        style={{
          flex:1,
          justifyContent:'center',
          alignItems:'center'        
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.title}>chits</Text>
        <View style={{backgroundColor:'white',padding:22,justifyContent:'center',alignItems:'center',borderRadius:16,width:300}}>
            <Text style={{fontWeight:'bold',fontSize:36}}>Login</Text>
            <View style={{borderRadius:16,borderColor:'black',borderWidth:1,padding:10,flexDirection:'row'}}>
            <Ionicons name="keypad" size={24} color="black" />
            <TextInput
          style={styles.textInput}
          autoFocus={isConfigValid}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholder="Phone no."
          placeholderTextColor='black'
          editable={!verificationId}
          onChangeText={phoneNumber => setPhoneNumber(phoneNumber.replace(/\s+/g, ''))}
        />
        </View>
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={Constants.manifest.extra.firebase}
        />
          <TouchableOpacity style={{backgroundColor:'black',padding:10,borderRadius:16,justifyContent:'center',alignItems:'center',margin:5}}
          onPress={async () => {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            try {
              setVerifyError(undefined);
              setVerifyInProgress(true);
              setVerificationId('');
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
              );
              setVerifyInProgress(false);
              setVerificationId(verificationId);
              navigation.navigate('otp',{verificationId:verificationId})
              // verificationCodeTextInput.current?.focus();
            } catch (err) {
              setVerifyError(err);
              setVerifyInProgress(false);
            }
          }}>
            <Text style={{fontSize:21,color:'white',fontWeight:'800'}}>Request otp</Text>
          </TouchableOpacity>
        </View>
        {verifyError && <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>}
        {verificationId ? (
          <Text style={styles.success}>A verification code has been sent to your phone</Text>
        ) : (
          undefined
        )}
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  content: {
    // marginTop: 50,
  },
  title: {
    color:'white',
    fontSize: 72,
    textAlign:'center',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 30,
    marginBottom: 4,
  },
  textInput: {
    // marginBottom: 8,
    fontSize: 15,
    // fontWeight: 'bold',
  },
  error: {
    marginTop: 10,
    // fontWeight: 'bold',
    color: 'red',
  },
  success: {
    marginTop: 10,
    // fontWeight: 'bold',
    color: 'blue',
  },
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFFC0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontWeight: 'bold',
  },
});