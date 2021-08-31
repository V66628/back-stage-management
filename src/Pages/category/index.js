import React, { Component } from 'react'
import { Card ,Table,Button } from 'antd';
import {PlusOutlined,ArrowRightOutlined } from '@ant-design/icons'
import LinkButton from '../../Components/link-button'
import {reqCategorys} from '../../api'
//品类管理路由
export default class Category extends Component {
  state={
    loading:false,
    categorys:[],
    subCategorys:[],
    parentId:"0",
    parentName:'' //当前需要显示的分类列表的父分类名称
  }
    extra=()=>{
        return (
        <Button type="primary">
             <PlusOutlined />
                添加
        </Button>
         )
    }
    getCategorys=async ()=>{
      this.setState({loading:true})
      const response=await reqCategorys({parentId:this.state.parentId})
      this.setState({loading:false})
      if(response.data.status===0){
        if(this.state.parentId==="0"){
          const categorys=response.data.data
          this.setState({categorys})
        }else{
          const subCategorys=response.data.data
          this.setState({subCategorys})
        }
      }
    }
    getSubCategorys=(category)=>{
      return ()=>{
          this.setState({parentId:category._id,parentName:category.name},()=>{
            this.getCategorys()
          })
      }
    }
    returnCategorys=()=>{
      this.setState({parentId:"0",parentName:"",subCategorys:[]})
    }
    componentDidMount(){
      this.getCategorys()
    }
    render() {
      const {loading,categorys,subCategorys, parentId,parentName}=this.state
      const title=parentId == 0? "一级分类列表":(
        <span>
          <LinkButton onClick={this.returnCategorys}>一级分类列表</LinkButton>
          <ArrowRightOutlined  style={{marginLeft:"-30px",marginRight:"8px"}}/>
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
              width:300,
              render:(category)=>{
                  return (
                    <span>
                    <LinkButton>修改分类</LinkButton>
                    {parentId==0?  <LinkButton onClick={this.getSubCategorys(category)}>查看子分类</LinkButton>: ""}
                  
                    </span>
                  )
                  
              }
            },
          ];
        return (
            <Card title={title} extra={this.extra()}>
              <Table columns={columns} dataSource={parentId==0? categorys:subCategorys} bordered rowKey="_id" loading={loading}/>
          </Card>
        )
    }
}
