import * as React from 'react';
import {
  StyleSheet,
  View,
  Text, Image,ImageBackground
} from 'react-native';
import calendarImg from '../../Assets/imgs/calendar.png'
import BackGround from '../../Assets/imgs/home-background.png'
import TaskBackGround from '../../Assets/imgs/paper.png'
import { ScrollView } from 'react-native-gesture-handler';

import { useSelector} from 'react-redux'
import { withSafeAreaInsets } from 'react-native-safe-area-context';




const WorkDetailScreen = ({ route }) => {
  const task=useSelector(state => state.todo.list.find(task => task.id === route.params.id));
    return (
        <ImageBackground source={BackGround} style={styles.parentView}>
          <ScrollView style={styles.scrollview}>
          <View style={{flex:1,marginHorizontal:20,backgroundColor:'white',borderRadius:20,elevation:2}}>
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
  },
  titleContainer: {
    marginTop: 20,
    marginHorizontal:10,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    borderBottomWidth:1,
    backgroundColor:'white',
    borderRadius:20,
    elevation:2
  },
  sectionTitle: {
    fontSize: 24,
    margin:10,
    fontWeight: '700',
    color:'#17c'
  },
  scrollview:{
    flex:4,
    marginTop:20,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
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
    justifyContent:'center'
  },
  date:{
    fontSize: 16,
    color: 'black',
    fontStyle:'italic'
  },
});