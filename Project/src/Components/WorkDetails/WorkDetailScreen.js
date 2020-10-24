import * as React from 'react';
import {
  StyleSheet,
  View,
  Text, Image,ImageBackground,TouchableOpacity
} from 'react-native';
import calendarImg from '../../Assets/imgs/calendar.png'
import BackGround from '../../Assets/imgs/home-background.png'
import UserInput from '../../Common/UserInput'
import MyCalendar from '../../Common/MyCalendar'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch,useSelector} from 'react-redux'
import{UpdateTask} from '../../Slices/todo'
import {_styles} from './styles'
import dateFormat from 'dateformat'


const WorkDetailScreen = ({ route,navigation }) => {
  const dispatch=useDispatch()
  const task=useSelector(state => state.todo.list.find(task => task.id === route.params.id))
  const [newTaskDetail,setNewTaskDetail]=React.useState({taskName:task.taskName,detail:task.detail,startDate:task.startDate})
  const [isEditing,setIsEditing]=React.useState(false)
  const [calendarVisible,setCalendarVisible]=React.useState(false)
  const handleChange = (id,value) => {
    setNewTaskDetail(prevState => ({
        ...prevState,
        [id]: value
    }));
  };
  const onCalendarPressed = (date) =>{
    setCalendarVisible(false)
    handleChange('startDate',date)
  }
  React.useEffect(()=>{
    if(newTaskDetail.startDate===task.startDate)return
    updateTask()
  },[newTaskDetail.startDate])

  const updateTask = ()=>{
    if(newTaskDetail.taskName==='' || newTaskDetail.detail===''){
      alert('Thong tin khong phu hop!');
      return;
    }
    const updatedTask={...task};
    updatedTask.taskName=newTaskDetail.taskName
    updatedTask.detail=newTaskDetail.detail
    updatedTask.startDate=newTaskDetail.startDate
    if(updatedTask.startDate!='Unknown' && updatedTask.status!='done'){
      const start=new Date(updatedTask.startDate)
      const now = new Date()
      if(start.getTime()<=now.getTime()){
        updatedTask.status='doing'
      }
      else updatedTask.status='not started'
    }
    
    try{
        dispatch(UpdateTask(updatedTask));
        setIsEditing(false);
    }catch(err){
        console.log(err);
    }
  }

  React.useEffect(() => {
    return () => {
      if(route.params.onUnmount!=null)route.params.onUnmount();
    }
  }, []);
    return (
        <ImageBackground source={BackGround} style={styles.parentView}>
          <ScrollView style={styles.scrollview}>
          <View style={{flex:1,marginHorizontal:20,backgroundColor:'white',borderRadius:20,elevation:2}}>
          <View style={styles.titleContainer}>
            {isEditing?(
              <View style={{flex:1}}>
                <UserInput id="taskName" placeholder="Ten cong viec" multiline={false} source={undefined} 
                onChange={handleChange} value={newTaskDetail.taskName} keyboardType='default' height={50}
                borderRadius={20}/>
              </View>
            ):(
              <Text style={styles.sectionTitle}>{task.taskName}</Text>
            )}
          </View>
        
          <View style={styles.detailContainer}>
            {isEditing?(
              <View style={{flex:1}}>
                <UserInput id="detail" placeholder="Mo ta cong viec" multiline={true} source={undefined} 
                onChange={handleChange} value={newTaskDetail.detail} keyboardType='default' />
              </View>
            ):(
              <Text style={styles.detail}>{task.detail}</Text>
            )}
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
        {!isEditing?(
          <View>
            <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setCalendarVisible(false)
              setIsEditing(true)
            }}
            style={{position: 'absolute',left: 20,bottom: 20,}}>
              <Image
                source={require('../../Assets/imgs/edit.png')}
                style={styles.floatingbuttonstyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {setCalendarVisible(!calendarVisible)}}
              style={{position: 'absolute',left: 20,bottom: 80,}}>
              <Image
                source={calendarVisible?
                require('../../Assets/imgs/cancel.png'):
                require('../../Assets/imgs/calendar.png')}
                style={styles.floatingbuttonstyle}
              />
              </TouchableOpacity>
            
          </View>
          
        ):(
          <View >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {updateTask()}}
              style={{position: 'absolute',right: 80,bottom: 20,}}>
              <Image
                source={require('../../Assets/imgs/done.png')}
                style={styles.floatingbuttonstyle}/>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {setIsEditing(false)}}
              style={{position: 'absolute',right: 20,bottom: 20,}}>
              <Image
                source={require('../../Assets/imgs/cancel.png')}
                style={styles.floatingbuttonstyle}/>
            </TouchableOpacity>
          </View>
        )}

        {calendarVisible?(
            <View style={{position: 'absolute',left: 20,bottom: 140,}}>
              <MyCalendar
                maxDate={task.endDate==='Unknown'?undefined:task.endDate}
                selectedDate={task.startDate}
                current={task.startDate}
                onDayPress={onCalendarPressed}
                monthFormat={'yyyy MM'}
                firstDay={1}
                showWeekNumbers={true}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                enableSwipeMonths={true}
              />
            </View>
          ):(
            <View />
          )}
        
        
        
      </ImageBackground>
    );
};
export default WorkDetailScreen;

const styles=StyleSheet.create(_styles)
  
