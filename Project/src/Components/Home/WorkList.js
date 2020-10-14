import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import MyListView from '../Common/MyListView'
import ListBackGround from '../Common/imgs/paper.png'


const WorkList = ({route, navigation}) => {
  var arr=route.params.list;
  const showTaskDetail=(id)=>{
    navigation.push('WorkDetail', {
      id: id
    })
  }
    return (
      <View style={styles.container} >
      <MyListView
        itemList={arr}
        onPress={showTaskDetail}
        source={ListBackGround}
      />
    </View>
    );
};
export default WorkList;
  

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
    flexDirection: 'column'
  }
});