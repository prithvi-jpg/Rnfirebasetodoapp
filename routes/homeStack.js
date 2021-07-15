import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Calendar from '../screens/Calendar';
import Contactspage from '../screens/Contacts';
import 'react-native-gesture-handler';
import PhoneAuthScreen from '../screens/Phoneauth';
import LoadingScreen from '../screens/LoadingScreen';


const Stack = createStackNavigator();

const Login = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen}/>
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
              <Stack.Screen name="Contactspage" component={Contactspage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// export default Navigator;
// const screens = {
//     Home: {
//         screen: Home
//     },
//     Calendar: {
//         screen: Calendar
//     },
//     Contactspage: {
//         screen: Contactspage
//     }
// }

// const HomeStack = createStackNavigator (screens);

// export default createAppContainer(HomeStack);
