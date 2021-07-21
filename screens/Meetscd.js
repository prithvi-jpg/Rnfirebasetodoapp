import React from 'react';
import { Text, View } from 'react-native';

const Meetscd = ({ route, navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Meeting scheduler page! 🎉
      </Text>
    </View>
  );
}

export default Meetscd;

//IN Contacts.js
//1. I need a toucable opacity for each element in the flatlist ref - https://reactnative.dev/docs/flatlist - flatlist selectable.
//2. Then {on Press} we do two functions:
        // a. create a useState to retrieve the user id of the item and set it once the touchable opacity item is pressed.
        // b. seconf function would be to navigate to the meeting schedule page, with us passing in the parameters user id and phone no.
//3. Then we move to the meeting scheduler where we get the user id through route.params use this to render out the information required.
//4. How to render:
     //a. Instead of using currentUser.uid we would have id set from route.params,
     //b. Display calendar once a date is selected (our calendar actually needs to have a start time and an end time for every event, .query({ startDateTime: start, endDateTime: end}) , .orderByValue('start/dateTime'), <Text> {convertDateTime(item.start.dateTime)} - {convertDateTime(item.end.dateTime)}</Text>, if we are going have duration(15,30,60) and if the user gives only start time we should set a default value of say 30min instead. (https://firebase.google.com/docs/reference/android/com/google/firebase/appindexing/builders/ReservationBuilder) (https://material-ui.com/components/pickers/))
     //c. Now to Proceed without that, we would show 5 timeslots from the Selecteddate from range 6am-6pm, at whole no.(ex 10:00, 4:30) etc and store it a temp variable.
     //d. Once selected and confirmed it moves onto a one way not live chat page where u can type in meeting description and send an audio message store this in cloud and send it to reciever user end.
     //e. send confirmation and await for reciever-end acceptance and then add the selecteddate temp variable into both calendars.

  

  

  