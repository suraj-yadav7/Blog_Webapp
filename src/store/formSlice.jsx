import {createSlice} from "@reduxjs/toolkit"


const initialState={
    loading:true,
    formData:null,
}

const formSlice = createSlice({
    name:"formSlice",
    initialState,
    reducers:{
        editForm:(state,action)=>{
            state.formData=action.payload
        }
    }
});

export const{editForm} = formSlice.actions
export  default formSlice.reducer