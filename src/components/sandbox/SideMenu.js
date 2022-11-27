import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
export default function  SideMenu(props) {
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log('click ', e);
    navigate(e.key);
  };
  const itemList = [
    {
      key: '/home',
      label: '首页',
      icon: <UserOutlined />
    },
    {
      key: '/use-manage',
      label: '用户管理',
      icon: null,
      children: [
        {
          key: '/use-manage/list',
          label: '用户列表',
          icon: null
        },
      ]
    },
    {
      key: '/right-manage',
      label: '权限列表',
      icon: null,
      children: [
        {
          key: '/right-manage/role/list',
          label: '角色列表',
          icon: null
        },
        {
          key: '/right-manage/right/list',
          label: '权限列表',
          icon: null
        },
      ]
    },
  ]
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className="logo">全球新闻发布系统</div>
      <Menu
        onClick={onClick}
        style={{width: '100%'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['/use-manage']}
        mode="inline"
        items={itemList}
      />
    </Sider>
  )
}
