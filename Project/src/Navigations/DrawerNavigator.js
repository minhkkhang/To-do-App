import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeTabNavigator from "./HomeTabNavigator";
import AboutScreen from '../Components/About/AboutScreen'
import {InitList} from '../Slices/todo'
const Drawer = createDrawerNavigator();

onComponentDidMount = () => {
  console.log("In drawer");
}

const DrawerNavigator = () => {
  const dispatch = useDispatch()
  const todoStatus = useSelector(state => state.todo.flag)
  useEffect(() => {
    if (todoStatus === 'IDLE') {
      try{
        dispatch(InitList())
      }
      catch(err){console.log(err)}
    }
  }, [])
  return (
    <Drawer.Navigator initialRouteName='Home' backBehavior='order'>
      <Drawer.Screen name="Home" component={HomeTabNavigator} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;