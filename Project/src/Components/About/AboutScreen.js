import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

import MyButton from '../Common/MyButton';

import loginImg from '../Common/imgs/login.png';
import {AuthContext} from '../../context';

import { createStackNavigator} from '@react-navigation/stack';
import MenuIcon from '../Common/imgs/menu-symbol.png'
import HeaderBackground from '../Common/imgs/header-background.png'
const Stack = createStackNavigator();



const AboutScreen = ({navigation}) => {
  const { signOut } = React.useContext(AuthContext);

  const ActualScreen =()=>{
    return (
      <View style={styles.parentView}>
        <View style={{flex:2}}/>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>About this app</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <MyButton text="Dang xuat" onPress={() => signOut()} 
          source={loginImg} height={50} backgroundColor='steelblue' borderRadius={5}/>
        </View>
        <View style={{flex:2.5}}/>
      </View>
    );
  }

    return (
      <Stack.Navigator
      initialRouteName='About'>
        <Stack.Screen name="About" component={ActualScreen}
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
    );
};
export default AboutScreen;
  

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: 'white',
    flex:8,
    flexDirection: 'column',
  },
  titleContainer: {
    marginTop: 32,
    marginHorizontal:20,
    flex:2,
    backgroundColor:'steelblue',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },
  sectionTitle: {
    fontSize: 24,
    margin:32,
    
    color: 'white',
    fontWeight: '700',
  },
  buttonContainer:{
    flex:1.5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
});