import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import MyListView from '../Common/MyListView'


const WorkList = ({route, navigation}) => {
  var arr=route.params.list;
  const showTaskDetail=(id)=>{
    navigation.push('WorkDetail', {
      id: id
    })
  }
    return (
      <View style={styles.container}>
      <MyListView
        itemList={arr}
        onPress={showTaskDetail}
      />
    </View>
    );
};
export default WorkList;
  

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
    flexDirection: 'column',
  }
});