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
        style={{padding:5,height:props.height,backgroundColor:props.backgroundColor,borderRadius:props.borderRadius}}>
            <View style={styles.button}>
            <Image source={props.source} style={styles.inlineImg} />
            <Text style={{
              fontSize: 15,
              marginRight:10,
              fontWeight: 'bold',
              color:props.textColor
            }}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default MyButton;
const styles = StyleSheet.create({
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