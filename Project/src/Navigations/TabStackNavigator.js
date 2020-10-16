import React from 'react';
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

const Stack = createStackNavigator();

//Stack navigator cua moi Tab trong trang Home, moi stack chua 2 screen la list va workdetail
const TabStackNavigator = ({navigation,route}) => {
  
  onComponentDidMount = () => {
    console.log("In stack");
  }

  return (
    <Stack.Navigator initialRouteName='WorkList'>
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
      <Stack.Screen name="WorkList" component={WorkList} initialParams={{ category: route.params.category }}
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