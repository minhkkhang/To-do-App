import React, { useState,useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WorkDetailScreen from '../Components/WorkDetails/WorkDetailScreen';
import WorkList from '../Components/Home/WorkList';
import {
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import MenuIcon from '../Assets/imgs/menu-symbol.png'
import HeaderBackground from '../Assets/imgs/header-background.png'
import { useIsFocused } from '@react-navigation/native';
import {change_focused_tab} from '../Slices/todo'
import { useDispatch } from 'react-redux'

const Stack = createStackNavigator();

//Stack navigator cua moi Tab trong trang Home, moi stack chua 2 screen la list va workdetail
const TabStackNavigator = ({navigation,route}) => {
  const isFocused=useIsFocused()
  
  const dispatch=useDispatch();
  

  useEffect(()=>{
    if(isFocused){
      dispatch(change_focused_tab(route.params.category))
    }
  },[useIsFocused()])

  return (
    <Stack.Navigator initialRouteName='WorkList'>
      <Stack.Screen name="WorkDetail" component={WorkDetailScreen} 
      options={{
        headerTitle: props => <Image resizeMode='cover'
          style={{ width:Dimensions.get('screen').width, height: 40}} source={HeaderBackground}/>,
          headerStyle: {
            height: 40, // Specify the height of your custom header
          },
        headerLeftContainerStyle:{
          width:72,
          flexDirection:'row',
          justifyContent:'center',
          alignContent:'center'
        }
      }}/>
      <Stack.Screen name="WorkList" component={WorkList} initialParams={{ category: route.params.category }}
      options={{
          headerTitle: props => <Image resizeMode='cover'
            style={{ width:Dimensions.get('screen').width, height: 40}} source={HeaderBackground}/>,
            headerStyle: {
              height: 40, // Specify the height of your custom header
            },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} 
              style={{height:40,width:72,
                flexDirection:'row',
                justifyContent:'center',
                alignContent:'center'}}
            >
              <Image source={MenuIcon} style={{height:30,width:30,margin:5}}/>
            </TouchableOpacity>
          )
          }}/>
    </Stack.Navigator>
  )
};

export default TabStackNavigator;