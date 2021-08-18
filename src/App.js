import React, { Component, Fragment } from 'react'
import { Route ,Switch,Redirect} from 'react-router-dom';
import Login from  './Pages/login'  
import Admin from './Pages/admin'
import './App.less';
export default class App extends Component {
    render() {
        return (
         <Fragment>
             <Switch>
                 <Route path="/login"  component={Login}/>
                 <Route path="/" component={Admin}/>
             </Switch>   
         </Fragment>
        )
    }
}
