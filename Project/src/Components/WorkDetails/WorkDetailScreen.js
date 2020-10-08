import * as React from 'react';
import {
  StyleSheet,
  View,
  Text, Image
} from 'react-native';
import getList from '../Home/ListMethods'
import calendarImg from '../Common/imgs/calendar.png'
import { ScrollView } from 'react-native-gesture-handler';



const WorkDetailScreen = ({ route }) => {
  var task;
  for(i=0;i<getList().length;i++){
    if(getList()[i].id===route.params.id){
      task=getList()[i];
    }
  }
    return (
        <View style={styles.parentView}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>{task.taskName}</Text>
        </View>
        <ScrollView style={styles.scrollview}>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>
              {task.detail}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Image source={calendarImg}></Image>
            <Text style={styles.date}>
              {task.startDate}
            </Text>
            <Text style={styles.date}>
              ---- {task.endDate}
            </Text>
          </View>
        </ScrollView>
      </View>
    );
};
export default WorkDetailScreen;
  

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: 'white',
    flex:5,
    flexDirection: 'column',
  },
  titleContainer: {
    marginTop: 20,
    marginHorizontal:10,
    flex:1,
    backgroundColor:'powderblue',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:20,
    elevation:2
  },
  sectionTitle: {
    fontSize: 24,
    margin:10,
    color: 'steelblue',
    fontWeight: '700',
  },
  scrollview:{
    flex:4
  },
  detailContainer:{
    marginTop: 10,
    marginHorizontal:10,
    padding:5,
    flex:3,
    flexWrap:'wrap',
    backgroundColor:'powderblue',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:20,
    elevation:2
  },
  detail:{
    fontSize: 18,
    color: 'black',
  },
  dateContainer:{
    marginTop: 10,
    marginHorizontal:10,
    padding:5,
    flex:1,
    flexWrap:'wrap',
    backgroundColor:'powderblue',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:20,
    elevation:2
  },
  date:{
    fontSize: 16,
    color: 'black',
    fontStyle:'italic'
  },
});