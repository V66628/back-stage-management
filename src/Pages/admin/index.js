import React, { Component,Fragment  } from 'react'
import { Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import memoryUilts from '../../uilts/memoryUilts'
import Header from '../../Components/header'
import LeftNav from  '../../Components/left-nav'
import Home from '../home'
import Category from '../category';
import Product from '../product';
import Role from '../role';
import User from '../user'; 
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        if (!memoryUilts.user._id) {
            return <Redirect to='/login' />
        }

        return (
            <Fragment>
                <Layout style={{height:'100%'}}>
                    <Sider>
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        <Header/>
                        <Content style={{backgroundColor:'white',margin:'30px 40px'}}>
                            <Switch>
                                <Route path="/home" component={Home}/>
                                <Route path="/category" component={Category}/>
                                <Route path="/product" component={Product}/>
                                <Route path="/role" component={Role}/>
                                <Route path="/user" component={User}/>
                                <Route path="/bar" component={Bar}/>
                                <Route path="/line" component={Line}/>
                                <Route path="/pie" component={Pie}/>
                                <Redirect to='/home'/>
                            </Switch>
                        </Content>
                        <Footer style={{color:'#ccc',textAlign:"center"}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                    </Layout>
                </Layout>
            </Fragment>
        )
    }
}
