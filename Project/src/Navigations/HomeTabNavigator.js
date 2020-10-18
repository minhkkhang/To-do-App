import React, {useState,useEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabStackNavigator from './TabStackNavigator'
import HomeIcon from '../Assets/imgs/home.png'
import NotStartedIcon from '../Assets/imgs/pending.png'
import DoingIcon from '../Assets/imgs/clock.png'
import DoneIcon from '../Assets/imgs/done.png'
import { Image } from "react-native";
import { useSelector } from 'react-redux'


const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const [notiCount,setNotiCount]=useState({all:null,notstarted:null,doing:null,done:null}) //all, not started, doing, done
  const [currentListSize,setCurrentListSize]=useState({all:-1,notstarted:-1,doing:-1,done:-1})
  const list =useSelector(state => state.todo.list)
  const focusedTab=useSelector(state => state.todo.focusedtab);
  
  const updateNotiCount = (id,value) => {
    switch(id){
      case 'notstarted':
        if(focusedTab==='not started')value=null
        break
      default:
        if(focusedTab===id)value=null
        break
    }
    setNotiCount(prevState => ({
        ...prevState,
        [id]: value
    }));
  };
  const updateListSize = (id,value) => {
    if(currentListSize[id]===value)return
    if(currentListSize[id]<value && currentListSize[id]>=0){
      if(notiCount[id]===null)updateNotiCount(id,value-currentListSize[id])
      else updateNotiCount(id,value-currentListSize[id]+notiCount[id])
    }
    setCurrentListSize(prevState => ({
        ...prevState,
        [id]: value
    }));
  };
  useEffect(()=>{
    const newSize={
      all:list.length,
      notstarted:0,
      doing:0,
      done:0
    }
    for(i=0;i<list.length;i++){
      if(list[i].status==='not started')newSize.notstarted++;
      else if(list[i].status==='doing')newSize.doing++;
      else if(list[i].status==='done')newSize.done++;
    }
    updateListSize('all',newSize.all);
    updateListSize('notstarted',newSize.notstarted);
    updateListSize('doing',newSize.doing);
    updateListSize('done',newSize.done);
  },[list])

  useEffect(()=>{
    switch(focusedTab){
      case 'not started':
        updateNotiCount('notstarted',null)
        break
      default:
        updateNotiCount(focusedTab,null)
        break
    }
  },[focusedTab])
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: 'white',
      activeBackgroundColor:'#17c',
      inactiveTintColor: 'grey', 
      showIcon: true
    }}>
      <Tab.Screen name="Home" component={TabStackNavigator}
        initialParams={{ category: 'all' }}
        options={{
          tabBarIcon:()=>(<Image source={HomeIcon} style={{height:24,width:24}} />),
          tabBarBadge: notiCount.all
        }}
      />
      <Tab.Screen name="Not Started" component={TabStackNavigator} 
        initialParams={{ category: 'not started' }}
        options={{
          tabBarIcon:()=>(<Image source={NotStartedIcon} style={{height:24,width:24}} />),
          tabBarBadge: notiCount.notstarted
        }}
      />
      <Tab.Screen name="Doing" component={TabStackNavigator}
        initialParams={{ category: 'doing' }}
        options={{
          tabBarIcon:()=>(<Image source={DoingIcon} style={{height:24,width:24}} />),
          tabBarBadge: notiCount.doing
          }}
      />
      <Tab.Screen name="Done" component={TabStackNavigator}
        initialParams={{ category: 'done' }}
        options={{
          tabBarIcon:()=>(<Image source={DoneIcon} style={{height:24,width:24}} />),
          tabBarBadge: notiCount.done
          }}
      />
      
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;