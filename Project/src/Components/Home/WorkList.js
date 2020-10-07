import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import MyButton from '../Common/MyButton';



const WorkList = ({ navigation }) => {
    return (
        <View style={styles.parentView}>
        <View style={{flex:2}}/>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Work List</Text>
        </View>
        
        <View style={{flex:2.5}}/>
      </View>
    );
};
export default WorkList;
  

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