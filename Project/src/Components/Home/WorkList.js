import * as React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  Text
} from 'react-native';
import MyListView from '../../Common/MyListView'
import UserInput from '../../Common/UserInput';
import MyButton from '../../Common/MyButton'
import ListBackGround from '../../Assets/imgs/home-background.png'
import CalendarImg from '../../Assets/imgs/calendar.png'
import { useSelector, useDispatch } from 'react-redux'
import {AddTask} from '../../Slices/todo'
import {_styles} from './styles'
import { LogBox } from 'react-native';
import MyCalendar from '../../Common/MyCalendar'

const now=new Date()
const WorkList = ({route, navigation}) => {
  const dispatch=useDispatch();
  const [isShowingDetail,setIsShowingDetail]=React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(false)
  const [calendarVisible,setCalendarVisible]=React.useState(false)
  const [newTask,setNewTask]=React.useState({taskName:'',detail:'',startDate:'Unknown'})

  const parent=navigation.dangerouslyGetParent()
  const showTaskDetail=(id)=>{
    if(isShowingDetail)return
    setIsShowingDetail(true)
    parent.setOptions({tabBarVisible:false})
    navigation.push('WorkDetail', {
      id: id,
      onUnmount: onWorkDetailUnmount
    })
  }
  const onWorkDetailUnmount=function(){
    parent.setOptions({tabBarVisible:true})
    setIsShowingDetail(false)
  }
  const currentID=useSelector(state => state.todo.currentID)
  const addTask=()=>{
    if(newTask.taskName==='' || newTask.detail===''){
      alert('Khong the them cong viec nay!');
      return;
    }
    const task={
      taskName:newTask.taskName,
      id:currentID,
      detail:newTask.detail,
      startDate:newTask.startDate,
      endDate:'Unknown',
      status:'not started'
    }
    if(task.startDate!='Unknown'){
      const start=new Date(task.startDate)
      if(start.getTime()<=now.getTime())task.status='doing'
    }
    try{
      dispatch(AddTask(task))
    }catch(err){
      console.log(err)
      alert('Khong the them cong viec nay!')
      return
    }
    handleTaskChange('taskName','')
    handleTaskChange('detail','')
    handleTaskChange('startDate','Unknown')
    setModalVisible(false)
  }
  const handleTaskChange = (id,value) => {
    setNewTask(prevState => ({
        ...prevState,
        [id]: value
    }));
  };
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const onCalendarPressed = (date) =>{
    handleTaskChange('startDate',date)
    setModalVisible(true);
    setCalendarVisible(false)
  }
    return (
      <View style={styles.container} >
      <MyListView
        category={route.params.category}
        onPress={showTaskDetail}
        source={ListBackGround}
        width={Dimensions.get('screen').width}
      />
      {!modalVisible?(
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if(calendarVisible){
            setModalVisible(false)
            setCalendarVisible(false)
            handleTaskChange('taskName','')
            handleTaskChange('detail','')
            handleTaskChange('startDate','Unknown')
          }
          else setModalVisible(true)
        }}
        style={styles.floatingbutton}>
          <Image
            source={!calendarVisible?require('../../Assets/imgs/add.png'):require('../../Assets/imgs/cancel.png')}
            style={styles.floatingbuttonstyle}
          />
        </TouchableOpacity>
        ):(
          <View style={styles.floatingbutton} />
        )
      }
      
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.titleStyle}>Them cong viec</Text>
              <View style={styles.textcontainer1}>
                <UserInput id="taskName" placeholder="Ten cong viec" multiline={false} source='' 
                onChange={handleTaskChange} value={newTask.taskName} keyboardType='default' height={50}
                borderRadius={20}/>
              </View>
              <View style={styles.textcontainer2}>
                <UserInput id="detail" placeholder="Mo ta cong viec" multiline={true} source='' 
                onChange={handleTaskChange} value={newTask.detail} keyboardType='default' height={170}
                borderRadius={20}/>
              </View>
              <View style={styles.modalbuttonscontainer}>
                <TouchableOpacity
                  style={styles.modalOptionButton}
                  onPress={() => {
                    addTask();
                  }}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOptionButton}
                  onPress={() => {
                    setModalVisible(false)
                    handleTaskChange('taskName','')
                    handleTaskChange('detail','')
                    handleTaskChange('startDate','Unknown')
                  }}
                >
                  <Text style={styles.textStyle}>Huy</Text>
                </TouchableOpacity>
                <MyButton text={newTask.startDate} onPress={() => {
                  setModalVisible(false)
                  setCalendarVisible(true)
                }} 
                source={CalendarImg} height={42} backgroundColor='#17c' textColor='white' borderRadius={10}/>
              </View>
              
            </View>
          </View>
        </Modal>
        {calendarVisible?(
            <View style={styles.centeredView}>
              <MyCalendar
                selectedDate={newTask.startDate}
                onDayPress={onCalendarPressed}
              />
            </View>
          ):(
            <View />
          )}
      
    </View>
    );
};
export default WorkList;

const styles=StyleSheet.create(_styles)

