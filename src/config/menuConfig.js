import {
    HomeOutlined,
    StepBackwardOutlined,
    BgColorsOutlined ,
    FilePptOutlined,
    UserOutlined,
    TeamOutlined,
    RadarChartOutlined,
    BarChartOutlined ,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons'
const a= [
    {
        title:'首页',//菜单标题名字
        key:'/home',
        icon:HomeOutlined,
    },
    {
        title:'商品',
        key:'sub1',
        icon: BgColorsOutlined ,
        children:[
            {
                title:'品类管理',
                key:'/category',
                icon:StepBackwardOutlined
            },
            {
                title:'商品管理',
                key:'/product',
                icon:FilePptOutlined
            }
        ]
    },
    {
        title:'用户管理',
        key:'/user',
        icon:UserOutlined
    },
    {
        title:'角色管理',
        key:'/role',
        icon:TeamOutlined
    },
    {
        title:'图形图表',
        key:'sub2',
        icon:RadarChartOutlined,
        children:[
            {
                title:'柱形图',
                key:'/bar',
                icon:BarChartOutlined 
            },
            {
                title:'折线图',
                key:'/line',
                icon:LineChartOutlined
            },
            {
                title:'饼状图',
                key:'/pie',
                icon:PieChartOutlined
            }
        ]
    }
]
export default a