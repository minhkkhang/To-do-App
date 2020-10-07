import { Component, useState } from 'react';
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import loginImg from '../Common/imgs/login.png';
import MyButton from '../Common/MyButton';
import {AuthContext} from '../../context';


const Home = ({ navigation }) => {
    const { signOut } = React.useContext(AuthContext);
    const userName='world';
    const logOut=async ()=>{
        signOut();
    }
  
    return (
        <View style={styles.parentView}>
        <View style={styles.buttonContainer}>
                <MyButton text="Dang xuat" onPress={() => logOut()} 
                source={loginImg} height={50} backgroundColor='steelblue'/>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>{userName}</Text>
        </View>
        
      </View>
    );
};
export default Home;
  

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: 'powderblue',
    flex:8,
    flexDirection: 'column',
  },
  titleContainer: {
    marginTop: 32,
    marginHorizontal:20,
    flex:7,
    backgroundColor:'powderblue',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },
  sectionTitle: {
    fontSize: 24,
    margin:32,
    
    color: 'black',
    fontWeight: '700',
  },
  buttonContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
  },
});