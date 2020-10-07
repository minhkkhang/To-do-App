import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WorkDetailScreen from '../Components/WorkDetails/WorkDetailScreen';
import HomeDrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator();

const HomeStackNavigator = () => {

  onComponentDidMount = () => {
    console.log("In stack");
  }

  return (
    <Stack.Navigator initialRouteName='HomeDrawer'>
      <Stack.Screen name="WorkDetail" component={WorkDetailScreen} 
          options={{title:'Task detail',
            headerStyle: {
                backgroundColor: 'powderblue',
              }
            ,
            headerTintColor: '#000',
          }} 
      />
      <Stack.Screen name="HomeDrawer" component={HomeDrawerNavigator}/>
    </Stack.Navigator>
  )
};

export default HomeStackNavigator;