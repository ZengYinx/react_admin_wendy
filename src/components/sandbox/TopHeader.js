import React from 'react';
import { Layout, Dropdown, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
const items = [
  { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
  { label: (
    <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
      2nd menu item
    </a>
  ) , key: 'item-2' },
  { type: 'divider' },
  { label: '3rd menu item（disabled）', key: '3', danger: true},
];
const { Header } = Layout;
export default function TopHead(props) {
  return (
    <Header className="site-layout-background" style={{ paddingLeft: '16px', background: '#fff' }}>
      {
        props.collapsed ? <MenuUnfoldOutlined onClick={props.changeCollapsed} /> : <MenuFoldOutlined onClick={props.changeCollapsed} />
      }
      <div className='login__box'>
        <span>欢迎回来</span>
        <Dropdown menu={{ items }}>
          <Avatar size={36} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}
