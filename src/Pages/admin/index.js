import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import memoryUilts from '../../uilts/memoryUilts'

export default class Admin extends Component {
    render() {
        if(!memoryUilts.user._id){
            return <Redirect to='/login'/>
        }

        return (
            <div>
                admin....
            </div>
        )
    }
}
