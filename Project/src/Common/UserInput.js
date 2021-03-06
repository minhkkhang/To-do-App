import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import showPassImg from '../Assets/imgs/view.png';

const UserInput=(props)=>{
    const isPasswordInput=props.placeholder==="Mat khau";
    const [showPass,setShowPass]=useState(isPasswordInput);
    var autocomplete='off';
    if(props.id==='password')autocomplete='password';
    if(props.id==='email')autocomplete='email';
    if(props.id==='userName')autocomplete='username';
    return (
        <View style={{
          flex:1,
          backgroundColor:'white',
          justifyContent:'flex-start',
          alignItems:'center',
          flexDirection:'row',
          borderRadius: props.borderRadius||0,
          height:props.height}}
          >
            {props.source===''?<View style={{width: 5,}} />:<Image source={props.source} style={styles.inlineImg} />}
            <View style={{width:Dimensions.get('window').width-155}}>
                <TextInput style={styles.textInput}
                    id={props.id}
                    placeholder={props.placeholder||''}
                    secureTextEntry={showPass}
                    maxLength={props.maxLength||1000}
                    defaultValue={props.value||''}
                    enablesReturnKeyAutomatically={true}
                    keyboardType={props.keyboardType}
                    autoCompleteType={autocomplete}
                    multiline={props.multiline || false}
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