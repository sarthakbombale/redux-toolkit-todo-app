import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";



function loadState() {
  try {
    const serializedState = localStorage.getItem("todos");
    return serializedState ? JSON.parse(serializedState) : [];
  }catch(e){
    console.error("Could not load todos from localStorage",e);
    return[];
  }
}
function saveState(state){
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todos",serializedState);
  }catch (e){
    console.error("Could not load todos from localStorage")
  }
}
const preloadedTodos  = loadState();

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState: {
    todo: preloadedTodos,
  },
});

store.subscribe(()=>{
  const state =store.getState().todo;
  saveState(state)
})