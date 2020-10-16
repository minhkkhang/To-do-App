import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-community/async-storage';

export const ToDoSlice = createSlice({
    name: 'todo',
    initialState: {
        list:[],
        flag:'IDLE', //IDLE, BUSY
        currentID:7,
        isintitiated:false
    },
    reducers: {
        init: (state,action) => {
          state.currentID=action.payload.length;
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
        }
    }
  })
const {init,add,update,remove,toggle_busy_flag,toggle_idle_flag} = ToDoSlice.actions

const initValue=[
  {
    id: 1,
    taskName: 'Hoc react native',
    status:'doing',
    startDate:'01/10/2020',
    endDate:'Unknown',
    detail:'Hoc Hook, props, navigation, redux'
  },
  {
    id: 2,
    taskName: 'Chuan bi giay to',
    status:'not started',
    startDate:'Unknown',
    endDate:'Unknown',
    detail:`1: 4 ban photo CMND \n 2:3 anh the \n 3:Giay xac nhan o truong.`
  },
  {
    id: 3,
    taskName: 'Di phong van thuc tap',
    status:'done',
    startDate:'18/09/2020',
    endDate:'18/09/2020',
    detail:'Di phong van thuc tap tai MeU Solutions'
  },
  {
    id: 4,
    taskName: 'Deadline do an mon Kien Truc Phan Mem',
    status:'doing',
    startDate:'06/10/2020',
    endDate:'Unknown',
    detail:'Lop Kien Truc Phan Mem 17_32'
  },
  {
    id: 5,
    taskName: 'Task 5',
    status:'done',
    startDate:'01/09/2020',
    endDate:'20/09/2020',
    detail:'This is task 5'
  },
  {
    id: 6,
    taskName: 'Task 6',
    status:'not started',
    startDate:'20/10/2020',
    endDate:'Unknown',
    detail:'This is task 6'
  }
]
export const InitList = () => {
    // the inside "thunk function"
    return async (dispatch, getState) => {
      try {
        dispatch(toggle_busy_flag());
        // make an async call to async storage in the thunk
        const todos = await AsyncStorage.getItem('todoList');
        const parsedTodos = JSON.parse(todos);
        if(parsedTodos==null)throw new Error('No list');
        // dispatch an action when we get the response back
        dispatch(init(parsedTodos));
        dispatch(toggle_idle_flag());
      } catch (err) {
        // If the list has never been initiated in async storage then it will be initiated here
        try{
            await recreateList(initValue);
        }
        catch(error){
            console.log(error);
        }
        dispatch(toggle_idle_flag());
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
          dispatch(toggle_busy_flag());
          // -Clone the current list, add the new task in and save the newly created list in storage
          // -I have to clone the current list because i need to check if the new task is saved successfully
          // in the storage before adjusting the state
          let currentList= JSON.parse(JSON.stringify(getState().todo.list));
          currentList.push(Task);
          const stringifiedTodos = JSON.stringify(currentList);
          await AsyncStorage.setItem('todoList', stringifiedTodos)
          
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