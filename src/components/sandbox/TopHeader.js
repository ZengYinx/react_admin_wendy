import React from 'react';
import { Layout, Dropdown, Avatar } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header } = Layout;
function TopHead(props) {
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
  const onChangeHandle = () =>{
    props.changeCollapsed()
  }
  return (
    <Header className="site-layout-background site__header" style={{ paddingLeft: '16px', background: '#fff' }}>
      {
        props.isCollapsed ? <MenuUnfoldOutlined onClick={onChangeHandle} /> : <MenuFoldOutlined onClick={onChangeHandle} />
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
const mapStateToProps = (state) => {
  // 获取到reducer中的值
  // console.log(state, "stat");
  const {CollApsedReducer} = state
  return {
    isCollapsed: CollApsedReducer.isCollapsed
  }
}
const mapDispatchToProps = {
  changeCollapsed () {
    return {
      type: 'change_collapsed'
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopHead);