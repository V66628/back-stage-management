import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
export default class AddForm extends Component {
    form=React.createRef()
    onChange=()=>{
        this.props.getForm(this.form.current)
    }
    render() {
        const { Option } = Select;
        const {categorys,parentId}=this.props 
        console.log(parentId)
        return (
            <Form ref={this.form} onChange={this.onChange}>
                <Form.Item
                initialValue={parentId}
                name="parentId"
                    rules={[{ required: true, message: 'Please select gender!' }]}
                >
                    <Select >
                        <Option value="0">一级分类</Option>
                       { categorys.map(c=> <Option value={c._id} key={c._id}>{c.name}</Option> )}
                    </Select> 
                </Form.Item>
                <Form.Item
                name='addClassification'
                rules={[
                    {
                        required:true,
                        message:"分类名称必须输入"
                    }
                ]}
                >
                    <Input placeholder='请输入分类名称'/>
                </Form.Item>
            </Form>

        )
    }
}
