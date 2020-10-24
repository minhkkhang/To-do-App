import * as React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  ImageBackground
} from 'react-native';
import dateFormat from 'dateformat'
import MyCalendar from '../../Common/MyCalendar'
import MyListView from '../../Common/MyListView'
import { useSelector, useDispatch } from 'react-redux'

import ListBackGround from '../../Assets/imgs/home-background.png'
import { LogBox } from 'react-native';


const CalendarScreen=({route,navigation})=>{

  const [selectedDate,setSelectedDate]=React.useState(dateFormat(Date(),"yyyy-mm-dd"))
  const [isShowingDetail,setIsShowingDetail]=React.useState(false)
  /*const [resetCalendar,setResetCalendar]=React.useState(true)*/

  //const todoStatus = useSelector(state => state.todo.flag)
  LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
  ]);

  const onCalendarPressed = (date) =>{
    setSelectedDate(date)
  }
  /*React.useEffect(()=>{
    setResetCalendar(todoStatus==='IDLE')
  },[todoStatus])*/

  const showTaskDetail=(id)=>{
    if(isShowingDetail)return
    setIsShowingDetail(true)
    navigation.push('WorkDetail', {
      id: id,
      onUnmount: onWorkDetailUnmount
    })
  }

  const onWorkDetailUnmount=function(){
    setIsShowingDetail(false)
  }
  
    return (
        <ImageBackground source={ListBackGround}  style={{flex:1,flexDirection:'column',
        paddingHorizontal:Dimensions.get('screen').width/14,
        marginTop:10}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
          <View style={{
            width:Dimensions.get('screen').width-Dimensions.get('screen').width/7,
            height:Dimensions.get('screen').height/2,
            borderTopLeftRadius:50,
            borderTopRightRadius:50,
            backgroundColor:'white',
            borderWidth:1
            }}>
              <MyCalendar
                selectedDate={selectedDate}
                onDayPress={onCalendarPressed}
                mode={'schedule'}
              />
            
          </View>
          <Text style={{color:'black',height:20,fontSize:16,flex:1}}>
              Cong viec bat dau vao ngay {selectedDate}
            </Text>
            <MyListView 
              width={Dimensions.get('screen').width-2*Dimensions.get('screen').width/15}
              category={'startAt'}
              onPress={showTaskDetail}
              source={undefined}
              date={selectedDate}
              />
            
            <Text style={{color:'black',height:20,fontSize:16,flex:1}}>
            Cong viec hoan thanh vao ngay {selectedDate}
            </Text>
            <MyListView 
              width={Dimensions.get('screen').width-2*Dimensions.get('screen').width/15}
              category={'endAt'}
              onPress={showTaskDetail}
              source={undefined}
              date={selectedDate}
              />
          
          </ScrollView>
        </ImageBackground>
    )
}
export default CalendarScreen

/**/