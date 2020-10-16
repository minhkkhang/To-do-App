import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  ImageBackground
} from 'react-native';

import UserInput from '../../Common/UserInput';
import MyButton from '../../Common/MyButton';
import MyRadioGroup from '../../Common/MyRadioGroup';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UsernameImg from '../../Assets/imgs/user.png';
import PasswordImg from '../../Assets/imgs/password.png';
import SignupImg from '../../Assets/imgs/sign-up.png';
import HeaderBackground from '../../Assets/imgs/fixed.png'
import BackGround from '../../Assets/imgs/home-background.png'
import EmailImg from '../../Assets/imgs/email.png';
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
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}>
          <View style={styles.mainView}>
              <StatusBar barStyle="light-content" />
              <ImageBackground source={BackGround}  style={styles.parentView}>
              <ImageBackground style={styles.titleContainer} source={HeaderBackground}>
              </ImageBackground>
              <View style={styles.textboxContainer}>
              <UserInput id="userName" placeholder="Ten dang nhap" maxLength={15} source={UsernameImg} 
              data={userInfo.userName} onChange={handleChange} keyboardType='default' borderRadius={20}/>
              </View>
              
              <View style={styles.textboxContainer}>
              <UserInput id="password" placeholder="Mat khau" maxLength={15} source={PasswordImg} 
              data={userInfo.password} onChange={handleChange} keyboardType='default' borderRadius={20}/>
              </View>

              <View style={styles.textboxContainer}>
              <UserInput id="email" placeholder="Email" maxLength={15} source={EmailImg} 
              data={userInfo.email} onChange={handleChange} keyboardType='email-address' borderRadius={20}/>
              </View>

              <View style={{marginHorizontal: 24,
                            marginVertical:5,
                            flex:0.75,
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
                source={SignupImg} height={50} backgroundColor='#17c' textColor='white' borderRadius={10}/>
              </View>
              <View style={{flex:0.75}}/>
            </ImageBackground>
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
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  textboxContainer: {
    marginHorizontal: 24,
    marginVertical:5,
    flex:0.75,
    backgroundColor:'black',
    borderRadius:20,
    padding:1.5
  },
});