
import React from 'react';
import { View, Text, StyleSheet, ImageBackground,Dimensions, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux'
import {DeleteTask, UpdateTask} from '../Slices/todo'
import NotStartedIcon from '../Assets/imgs/pending.png'
import DoingIcon from '../Assets/imgs/clock.png'
import DoneIcon from '../Assets/imgs/done.png'
import DeleteIcon from '../Assets/imgs/trash.png'

const styles = StyleSheet.create({
    listviewitem:{
        flex:5,
        flexDirection:"row",
        marginTop: 5,
        marginBottom: 2,
        borderWidth:1,
        elevation: 2,
        borderRadius:20,
        backgroundColor:'white',
        alignItems:'center'
    },
    title: {
        paddingVertical:10,
        color:'#17c',
        fontSize: 20,
        fontWeight:'bold',
        marginLeft:10,
        flex: 2, flexWrap: 'wrap'
    },
    buttonscontainer: {
        flex: 2,
        flexDirection:'row',
        justifyContent:'space-around',
        paddingRight:10
    },
    deletebuttoncontainer:{
        width:35,
        height:35,
        flex:1,
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f77',
        borderRadius:10,
    },
    statusbuttoncontainer:{
        width:35,
        height:35,
        borderWidth:1,
        borderRadius:10,
        flex: 1,
        backgroundColor:'#ddd',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },
    
});

const MyListViewItem = ({ title, status, id, onPress,width }) => {
    const task=useSelector(state => state.todo.list.find(task => task.id === id));
    const dispatch=useDispatch();
    const deleteItem= ()=>{
        try{
            dispatch(DeleteTask(task.id));
        }catch(err){
            console.log(err);
        }
    }
    const changeStatus =()=>{
        const updatedTask={...task};
        switch(updatedTask.status){
            case 'not started':{
                updatedTask.status='doing';
                updatedTask.startDate = new Date().toJSON().slice(0,10);
                break;
            }
            case 'doing':{
                updatedTask.status='done';
                updatedTask.endDate = new Date().toJSON().slice(0,10);
                break;
            }
            default:{
                break;
            }
        }
        try{
            dispatch(UpdateTask(updatedTask));
        }catch(err){
            console.log(err);
        }
    }
    return (
    <View style={styles.listviewitem}>
        <TouchableOpacity onPress={()=>{onPress(id)}}>
            <View style={{width:width-100}}>
                <Text style={styles.title}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
        <View style={styles.buttonscontainer}>
            <TouchableOpacity onPress={()=>{deleteItem()}}>
                <View style={styles.deletebuttoncontainer} >
                    <Image style={{width:24,height:24}} source={DeleteIcon} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{changeStatus()}}>
                <View style={styles.statusbuttoncontainer} >
                    {status==='not started'?(
                        <Image style={{width:24,height:24}} source={NotStartedIcon} />
                    ):(status === 'doing'?(
                        <Image style={{width:24,height:24}} source={DoingIcon} />
                    ):(
                        <Image style={{width:24,height:24}} source={DoneIcon} />
                    )
                    )
                    }
                </View>
            </TouchableOpacity>
        </View>
        

    </View>
)};

export default MyListViewItem;