import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';

import MyButton from '../../Common/MyButton';

import loginImg from '../../Assets/imgs/login.png';
import {AuthContext} from '../../context';

import { createStackNavigator} from '@react-navigation/stack';
import MenuIcon from '../../Assets/imgs/menu-symbol.png'
import HeaderBackground from '../../Assets/imgs/header-background.png'
import BackGround from '../../Assets/imgs/home-background.png'
import TitleBackground from '../../Assets/imgs/fixed.png'
const Stack = createStackNavigator();



const AboutScreen = ({navigation}) => {
  const { signOut } = React.useContext(AuthContext);

  const ActualScreen =()=>{
    return (
      <ImageBackground style={styles.parentView} source={BackGround}>
        <ImageBackground style={styles.titleContainer} source={TitleBackground}>
        </ImageBackground>
        <View style={styles.buttonContainer}>
          <MyButton text="Dang xuat" onPress={() => signOut()} 
          source={loginImg} height={50} borderRadius={15}  backgroundColor='#17c' textColor='white'/>
        </View>
        <View style={{flex:2.5}}/>
      </ImageBackground>
    );
  }

    return (
      <Stack.Navigator
      initialRouteName='About'>
        <Stack.Screen name="About" component={ActualScreen}
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