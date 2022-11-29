import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../views/login/Login';
import NewsSandBox from '../views/sandbox/NewsSandBox';
import NotFound from '../views/NotFound/NotFound';
import LocalTouterMap from './LocalRouterMap';
import axios from 'axios';
export default function IndexRouter() {
    const [backRouterList, setBackRouterList] = useState([])
    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8000/rights'),
            axios.get('http://localhost:8000/children')
        ]).then(res => {
            setBackRouterList([...res[0].data, ...res[1].data]);
        })
    }, []);
    const checkRoute = (item) => {
        return LocalTouterMap[item.key] && item.pagepermisson;
    }
    // 当前账户的列表
    const {role: {rights}} = JSON.parse(localStorage.getItem('token'));
    // console.log(rights)
    // 权限列表
    const checkUserPermission = (item) =>{
        return rights.includes(item.key)
    }
    return (
        <HashRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Redirect to='/home' />} />

                {/* 主页的内容 */}
                <Route path='/' element={<AuthComponent>
                                            <NewsSandBox/>
                                        </AuthComponent>}>
                    {
                        backRouterList.map(item => {
                            if(checkRoute(item) && checkUserPermission(item)) {
                                return <Route
                                    key={item}
                                    path={item.key.slice(1)}
                                    element={LocalTouterMap[item.key]}
                                />
                            }
                            return null;
                        })
                    }
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}
// 自定义是否已登录的组件 - 路由拦截组件的封装
function AuthComponent({ children }) {
    // 组件中嵌套的子组件 children
    const isLogin = localStorage.getItem('token');
    return isLogin ? children : <Redirect to='/login' />
}

// 重定向的方法使用
function Redirect({ to }) {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: true })
    }, []);
    return null;
}