import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal} from 'antd'; 
import formateDate from '../../uilts/dateUtils'
import './index.less'
import { weather } from '../../api'
import localStorageUilts from '../../uilts/localStorageUilts'
import menuConfig from '../../config/menuConfig'
import memoryUilts from '../../uilts/memoryUilts'
import LinkBtton from '../link-button';
class Header extends Component {
    state = {
        time: formateDate(Date.now()),
        weather: ''
    }
    setTime = () => {
        setInterval(() => {
            const time = formateDate(Date.now())
            this.setState({ time })
        }, 1000)
    }
    weatherUpdate = async () => {
        const data = await weather({
            'key': '85fa89436a9cf33332d05fb2cc22f442',
            'city': 513400,
            'output': 'JSON'
        })
        setInterval(() => {
            const weather = data.data.lives[0].weather
            this.setState({ weather })
        }, 1000)
    }
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuConfig.forEach(item => {
            if (path === item.key) {
                title = item.title
            } else if (item.children) {
                item.children.forEach(Citem => {
                    if (path === Citem.key) {
                        title = Citem.title
                    }
                })
            }
        })
        return title
    }
    quit=()=>{
        const { confirm } = Modal;
        confirm({
            title: '你确定要退出吗？',
            onOk:()=>{
                localStorageUilts.removeUser()
                memoryUilts.user={}
                this.props.history.replace("/login")
            }
          });
    }
    componentDidMount() {
        this.setTime()
        this.weatherUpdate()
    }
    render() {
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    欢迎，{(localStorageUilts.getUser()).username}
                    <LinkBtton onClick={this.quit}>退出</LinkBtton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>{this.state.time} {this.state.weather}</div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)