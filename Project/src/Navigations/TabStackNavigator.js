import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WorkDetailScreen from '../Components/WorkDetails/WorkDetailScreen';
import WorkList from '../Components/Home/WorkList';
import getList from '../Components/Home/ListMethods'
const Stack = createStackNavigator();

//Stack navigator cua moi Tab trong trang Home, moi stack chua 2 screen la list va workdetail
const TabStackNavigator = ({route}) => {
  var arr=[];
  switch (route.params.category){
    case 'all':
      for(i=0;i<getList().length;i++){
        arr.push(getList()[i]);
      }
      break;
    case 'done':
      for(i=0;i<getList().length;i++){
        if(getList()[i].status==='done'){
          arr.push(getList()[i]);
        }
      }
      break;
    case 'doing':
      for(i=0;i<getList().length;i++){
        if(getList()[i].status==='doing'){
          arr.push(getList()[i]);
        }
      }
      break;
    case 'not started':
      for(i=0;i<getList().length;i++){
        if(getList()[i].status==='not started'){
          arr.push(getList()[i]);
        }
      }
      break;
  }
  onComponentDidMount = () => {
    console.log("In stack");
  }

  return (
    <Stack.Navigator initialRouteName='HomeStack'
    screenOptions={{
            headerStyle: {
                backgroundColor: 'steelblue',
            }
            ,
            headerTintColor: '#000',
          }
        }>
      <Stack.Screen name="WorkDetail" component={WorkDetailScreen} />
      <Stack.Screen name="HomeStack" component={WorkList} initialParams={{ list: arr }}/>
    </Stack.Navigator>
  )
};

export default TabStackNavigator;