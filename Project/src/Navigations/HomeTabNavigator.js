import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabStackNavigator from './TabStackNavigator'
import HomeIcon from '../Components/Common/imgs/home.png'
import NotStartedIcon from '../Components/Common/imgs/pending.png'
import DoingIcon from '../Components/Common/imgs/clock.png'
import DoneIcon from '../Components/Common/imgs/done.png'
import { Image } from "react-native";


const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: 'steelblue', 
      inactiveTintColor: 'grey', 
      showIcon: true,
      
    }}>
      <Tab.Screen name="Home" component={TabStackNavigator} initialParams={{ category: 'all' }}
      options={{tabBarIcon:()=>(<Image source={HomeIcon} style={{height:24,width:24}} />)}}/>
      <Tab.Screen name="Not Started" component={TabStackNavigator} initialParams={{ category: 'not started' }}
      options={{tabBarIcon:()=>(<Image source={NotStartedIcon} style={{height:24,width:24}} />)}}/>
      <Tab.Screen name="Doing" component={TabStackNavigator} initialParams={{ category: 'doing' }}
      options={{tabBarIcon:()=>(<Image source={DoingIcon} style={{height:24,width:24}} />)}}/>
      <Tab.Screen name="Done" component={TabStackNavigator} initialParams={{ category: 'done' }}
      options={{tabBarIcon:()=>(<Image source={DoneIcon} style={{height:24,width:24}} />)}}/>
      
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;