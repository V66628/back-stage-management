import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import logo from '../../Pages/login/images/logo.png'
import './index.less'
import menuConfig from '../../config/menuConfig'

const { SubMenu } = Menu
class LeftNav extends Component {
    menuList = () => {
        const path = this.props.location.pathname
        return menuConfig.map((item) => {
            if (!item.children) {
                return (<Menu.Item key={item.key} icon={<item.icon />}>
                    <Link to={item.key}>{item.title}</Link>
                </Menu.Item>)
            } else {
                const itemChildren = item.children.find(itemChildren => itemChildren.key === path)
                if (itemChildren) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
                        {
                            item.children.map((children) => {
                                return (
                                    <Menu.Item key={children.key} icon={<children.icon />}>
                                        <Link to={children.key}>{children.title}</Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                )
            }
        })
    }
    componentWillMount() {
        this.newMenuList = this.menuList()
    }
    render() {
        const path = this.props.location.pathname
        return (
            <div>
                <Link to='/' className="leftNav-header">
                    <img src={logo} alt='log' />
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                >
                    {
                        this.newMenuList
                    }
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)
