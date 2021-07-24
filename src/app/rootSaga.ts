import { PayloadAction } from "@reduxjs/toolkit";
import { increment } from "features/counter/counterSlice";
import {all, takeEvery} from "redux-saga/effects"


function log(action:PayloadAction){
    console.log("logogo",action);
    
}
function* helloSaga(){
    console.log("hello saga");
    
 yield takeEvery(increment().type,log);
 
}

export default function* rootSaga(){
    console.log("root saga");
    
    yield all([helloSaga()]);
}