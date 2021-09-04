import React, { Component } from 'react'
import { Card, Table, Button, Modal, message } from 'antd';
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../Components/link-button'
import { reqCategorys, updateCategorys, addCategorys } from '../../api'
import AddForm from './AddForm';
import AddInput from './AddInput';
//品类管理路由
export default class Category extends Component {
  state = {
    loading: false,
    categorys: [],
    subCategorys: [],
    parentId: "0",
    parentName: '',//当前需要显示的分类列表的父分类名称
    showStatus: 0 //状态为0 则添加与修改对话框都不显示， 状态为1 则添加对话框显示，状态为2 则修改对话框显示。
  }
  extra = () => {
    return (
      <Button type="primary" onClick={this.add}>
        <PlusOutlined />
        添加
      </Button>
    )
  }
  //展示列表
  getCategorys = async (parentId) => {
    this.setState({ loading: true })
    const response = await reqCategorys({ parentId: parentId === '0' ? parentId : this.state.parentId })
    this.setState({ loading: false })
    if (response.data.status === 0) {
      if ((parentId || this.state.parentId) === "0") {
        const categorys = response.data.data
        this.setState({ categorys })
      } else {
        const subCategorys = response.data.data
        this.setState({ subCategorys })
      }
    }
  }
  getSubCategorys = (category) => {
    return () => {
      this.setState({ parentId: category._id, parentName: category.name }, () => {
        this.getCategorys()
      })
    }
  }
  returnCategorys = () => {
    this.setState({ parentId: "0", parentName: "", subCategorys: [] })
  }
  //添加分类
  addCategorys = () => {
    this.addForm.validateFields().then(async values => {
      this.setState({ showStatus: 0 })
      const response = await addCategorys({ parentId: this.addForm.getFieldValue('parentId'), categoryName: this.addForm.getFieldValue('addClassification') })
      this.addForm.resetFields()
      if (response.data.status === 0) {
        if (this.addForm.getFieldValue('parentId') === this.state.parentId) {
          this.getCategorys()
        } else if (this.state.parentId === '0') {
          this.getCategorys("0")
        }
      } else {
        message.error("添加失败")
      }
    })
  }
  handleCancel = () => {
    this.setState({ showStatus: 0 })
  }
  add = () => {
    this.setState({ showStatus: 1 })
  }
  change = (category) => {
    return () => {
      this.category = category || {}
      this.setState({ showStatus: 2 })
    }
  }
  //确认修改分类
  changeCategorys = () => {
    this.form.validateFields().then(async values => {
      this.setState({ showStatus: 0 })
      const response = await updateCategorys({ categoryId: this.category._id, categoryName: this.form.getFieldValue('a') })
      if (response.data.status === 0) {
        this.setState({ parentId: this.category.parentId })
        this.getCategorys()
        this.form.resetFields()
      } else {
        message.error('出错啦')
      }
    })

  }
  componentWillMount() {
    this.category = {}
  }
  componentDidMount() {
    this.getCategorys()

  }
  render() {
    const { loading, categorys, subCategorys, parentId, parentName, showStatus } = this.state
    const title = parentId === "0" ? "一级分类列表" : (
      <span>
        <LinkButton onClick={this.returnCategorys}>一级分类列表</LinkButton>
        <ArrowRightOutlined style={{ marginLeft: "-30px", marginRight: "8px" }} />
        {parentName}
      </span>
    )
    const columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        dataIndex: '',
        width: 300,
        render: (category) => {
          this.category = category
          return (
            <span>
              <LinkButton onClick={this.change(category)}>修改分类</LinkButton>
              {parentId === "0" ? <LinkButton onClick={this.getSubCategorys(category)}>查看子分类</LinkButton> : ""}

            </span>
          )

        }
      },
    ];
    return (
      <Card title={title} extra={this.extra()}>
        <Table columns={columns} dataSource={parentId === "0" ? categorys : subCategorys} bordered rowKey="_id" loading={loading} />
        {/* 添加对话框 */}
        <Modal title="添加分类" visible={showStatus === 1 ? true : false} onOk={this.addCategorys} onCancel={this.handleCancel}>
          <AddForm getForm={(value) => { this.addForm = value }} categorys={categorys} parentId={this.category.parentId} />
        </Modal>
        {/* 修改对话框 */}
        <Modal title="修改分类" visible={showStatus === 2 ? true : false} onOk={this.changeCategorys} onCancel={this.handleCancel}>
          <AddInput category={this.category} categoryName={(form) => { this.form = form }} />
        </Modal>
      </Card>
    )
  }
}
