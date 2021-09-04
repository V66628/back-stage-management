import React, { Component } from 'react'
import { Switch,Redirect,Route } from 'react-router-dom'
//商品管理路由
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product" />
            </Switch>
        )
    }
}
