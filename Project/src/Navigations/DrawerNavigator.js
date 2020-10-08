import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeTabNavigator from "./HomeTabNavigator";
import AboutScreen from '../Components/About/AboutScreen'

const Drawer = createDrawerNavigator();

onComponentDidMount = () => {
  console.log("In drawer");
}

const DrawerNavigator = () => {
  
  return (
    <Drawer.Navigator initialRouteName='Home' backBehavior='order'>
      <Drawer.Screen name="Home" component={HomeTabNavigator} />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;