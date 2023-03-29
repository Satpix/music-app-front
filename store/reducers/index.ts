import { combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { HYDRATE } from 'next-redux-wrapper';
import { trackReducer } from "./trackReducers";

const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
})


export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    console.log('wtf');
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    console.log(nextState);
    console.log(state.player);
    console.log(state.track)
    if (state.player) nextState.player = state.player; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

// export interface State {
//   tick: string;
// }

// // create your reducer
// const reducer = (state: State = {tick: 'init'}, action: AnyAction) => {
//   switch (action.type) {
//     case HYDRATE:
//       // Attention! This will overwrite client state! Real apps should use proper reconciliation.
//       return {...state, ...action.payload};
//     case 'TICK':
//       return {...state, tick: action.payload};
//     default:
//       return state;
//   }
// };

export type RootState = ReturnType<typeof rootReducer>