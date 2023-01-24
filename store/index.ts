// import { configureStore } from '@reduxjs/toolkit';

// export const store = configureStore({
//   reducer: {},
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;




import { Context, createWrapper } from "next-redux-wrapper";
import { applyMiddleware, Store, createStore, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { reducer, RootState } from "./reducers";

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer, applyMiddleware(thunk));

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true }); 

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>
