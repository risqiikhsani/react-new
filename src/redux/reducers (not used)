// export const simpleReducer = (state = 0, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return state + action.payload;
//     case "DECREMENT":
//       return state - action.payload;
//     default:
//       return state;
//   }
// };

// export const simpleReducer2nd = (state = 0, action) => {
//   switch (action.type) {
//     case "MULTIPLY":
//       return state * action.payload;
//     case "DIVIDE":
//       return state / action.payload;
//     default:
//       return state;
//   }
// };

// export function counterReducer(state = { value: 0 }, action) {
//     switch (action.type) {
//       case 'counter/incremented':
//         return { value: state.value + 1 }
//       case 'counter/decremented':
//         return { value: state.value - 1 }
//       default:
//         return state
//     }
//   }


import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name:'counter',
    initialState:0,
    reducers:{
        increment:state => state+1,
        decrement:state => state-1,
    }
})

export const {increment,decrement} = counterSlice.actions
    