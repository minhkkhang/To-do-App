import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-community/async-storage';
import {setNotification,cancelNotification} from '../notification'
export const ToDoSlice = createSlice({
    name: 'todo',
    initialState: {
        list:[],
        flag:'IDLE', //IDLE, BUSY
        currentID:4,
        isintitiated:false,
        focusedtab:'all',
        badges:{
          all:null,
          notstarted:null,
          doing:null,
          done:null
        }
    },
    reducers: {
        init: (state,action) => {
          const max = Math.max.apply(null, action.payload.map(item => item.id));
          state.currentID=max+1;
          state.list=JSON.parse(JSON.stringify(action.payload))
        },
        add: (state,action) => {
          // Redux Toolkit allows us to write "mutating" logic in reducers. It
          // doesn't actually mutate the state because it uses the immer library,
          // which detects changes to a "draft state" and produces a brand new
          // immutable state based off those changes
          state.currentID += 1
          state.list.push(action.payload);
        },
        update: (state,action)=>{
          const { id,taskName, detail,startDate,endDate,status } = action.payload
          const existingTask = state.list.find(task => task.id === id)
          if (existingTask) {
            existingTask.taskName = taskName
            existingTask.detail = detail
            existingTask.startDate = startDate
            existingTask.endDate = endDate
            existingTask.status=status
          }
        },
        remove: (state,action) =>{
          for (i = state.list.length - 1; i >= 0; i--) {
            if (state.list[i].id === action.payload) {
              state.list.splice(i, 1);
              break;
            }
          }
        },
        toggle_busy_flag: state => {
            state.flag = 'BUSY'
        },
        toggle_idle_flag: state =>{
            state.flag ='IDLE'
        },
        toggle_init_flag: state =>{
          state.isintitiated = true;
        },
        change_focused_tab: (state,action) =>{
          state.focusedtab=action.payload
        },
        loadbadges: (state,action)=>{
          const { all,notstarted,doing,done } = action.payload
          state.badges.all=all
          state.badges.notstarted=notstarted
          state.badges.doing=doing
          state.badges.done=done
        }
    }
  })
const {init,add,update,remove,toggle_busy_flag,toggle_idle_flag,toggle_init_flag,loadbadges} = ToDoSlice.actions
export const {change_focused_tab} = ToDoSlice.actions
const initValue=[
  {
    id: 1,
    taskName: 'Task 1',
    status:'doing',
    startDate:'2020-10-01',
    endDate:'Unknown',
    detail:'This is task number one'
  },
  {
    id: 2,
    taskName: 'Task 2',
    status:'not started',
    startDate:'Unknown',
    endDate:'Unknown',
    detail:'This is task number two'
  },
  {
    id: 3,
    taskName: 'Task 3',
    status:'done',
    startDate:'2020-09-02',
    endDate:'2020-09-08',
    detail:'This is task number four'
  }
]
export const InitList = () => {
    // the inside "thunk function"
    return async (dispatch, getState) => {
      try {
        // make an async call to async storage in the thunk
        const todos = await AsyncStorage.getItem('todoList')
        const badges=await AsyncStorage.getItem('badges')
        const parsedTodos = JSON.parse(todos)
        const now = new Date()
        for(i=0;i<parsedTodos.length;i++){
          if(parsedTodos[i].startDate==='Unknown' || parsedTodos[i].status==='done')continue
          else{
            const start=new Date(parsedTodos[i].startDate)
            if(start.getTime()-25200000<=now.getTime() && parsedTodos[i].status==='not started'){
              parsedTodos[i].status='doing'
            }
          }
        }
        const parsedBadges=JSON.parse(badges)
        if(parsedTodos==null)throw new Error('No list')
        // dispatch an action when we get the response back
        dispatch(init(parsedTodos))
        if(parsedBadges!=null){
          dispatch(loadbadges(parsedBadges))
        }
        dispatch(toggle_init_flag())
      } catch (err) {
        // If the list has never been initiated in async storage then it will be initiated here
        try{
            await recreateList(initValue);
        }
        catch(error){
            console.log(error);
        }
        dispatch(init(initValue));
        dispatch(toggle_init_flag());
        console.log(err);
      }
    }
}
const recreateList = async(list)=>{
    try {
        //save the initial state of the list as AsyncStorage list since there is currently no list in storage
        const stringifiedTodos = JSON.stringify(list);
        await AsyncStorage.setItem('todoList', stringifiedTodos)
    } catch (err) {
        console.log(err);
    }
    
}

export const AddTask = Task =>{
  return async (dispatch, getState) => {
      try {
          if(getState().todo.flag==='BUSY')throw new Error('Chuong trinh dang ban!');
          dispatch(toggle_busy_flag());
          // -Clone the current list, add the new task in and save the newly created list in storage
          // -I have to clone the current list because i need to check if the new task is saved successfully
          // in the storage before adjusting the state
          let currentList= JSON.parse(JSON.stringify(getState().todo.list));
          currentList.push(Task);
          const stringifiedTodos = JSON.stringify(currentList);
          await AsyncStorage.setItem('todoList', stringifiedTodos)
          if(Task.startDate!='Unknown' && Task.status==='not started'){
            const tempdate=new Date(Task.startDate)
            setNotification(Task.id,Task.taskName,Task.detail,new Date(tempdate-25200000))
          }
          // dispatch an action when we get the response back
          dispatch(add(Task))
          dispatch(toggle_idle_flag());
      } catch (err) {
          dispatch(toggle_idle_flag());
          console.log(err);
        // If something went wrong, handle it here
      }
    }
}

export const UpdateTask = (Task) =>{
  return async (dispatch, getState) => {
      try {
          if(getState().todo.flag==='BUSY')throw new Error('Chuong trinh dang ban!');
          dispatch(toggle_busy_flag());
          //same thing as Add function
          let currentList= JSON.parse(JSON.stringify(getState().todo.list));
          const target = currentList.find(task => task.id === Task.id);
          if(target==null)throw new Error('ID not found!');
          target.taskName=Task.taskName
          target.detail=Task.detail
          target.startDate=Task.startDate
          target.endDate=Task.endDate
          target.status=Task.status
          const stringifiedTodos = JSON.stringify(currentList);
          // make an async call in the thunk
          await AsyncStorage.setItem('todoList', stringifiedTodos)

          if(target.startDate!='Unknown' && target.status==='not started'){
            const tempdate=new Date(target.startDate)
            setNotification(target.id,target.taskName,target.detail,new Date(tempdate-25200000))
          }
          // dispatch an action when we get the response back
          dispatch(update(Task))
          dispatch(toggle_idle_flag());
      } catch (err) {
          dispatch(toggle_idle_flag());
          console.log(err);
        // If something went wrong, handle it here
      }
    }
}

export const DeleteTask = (id) =>{
  return async (dispatch, getState) => {
      try {
          if(getState().todo.flag==='BUSY')throw new Error('Chuong trinh dang ban!');
          dispatch(toggle_busy_flag());
          //same thing as Add function
          let newList=JSON.parse(JSON.stringify(getState().todo.list));
          for (i = newList.length - 1; i >= 0; i--) {
            if (newList[i].id === id) {
              newList.splice(i, 1);
              break;
            }
          }
          const stringifiedTodos = JSON.stringify(newList);
          // make an async call in the thunk
          await AsyncStorage.setItem('todoList', stringifiedTodos)

          cancelNotification(id)
          
          // dispatch an action when we get the response back
          dispatch(remove(id))
          dispatch(toggle_idle_flag());
      } catch (err) {
          dispatch(toggle_idle_flag());
          console.log(err);
        // If something went wrong, handle it here
      }
    }
}

  export default ToDoSlice.reducer