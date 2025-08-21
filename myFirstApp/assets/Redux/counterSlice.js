import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState:{value:5},
    reducers:{
        add: (state)=>{state.value=state.value+1},
        subtract: (state)=>{state.value=state.value-1},
        reset: (state)=>{state.value=0}
    }
})
export const {add,subtract,reset}= counterSlice.actions;
export default counterSlice.reducer;