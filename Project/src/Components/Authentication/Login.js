import { Component, useState } from 'react';
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import UserInput from '../Common/UserInput';
import MyButton from '../Common/MyButton';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import usernameImg from '../Common/imgs/user.png';
import passwordImg from '../Common/imgs/password.png';
import loginImg from '../Common/imgs/login.png';
import signupImg from '../Common/imgs/sign-up.png';
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
              <View style={styles.parentView}>
              <View style={{flex:1}}/>
              <View style={styles.titleContainer}>
                <Text style={styles.sectionTitle}>First Application</Text>
              </View>
              <View style={styles.textboxContainer}>
              <UserInput id="userName" placeholder="Ten dang nhap" maxLength={15} source={usernameImg} 
              data={userInfo.userName} onChange={handleChange} keyboardType='default' />
              </View>
              
              <View style={styles.textboxContainer}>
              <UserInput id="password" placeholder="Mat khau" maxLength={15} source={passwordImg} 
              data={userInfo.password} onChange={handleChange} keyboardType='default'/>
              </View>
              <View style={styles.buttonContainer}>
                <MyButton text="Dang nhap" onPress={() => login()} 
                source={loginImg} height={50} backgroundColor='steelblue'/>
                <MyButton text="Dang ky" onPress={() => navigation.push('SignUp')} 
                source={signupImg} height={50} backgroundColor='steelblue'/>
              </View>
              <View style={{flex:2}}/>
            </View>
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
    backgroundColor: 'powderblue',
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
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  textboxContainer: {
    marginHorizontal: 24,
    marginVertical:5,
    flex:0.75,
    backgroundColor:'white',
  },
});