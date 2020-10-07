import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import UserInput from '../Common/UserInput';
import MyButton from '../Common/MyButton';
import MyRadioGroup from '../Common/MyRadioGroup';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import usernameImg from '../Common/imgs/user.png';
import passwordImg from '../Common/imgs/password.png';
import signupImg from '../Common/imgs/sign-up.png';
import {AuthContext} from '../../context';


const SignUp = ({navigation}) => {
  const { signUp } = React.useContext(AuthContext);
  const [userInfo,setUserInfo]=useState({userName:'',
                                        password:'',
                                        email:'',
                                        gender:1,});
  const handleChange = (id,value) => {
    setUserInfo(prevState => ({
        ...prevState,
        [id]: value
    }));
  };
  const validateInput=(user)=>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user.email).toLowerCase()) && user.userName!=='' && user.password!=='';
  }
  const signup=async ()=>{
    if(!validateInput(userInfo))alert('Du lieu dang ky khong hop le!');
    else {
      signUp(userInfo);
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
              <View style={{flex:0.75}}/>
              <View style={styles.titleContainer}>
                <Text style={styles.sectionTitle}>First Application</Text>
              </View>
              <View style={styles.textboxContainer}>
              <UserInput id="userName" placeholder="Ten dang nhap" maxLength={15} source={usernameImg} 
              data={userInfo.userName} onChange={handleChange} keyboardType='default'/>
              </View>
              
              <View style={styles.textboxContainer}>
              <UserInput id="password" placeholder="Mat khau" maxLength={15} source={passwordImg} 
              data={userInfo.password} onChange={handleChange} keyboardType='default'/>
              </View>

              <View style={styles.textboxContainer}>
              <UserInput id="email" placeholder="Email" maxLength={15} source={passwordImg} 
              data={userInfo.email} onChange={handleChange} keyboardType='email-address'/>
              </View>

              <View style={{marginHorizontal: 24,
                            marginVertical:5,
                            flex:0.75,
                            backgroundColor:'powderblue',
                            flexDirection:'row',
                            justifyContent:'flex-end'}}>
              <MyRadioGroup 
              options={[{label: 'Nam', value: 1 },{label: 'Nu', value: 0 }]}
              value={userInfo.gender}
              onPress={(v)=>{setUserInfo(prevState => ({
                                                        ...prevState,
                                                        gender: v}))}}/>
              </View>

              <View style={styles.buttonContainer}>
                <MyButton text="Dang ky" onPress={()=>signup()} 
                source={signupImg} height={50} backgroundColor='steelblue'/>
              </View>
              <View style={{flex:0.75}}/>
            </View>
          </View>
        
      </KeyboardAwareScrollView>
    );
};
export default SignUp;
  

const styles = StyleSheet.create({
  mainView:{
    height:Dimensions.get('window').height-20,
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