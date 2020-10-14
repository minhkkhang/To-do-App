import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WorkDetailScreen from '../Components/WorkDetails/WorkDetailScreen';
import WorkList from '../Components/Home/WorkList';
import getList from '../Components/Home/ListMethods'
import {
  Image,
  TouchableOpacity,
  Dimensions,View
} from 'react-native';
import MenuIcon from '../Components/Common/imgs/menu-symbol.png'
import HeaderBackground from '../Components/Common/imgs/header-background.png'

const Stack = createStackNavigator();

//Stack navigator cua moi Tab trong trang Home, moi stack chua 2 screen la list va workdetail
const TabStackNavigator = ({navigation,route}) => {
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
    <Stack.Navigator initialRouteName='HomeStack'>
      <Stack.Screen name="WorkDetail" component={WorkDetailScreen} 
        options={{
          headerTitle: props => <Image resizeMode='cover'
          style={{ width:Dimensions.get('screen').width, height: 70}} source={HeaderBackground}/>,
          headerStyle: {
            height: 70, // Specify the height of your custom header
          },
          headerTintColor: '#000'
        }}
      />
      <Stack.Screen name="HomeStack" component={WorkList} initialParams={{ list: arr }}
      options={{
          headerTitle: props => <Image resizeMode='cover'
          style={{ width:Dimensions.get('screen').width, height: 70}} source={HeaderBackground}/>,
          headerStyle: {
            height: 70, // Specify the height of your custom header
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image source={MenuIcon} style={{height:36,width:36,margin:15}}/>
            </TouchableOpacity>
          )
          }}/>
    </Stack.Navigator>
  )
};

export default TabStackNavigator;