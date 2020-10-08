import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabStackNavigator from './TabStackNavigator'


const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={TabStackNavigator} initialParams={{ category: 'all' }}/>
      <Tab.Screen name="Done" component={TabStackNavigator} initialParams={{ category: 'done' }}/>
      <Tab.Screen name="Doing" component={TabStackNavigator} initialParams={{ category: 'doing' }}/>
      <Tab.Screen name="Not Started" component={TabStackNavigator} initialParams={{ category: 'not started' }}/>
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;