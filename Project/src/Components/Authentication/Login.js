import { useState } from 'react';
import * as React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
} from 'react-native';

import UserInput from '../../Common/UserInput';
import MyButton from '../../Common/MyButton';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import UsernameImg from '../../Assets/imgs/user.png';
import PasswordImg from '../../Assets/imgs/password.png';
import LoginImg from '../../Assets/imgs/login.png';
import SignupImg from '../../Assets/imgs/sign-up.png';
import HeaderBackground from '../../Assets/imgs/fixed.png'
import BackGround from '../../Assets/imgs/home-background.png'
import {AuthContext} from '../../context';


const Login = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const [userInfo,setUserInfo]=useState({userName:'',password:''});
  const handleChange = (id,value) => {
    setUserInfo(prevState => ({
        ...prevState,
        [id]: value
    }));
  };
  const validateInput=(user)=>{
    return user.userName!=='' && user.password!=='';
  }
  const login=async ()=>{
    if(!validateInput(userInfo))alert('Du lieu dang nhap khong hop le!');
    else {
      signIn(userInfo);
    }
  }
    return (
      <KeyboardAwareScrollView
      style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}>
          <View style={styles.mainView}>
              <StatusBar barStyle="light-content" />
              <ImageBackground source={BackGround} style={styles.parentView}>
              <View style={{flex:0.5}}/>
              <ImageBackground style={styles.titleContainer} source={HeaderBackground}>
              </ImageBackground>
              <View style={{flex:0.5}}/>
              <View style={styles.textboxContainer}>
              <UserInput id="userName" placeholder="Ten dang nhap" maxLength={15} source={UsernameImg} 
              value={userInfo.userName} onChange={handleChange} keyboardType='default' borderRadius={20}/>
              </View>
              
              <View style={styles.textboxContainer}>
              <UserInput id="password" placeholder="Mat khau" maxLength={15} source={PasswordImg} 
              value={userInfo.password} onChange={handleChange} keyboardType='default' borderRadius={20}/>
              </View>
              <View style={{flex:0.5}}/>
              <View style={styles.buttonContainer}>
                <MyButton text="Dang nhap" onPress={() => login()} 
                source={LoginImg} height={50} backgroundColor='#17c' textColor='white' borderRadius={10}/>
                <MyButton text="Dang ky" onPress={() => navigation.push('SignUp')} 
                source={SignupImg} height={50} backgroundColor='#17c' textColor='white' borderRadius={10}/>
              </View>
              <View style={{flex:0.5}}/>
            </ImageBackground>
          </View>

      </KeyboardAwareScrollView>
    );
};
export default Login;
  

const styles = StyleSheet.create({
  mainView:{
    height:Dimensions.get('window').height,
  },
  parentView: {
    backgroundColor: 'white',
    flex:8,
    flexDirection: 'column',
    justifyContent:'space-between',
  },
  titleContainer: {
    marginTop: 32,
    marginHorizontal:20,
    flex:2,
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
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  textboxContainer: {
    marginHorizontal: 24,
    marginVertical:5,
    flex:0.75,
    backgroundColor:'black',
    padding:1.5,
    borderRadius:20
  },
});