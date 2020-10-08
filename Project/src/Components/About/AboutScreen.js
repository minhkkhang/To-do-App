import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import MyButton from '../Common/MyButton';

import loginImg from '../Common/imgs/login.png';
import {AuthContext} from '../../context';


const AboutScreen = () => {
  const { signOut } = React.useContext(AuthContext);


    return (
        <View style={styles.parentView}>
        <View style={{flex:2}}/>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>About this app</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <MyButton text="Dang xuat" onPress={() => signOut()} 
          source={loginImg} height={50} backgroundColor='steelblue'/>
        </View>
        <View style={{flex:2.5}}/>
      </View>
    );
};
export default AboutScreen;
  

const styles = StyleSheet.create({
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
    justifyContent:'center',
    alignItems:'center',
  },
});