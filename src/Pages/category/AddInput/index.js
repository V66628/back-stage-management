import React, { Component } from 'react'
import { Form, Input } from 'antd';
export default class AddInput extends Component {
    form=React.createRef()
    onChange = () => {
       this.props.categoryName(this.form.current)
    }
    render() {
        const { category} = this.props
        console.log(category.name) 
        return (
            <Form onChange={this.onChange} ref={this.form} >
                <Form.Item 
                name='a' 
                initialValue={category.name}
                rules={[
                    {
                        required:true,
                        message:"分类名称必须输入"
                    }
                ]}
                >
                    <Input  />
                </Form.Item>
            </Form>
        )
    }
}
