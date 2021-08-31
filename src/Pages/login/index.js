import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect, withRouter } from 'react-router-dom';
import './index.less'
import logo from './images/logo.png'
import {reqLogin} from '../../api'
import memoryUilts from '../../uilts/memoryUilts';
import localStorageUilts from '../../uilts/localStorageUilts';

const NormalLoginForm = (props) => {
    const onFinish =async (values) => {
    try{
      const response=await reqLogin(values)
      const {status}=response.data
      if(status===0){
        message.success('登录成功')
        props.history.replace("/")
        memoryUilts.user=response.data.data
        localStorageUilts.setUser(response.data.data)
      }else{
        message.error('登录失败')
      }
    }catch(error){
      console.log('出错了',error)
    }
    };
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入你的用户名',
            },
            {
                min:4,
                message:'用户名至少4位'
            },
            {
                max:12,
                message:'用户名至多12位'
            },
            {
                pattern:/^[a-zA-Z0-9_]+$/,
                message:'用户名必须由数字字母下划线组成'
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入你的密码',
            },
            {
                min:4,
                message:'密码至少4位'
            },
            {
                max:12,
                message:'密码至多12位'
            },
            {
                pattern:/^[a-zA-Z0-9_]+$/,
                message:'密码必须由数字字母下划线组成'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
           登录
          </Button>
        </Form.Item>
      </Form>
    );
  };
  const NewNor=withRouter(NormalLoginForm)
export default class Login extends Component {
    render() {
      if(memoryUilts.user._id){
        return  <Redirect to='/'/>

    }
            return (
                <div className='login'>
                    <div className='login-header'>
                        <img src={logo} alt='logo'></img>
                        <h1>React项目：后台管理系统</h1>
                    </div>
                    <div className='login-content'>
                        <h2>用户登录</h2>
                      <NewNor/>
                    </div>
                </div>
            )
        
    }
}
