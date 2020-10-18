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
import ListBackGround from '../../Assets/imgs/home-background.png'
import { useSelector, useDispatch } from 'react-redux'
import {AddTask} from '../../Slices/todo'

const WorkList = ({route, navigation}) => {
  
  const dispatch=useDispatch();
  const showTaskDetail=(id)=>{
    navigation.push('WorkDetail', {
      id: id
    })
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
      startDate:'Unknown',
      endDate:'Unknown',
      status:'not started'
    }
    try{
      dispatch(AddTask(task))
    }catch(err){
      console.log(err)
      alert('Khong the them cong viec nay!')
      return
    }
    handleChange('taskName','');
    handleChange('detail','');
    setModalVisible(!modalVisible);
  }
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newTask,setNewTask]=React.useState({taskName:'',detail:''});
  const handleChange = (id,value) => {
    setNewTask(prevState => ({
        ...prevState,
        [id]: value
    }));
  };

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
          setModalVisible(!modalVisible);
        }}
        style={styles.floatingbutton}>
        <Image
          source={require('../../Assets/imgs/add.png')}
          style={styles.floatingbuttonstyle}
        />
      </TouchableOpacity>
      ):(
        <View style={styles.floatingbutton} />
      )}
      
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
                onChange={handleChange} value={newTask.taskName} keyboardType='default' height={50}
                borderRadius={20}/>
              </View>
              <View style={styles.textcontainer2}>
                <UserInput id="detail" placeholder="Mo ta cong viec" multiline={true} source='' 
                onChange={handleChange} value={newTask.detail} keyboardType='default' height={170}
                borderRadius={20}/>
              </View>
              
              <View style={styles.modalbuttonscontainer}>
                <TouchableOpacity
                  style={{borderRadius: 10,
                    padding: 20,
                    justifyContent:'center',
                    elevation: 2,
                    height:36,
                    marginHorizontal:10,
                    backgroundColor:'#17c'}}
                  onPress={() => {
                    addTask();
                  }}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={{borderRadius: 10,
                  padding: 20,
                  justifyContent:'center',
                  elevation: 2,
                  height:36,
                  marginHorizontal:10,
                  backgroundColor:'#17c'}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Huy</Text>
                </TouchableOpacity>
              </View>
              
            </View>
          </View>
        </Modal>
      
    </View>
    );
};
export default WorkList;
  

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
    flexDirection: 'column'
  },
  floatingbutton: {
    //Here is the trick
    position: 'absolute',
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
    bottom: 20,
 },
  floatingbuttonstyle: {
    resizeMode:'contain',
    width: 75,
    height: 75,
    //backgroundColor:'black'
  },
  centeredView: {
    position: 'absolute',
    height:350,
    width:Dimensions.get('screen').width-50,
    left: 20,
    bottom: 80
  },
  textcontainer1:{
    borderWidth:1,
    marginVertical:5,
    height:50,
    borderRadius:20
  },
  textcontainer2:{
    borderWidth:1,
    marginVertical:5,
    height:170,
    borderRadius:20
  },
  modalView: {
    flex:1,
    flexDirection:'column',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth:2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
  },
  titleStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    fontSize:24
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left"
  },
  modalbuttonscontainer:{
    marginTop:10,
    flexDirection:'row',
    height: 60
  }
});