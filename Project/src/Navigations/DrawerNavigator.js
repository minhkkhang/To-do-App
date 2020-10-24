import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeTabNavigator from "./HomeTabNavigator";
import AboutScreen from '../Components/About/AboutScreen'
import {InitList} from '../Slices/todo'
import { ImageBackground,View } from 'react-native';

import LoadingScreen from '../Assets/imgs/loading-screen.png'
import CalendarStackNavigator from './CalendarStackNavigator';
const Drawer = createDrawerNavigator();

onComponentDidMount = () => {
  console.log("In drawer");
}

const DrawerNavigator = () => {
  const dispatch = useDispatch()
  const todoStatus = useSelector(state => state.todo.flag)
  const initStatus =useSelector(state=>state.todo.isintitiated);
  useEffect(() => {
    if (todoStatus === 'IDLE') {
      try{
        dispatch(InitList())
      }
      catch(err){console.log(err)}
    }
  }, [])
  return (
    <View style={{flex:1}}>
      { initStatus===true?(
        <Drawer.Navigator initialRouteName='Home' backBehavior='order'>
          <Drawer.Screen name="Home" component={HomeTabNavigator} />
          <Drawer.Screen name="About" component={AboutScreen} />
          <Drawer.Screen name="Schedule" component={CalendarStackNavigator} />
        </Drawer.Navigator>
      ):(
        <ImageBackground style={{flex:1}} source={LoadingScreen} />
      )}
    </View>
  )
}
export default DrawerNavigator;