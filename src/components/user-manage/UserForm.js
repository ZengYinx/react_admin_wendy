import React, { forwardRef, useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';

const UserForm = forwardRef((props, ref) => {
    const [form] = Form.useForm();
    const [isRegion, setisRegion] = useState(false);
    const handleChangeRole = (value) => {

        // 超级管理员不具备打开区域的选择
        if(value === 1) {
            setisRegion(true);
            ref.current.setFieldsValue({
                region:''
            })
        } else {
            setisRegion(false);
        }
    }
    useEffect(() => {
        setisRegion(props.isRegion)
    }, [props.isRegion])
    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
                ref={ref}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true, message: '请输入用户名！' }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input type='password' />
                </Form.Item>
                <Form.Item
                    name="region"
                    label="区域"
                    rules={ !isRegion && [{ required: true, message: '请选择区域!' }]}
                >
                    <Select
                        style={{ width: '100%' }}
                        options={props.regionList}
                        disabled={isRegion}
                    />
                </Form.Item>
                <Form.Item
                    name="roleId"
                    label="角色"
                    rules={[{ required: true, message: '请选择角色!' }]}
                >
                    <Select
                        style={{ width: '100%' }}
                        onChange={handleChangeRole}
                        options={props.roleList}
                    />
                </Form.Item>
            </Form>
        </div>
    )
})

export default UserForm;