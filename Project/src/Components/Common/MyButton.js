import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const MyButton = (props)=>{
    return (
        <TouchableOpacity onPress={()=>{props.onPress();}} 
        style={{height:props.height,backgroundColor:props.backgroundColor}}>
            <View style={styles.button}>
            <Image source={props.source} style={styles.inlineImg} />
            <Text style={styles.text}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MyButton;
const styles = StyleSheet.create({
    text:{
      fontSize: 15,
      marginRight:10,
      fontWeight: '600',
      
    },
    button:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',
        paddingVertical:5,
    },
    inlineImg: {
    marginLeft:10,
    marginRight:5,
      width: 22,
      height: 22,
    },
    
  });