import React, { useEffect } from 'react';
import './NewsSandBox.scss';
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/sandbox/SideMenu';
import TopHeader from '../../components/sandbox/TopHeader';
import { connect } from 'react-redux';

import { Layout, Spin } from 'antd';
// 渲染头部进度条的展示
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';

const { Content } = Layout;
function NewsSandBox(props) {
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
              overflowY: 'scroll',
              background: '#fff'
            }}
          >
            {/* 嵌套路由 */}
            {/* Spin加载loading的组件, 控制loading的显示与否spinning */}
            <Spin size='large' spinning ={props.isLoading}>
              <Outlet></Outlet>
            </Spin>
          </Content>
        </Layout>
    </Layout>
  )
}
const mapStateToProps = (state) => {
  const {LoadingReducer} = state
  return {
    isLoading: LoadingReducer.isLoading
  }
}
export default connect(mapStateToProps)(NewsSandBox);