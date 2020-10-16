import { configureStore } from '@reduxjs/toolkit'
import ToDoReducer from './Slices/todo'

export default configureStore({
  reducer: {
    todo: ToDoReducer
  }
})