import React, { useEffect } from 'react';
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../views/login/Login';
import NewsSandBox from '../views/sandbox/NewsSandBox';
import NotFound from '../views/NotFound/NotFound';
import Home from '../views/sandbox/Home/Home';
import UserList from '../views/sandbox/user-manage/UserList';
import RoleList from '../views/sandbox/right-manage/RoleList';
import RightList from '../views/sandbox/right-manage/RightList';

export default function IndexRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Redirect to='/home' />} />

                {/* 主页的内容 */}
                <Route path='/' element={<AuthComponent>
                                            <NewsSandBox/>
                                        </AuthComponent>}>
                    <Route path='' element={<Home />} />
                    <Route path='home' element={<Home />} />
                    <Route path='user-manage/list' element={<UserList />} />
                    <Route path='right-manage/role/list' element={<RoleList />} />
                    <Route path='right-manage/right/list' element={<RightList />} />
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