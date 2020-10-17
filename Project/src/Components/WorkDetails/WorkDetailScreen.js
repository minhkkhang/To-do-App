import * as React from 'react';
import {
  StyleSheet,
  View,
  Text, Image,ImageBackground,TouchableOpacity
} from 'react-native';
import calendarImg from '../../Assets/imgs/calendar.png'
import BackGround from '../../Assets/imgs/home-background.png'
import UserInput from '../../Common/UserInput'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch,useSelector} from 'react-redux'
import{UpdateTask} from '../../Slices/todo'




const WorkDetailScreen = ({ route,navigation }) => {
  const dispatch=useDispatch();
  const task=useSelector(state => state.todo.list.find(task => task.id === route.params.id));
  const [newTaskDetail,setNewTaskDetail]=React.useState({taskName:task.taskName,detail:task.detail});
  const [isEditing,setIsEditing]=React.useState(false);
  const handleChange = (id,value) => {
    setNewTaskDetail(prevState => ({
        ...prevState,
        [id]: value
    }));
  };

  const updateTask = ()=>{
    if(newTaskDetail.taskName==='' || newTaskDetail.detail===''){
      alert('Thong tin khong phu hop!');
      return;
    }
    const updatedTask={...task};
    updatedTask.taskName=newTaskDetail.taskName
    updatedTask.detail=newTaskDetail.detail
    try{
        dispatch(UpdateTask(updatedTask));
        setIsEditing(!isEditing);
    }catch(err){
        console.log(err);
    }
  }

  React.useEffect(() => {
    handleChange('taskName',task.taskName);
    handleChange('detail',task.detail);
  }, [task])

  React.useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true
      });
  }, []);

    return (
        <ImageBackground source={BackGround} style={styles.parentView}>
          <ScrollView style={styles.scrollview}>
          <View style={{flex:1,marginHorizontal:20,backgroundColor:'white',borderRadius:20,elevation:2}}>
          <View style={styles.titleContainer}>
            {isEditing?(
              <View style={{flex:1}}>
                <UserInput id="taskName" placeholder="Ten cong viec" multiline={false} source='' 
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
                <UserInput id="detail" placeholder="Mo ta cong viec" multiline={true} source='' 
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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {setIsEditing(!isEditing)}}
            style={{position: 'absolute',left: 20,bottom: 20,}}>
            <Image
              source={require('../../Assets/imgs/edit.png')}
              style={styles.floatingbuttonstyle}
            />
          </TouchableOpacity>
        ):(
          <View style={{position: 'absolute',right: 20,bottom: 20,flex:1}}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {updateTask()}}
              style={{position: 'absolute',right: 120,bottom: 20,}}>
              <Image
                source={require('../../Assets/imgs/done.png')}
                style={styles.floatingbuttonstyle}/>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {setIsEditing(!isEditing)}}
              style={{position: 'absolute',right: 20,bottom: 20,}}>
              <Image
                source={require('../../Assets/imgs/cancel.png')}
                style={styles.floatingbuttonstyle}/>
            </TouchableOpacity>
          </View>
        )}

        
        
        
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
  floatingbuttonstyle: {
    resizeMode:'contain',
    width: 75,
    height: 75,
    //backgroundColor:'black'
  },
});