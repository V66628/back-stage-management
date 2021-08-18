import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter} from 'react-router-dom'
import App from './App'
import localStorageUilts from './uilts/localStorageUilts'
import memoryUilts from './uilts/memoryUilts'
if (localStorageUilts.getUser()._id){
   memoryUilts.user=localStorageUilts.getUser()
}
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,document.getElementById("root"))