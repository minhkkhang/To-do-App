import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import showPassImg from './imgs/view.png';

const UserInput=(props)=>{
    const isPasswordInput=props.placeholder==="Mat khau";
    const [showPass,setShowPass]=useState(isPasswordInput);
    var autocomplete='off';
    if(props.id==='password')autocomplete='password';
    if(props.id==='email')autocomplete='email';
    if(props.id==='userName')autocomplete='username';
    return (
        <View style={styles.wrapper}>
            <Image source={props.source} style={styles.inlineImg} />
            <View style={{width:Dimensions.get('window').width-155,}}>
                <TextInput style={styles.TextInput}
                    id={props.id}
                    placeholder={props.placeholder}
                    secureTextEntry={showPass}
                    maxLength={props.maxLength}
                    defaultValue={props.value}
                    enablesReturnKeyAutomatically={true}
                    keyboardType={props.keyboardType}
                    autoCompleteType={autocomplete}
                    onChangeText={text=>{props.onChange(props.id,text)}}/>
            </View>
            
            {isPasswordInput?<TouchableOpacity onPress={()=>{setShowPass(!showPass);}}>
                                <Image source={showPassImg} style={styles.inlineImg} />
                            </TouchableOpacity>
                            :<View/>}
        </View>
        
    )
}
export default UserInput;
const styles = StyleSheet.create({
    textInput:{
      fontSize: 15,
      paddingHorizontal:15,
      fontWeight: '600',
    },
    wrapper:{
        flex:1,
        backgroundColor:'white',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
    },
    inlineImg: {
    marginHorizontal:15,
      width: 22,
      height: 22,
    },
    
  });