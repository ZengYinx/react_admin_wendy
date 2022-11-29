import React from 'react';
import { Layout, Dropdown, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;
export default function TopHead(props) {
  const { username, role: {roleName}} = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  const items = [
    { label: roleName, key: '0' }, // 菜单项务必填写 key
    { type: 'divider' },
    { label: '退出登录', key: 'exit', danger: true},
  ];
  const onClick = ({ key }) => {
    // console.log(key)
    if (key === 'exit') {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };
  return (
    <Header className="site-layout-background site__header" style={{ paddingLeft: '16px', background: '#fff' }}>
      {
        props.collapsed ? <MenuUnfoldOutlined onClick={props.changeCollapsed} /> : <MenuFoldOutlined onClick={props.changeCollapsed} />
      }
      <div className='login__ava'>
        <span>欢迎<span style={{color:'#1677ff'}}>{username}</span>回来</span>
        <Dropdown
          menu={{ items, onClick }}
        >
          <Avatar size={36} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}
