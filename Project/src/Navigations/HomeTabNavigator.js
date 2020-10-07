import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkList from '../Components/Home/WorkList'

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={WorkList} />
      <Tab.Screen name="Done" component={WorkList} />
      <Tab.Screen name="Doing" component={WorkList} />
      <Tab.Screen name="Not Started" component={WorkList} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;