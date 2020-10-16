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


const WorkList = ({route, navigation}) => {
  const showTaskDetail=(id)=>{
    navigation.push('WorkDetail', {
      id: id
    })
  }
  const addTask=()=>{
    setModalVisible(!modalVisible);
  }
  const [modalVisible, setModalVisible] = React.useState(false);
  /*const [newTask,setNewTask]=React.useState({taskName:'',detail:''});*/
  const handleChange = (id,value) => {
    /*setNewTask(prevState => ({
        ...prevState,
        [id]: value
    }));*/
  };

    return (
      <View style={styles.container} >
      <MyListView
        category={route.params.category}
        onPress={showTaskDetail}
        source={ListBackGround}
        width={Dimensions.get('screen').width}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={addTask}
        style={styles.floatingbutton}>
        <Image
          source={require('../../Assets/imgs/add.png')}
          style={styles.floatingbuttonstyle}
        />
      </TouchableOpacity>
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
              <View style={styles.textcontainer}>
                <UserInput id="taskName" placeholder="Ten cong viec" multiline={true} source='' 
                onChange={handleChange} keyboardType='default' />
              </View>
              <View style={styles.textcontainer}>
                <UserInput id="detail" placeholder="Mo ta cong viec" multiline={true} source='' 
                onChange={handleChange} keyboardType='default' />
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
                    setModalVisible(!modalVisible);
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
    height:400,
    left: 20,
    bottom: 80,
  },
  textcontainer:{
    borderWidth:1,
    flex:1,
    marginVertical:5
  },
  modalView: {
    flex:1,
    flexDirection:'column',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
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
    marginTop:20,
    flexDirection:'row',
    height: 60
  }
});