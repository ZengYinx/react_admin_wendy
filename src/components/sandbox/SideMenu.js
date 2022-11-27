import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Sider } = Layout;
export default function  SideMenu(props) {
  const [list, setList] = useState([])
  useEffect(() => {
    console.log('eff');
    axios.get('http://localhost:8000/rights?_embed=children').then((res) => {
      console.log('get的数据：', res.data);
      setList(filterList(res.data));
    });
  }, [])
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log('click ', e);
    navigate(e.key);
  };
  // 对应key值的icon图标
  const iconList = {
    '/home': <UserOutlined />,
    '/user-manage': <UserOutlined />,
    '/right-manage': <UserOutlined />,
    '/right-manage/right/list': <UserOutlined />,
    '/right-manage/role/list': <UserOutlined />,

  }
  const filterList = (list) => {
    return list.map((item) => {
      const itemObj = {
        label: item.title,
        key: item.key,
        id: item.id,
        icon: iconList[item.key]
      };
      if(item.children?.length) {
        itemObj.children = filterList(item.children);
      }
      return itemObj;
    });
  }

  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed}>
      <div className="logo">全球新闻发布系统</div>
      <Menu
        onClick={onClick}
        style={{width: '100%'}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['/use-manage']}
        mode="inline"
        items={list}
      />
    </Sider>
  )
}
