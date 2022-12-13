import React, { useEffect } from 'react';
import './NewsSandBox.scss';
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/sandbox/SideMenu';
import TopHeader from '../../components/sandbox/TopHeader';

import { Layout } from 'antd';
// 渲染头部进度条的展示
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

const { Content } = Layout;
export default function NewsSandBox() {
  // 每次渲染组件时头部的进度的效果
  nProgress.start();
  useEffect(() =>{
    nProgress.done()
  });
  return (
    <Layout>
        <SideMenu></SideMenu>

        <Layout className="site-layout">
          <TopHeader></TopHeader>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 280,
              background: '#fff'
            }}
          >
            {/* 嵌套路由 */}
            <Outlet></Outlet>
          </Content>
        </Layout>
    </Layout>
  )
}
