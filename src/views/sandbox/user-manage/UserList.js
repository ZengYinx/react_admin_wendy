import { Button, Modal, Switch, Table } from 'antd';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import {
  DeleteOutlined,
  AlignLeftOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import UserForm from '../../../components/user-manage/UserForm';
const { confirm } = Modal;

export default function UserList() {
  const [dataSource, setdataSource] = useState([]);
  const [isOpen, setisOpen] = useState(false);
  const [regionList, setregionList] = useState([]);
  const [roleList, setroleList] = useState([]);
  const formRef = useRef();
  const [isAdd, setisAdd] = useState(true);
  const [isRegion, setisRegion] = useState(false);
  const [replaceItem, setreplaceItem] = useState({})
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        {
          text: '全球',
          value: '全球'
        },
        ...regionList.map(item => ({
          text: item.label,
          value: item.value
        }))
      ],
      onFilter: (value, item) => {
        if (value === '全球') {
          return item.region === '';
        }
        return item.region === value;
      },
      render: (text) =>{
        return <b>{text || '全球'}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role?.roleName
      }
    },
    {
      title: '用户名称',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return <Switch
          checked={roleState}
          disabled={item.default}
          onChange={() => handleChange(item)}
        ></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            type="primary"
            icon={<AlignLeftOutlined />}
            size={10}
            shape="circle"
            onClick={() => { updataItem(item)}}
          />
          <Button
            danger icon={<DeleteOutlined />}
            size={10}
            shape="circle"
            onClick={()=> {showDeleteConfirm(item)}}
          />
        </div>
      }
    },
  ];
  useEffect(() => {
    axios.get('/users?_expand=role').then((res) => {
      const list = res.data;
      // console.log(list)
      setdataSource(list);
    });
  }, []);
  useEffect(() => {
    axios.get('/regions').then((res) => {
      const list = res.data.map((item) => {
        return {
          value: item.value,
          label: item.title,
          id: item.id
        }
      });
      setregionList(list);
    });
  }, []);
  useEffect(() => {
    axios.get('/roles').then((res) => {
      const list = res.data.map((item) => {
        return {
          value: item.id,
          label: item.roleName,
          item: item.id,
          ...item
        }
      });
      setroleList(list);
    });
  }, []);
  const submitForm = () => {
    // 获取到表单的数据
    formRef.current.validateFields().then((data) => {
      if(isAdd) {
        console.log('添加数据')
        axios.post(`/users`, {
          ...data,
          "roleState": true,
          "default": false
        }).then((res) => {
          setdataSource([...dataSource, {
            ...res.data,
            role:roleList.filter(item => item.value === res.data.roleId)[0]
          }]);
          // 关闭弹窗并清除数据
          setisOpen(false);
          formRef.current.resetFields();
        });
      } else {
        console.log('数据的更新');
        console.log(replaceItem)
        setdataSource(dataSource.map(item => {
          if(item.id === replaceItem.id) {
            return {
              ...item,
              ...data,
              role:roleList.filter(item => item.id === data.roleId)[0]
            }
          }
          return item;
        }));
        setisOpen(false);
        formRef.current.resetFields();
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  const showDeleteConfirm = (item) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // console.log('OK', item);
        deleteMethod(item);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const deleteMethod = (item) => {
    console.log(item);
    setdataSource(dataSource.filter(data => data.id !== item.id));
    axios.delete(`/users/${item.id}`)
  }
  const handleChange = (item) => {
    item.roleState = !item.roleState;
    setdataSource([...dataSource]);
    axios.patch(`/users/${item.id}`, {
      roleState: item.roleState
    })
  }
  const updataItem = (item) => {
    setisAdd(false);
    setisOpen(true);
    (item.roleId === 1) ? setisRegion(true) : setisRegion(false);
    setTimeout(() => {
      formRef.current.setFieldsValue(item);
      setreplaceItem(item);
    }, 0);
  }
  return (
    <div>
      <Button onClick={() => {
        setisOpen(true);
        setisAdd(true);
        setisRegion(false);
      }}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} pagination={{
      pageSize: 5
    }} rowKey={(item) => item.id}/>;

    <Modal
      open={isOpen}
      title="用户列表"
      okText={isAdd ? '添加' : '更新'}
      cancelText="Cancel"
      onCancel={() => {
        setisOpen(false);
        formRef.current.resetFields();

      }}
      onOk={() => {
        submitForm();
      }}
    >
      <UserForm ref={formRef} regionList={regionList} roleList={roleList} isAdd={isAdd} isRegion={isRegion}/>
    </Modal>
    </div>
  )
}
