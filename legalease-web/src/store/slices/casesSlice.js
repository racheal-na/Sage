// import {createSlice, current} from '@reduxjs/toolkit';
// const caseSlice=createSlice({
//     name:'cases',
//     initialState:{
//         cases:[],
//         currentCase: null,
//         loading: false,
//         error:null,
//     },
//     reducers: {
//         fetchCaseStart:(state)=>{
//             state.loading=true;
//             state.error=null;
//         },
//         fetchCaseSuccess:(state,action)=>{
//             state.loading=true;
//             state.cases=action.payload;
//         },
//         fetchCaseFailure:(state,action)=>{
//             state.loading=false;
//             state.error=action.payload;
//         },
//         setCurentCase:(state,action)=>{
//             state.currentCase=action.payload;
//         },
//         addCase:(state,action)=>{
//             state.cases.push(action.payload);
//         },
//         updateCase:(state,action)=>{
//             const index = state.cases.findIndex(caseItem=>caseItem._id===action.payload._id);
//             if(index !==-1){
//                 state.cases[index]=action.payload;
//             }
//         },
//         deleteCase:(state,action)=>{
//             state.cases=state.cases.filter(caseItem=>caseItem._id !== action.payload);
            
//         },
//     },
// });
// export const {
//     fetchCasesStart,
//     fetchCaseSuccess,
//     fetchCaseFailure,
//     setCurentCase,
//     addCase,
//     updateCase,
//     deleteCase,
// }=caseSlice.actions;
// export default caseSlice.reducer;