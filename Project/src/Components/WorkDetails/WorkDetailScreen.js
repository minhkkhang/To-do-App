import * as React from 'react';
import {
  StyleSheet,
  View,
  Text, Image,ImageBackground
} from 'react-native';
import getList from '../Home/ListMethods'
import calendarImg from '../Common/imgs/calendar.png'
import BackGround from '../Common/imgs/paper.png'
import { ScrollView } from 'react-native-gesture-handler';




const WorkDetailScreen = ({ route }) => {
  var task;
  for(i=0;i<getList().length;i++){
    if(getList()[i].id===route.params.id){
      task=getList()[i];
    }
  }
    return (
        <ImageBackground source={BackGround} style={styles.parentView}>
        <ScrollView style={styles.scrollview}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>{task.taskName}</Text>
          </View>
        
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
          <View style={styles.dateContainer}>
            <Text style={styles.detail}>
              Trang thai: {task.status}
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    );
};
export default WorkDetailScreen;
  

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: 'white',
    flex:5,
    flexDirection: 'column',
    paddingLeft:55
  },
  titleContainer: {
    marginTop: 20,
    marginHorizontal:10,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderBottomWidth:1,
    elevation:2
  },
  sectionTitle: {
    fontSize: 24,
    margin:10,
    fontWeight: '700',
    color:'black'
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
    flexDirection:'row',
    borderBottomWidth:1,
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
    flexDirection:'row',
  },
  date:{
    fontSize: 16,
    color: 'black',
    fontStyle:'italic'
  },
});