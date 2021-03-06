import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import Home from '../screens/Home';
import Calendar from '../screens/Calendar';
import 'react-native-gesture-handler';
import PhoneAuthScreen from '../screens/Phoneauth';
import LoadingScreen from '../screens/LoadingScreen';
import Meetscd from '../screens/Meetscd';
import Chatscd from '../screens/Chatcsd';

import Contactpg from '../screens/Contactpg';

import Otp from '../screens/Otp'


const Stack = createStackNavigator();

const Login = () => {
    return (
      <Stack.Navigator initialRouteName="PhoneAuth">
        <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} options={{headerShown:false}}/>
        <Stack.Screen name="otp" component={Otp} options={{headerShown:false}}/>
      </Stack.Navigator>
    );
  }
  

export default function Navi() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                   name="Login"
                   component={Login}
                   options={{ headerShown: false }}
               />
              <Stack.Screen name='Loading' component={LoadingScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="Calendar" component={Calendar} />
              <Stack.Screen name="Contactpg" component={Contactpg} options={{ headerShown: false }} />
              <Stack.Screen name="Meetscd" component={Meetscd} options={
                ({ route }) => ({ title: route.params.Userph, headerTitleStyle:{color: 'white'},headerStyle: { backgroundColor: '#48434B' }})
                }/>
              <Stack.Screen name="Chatscd" component={Chatscd} options={({ route }) => ( { title: route.params.Userph } )  }/>
              
            </Stack.Navigator>
        </NavigationContainer>
    );
}


