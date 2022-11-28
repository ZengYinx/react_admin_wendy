import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
const { confirm } = Modal;

export default function RightList() {
  const [dataSource, setdataSource] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/rights?_embed=children').then((res) => {
      const list = res.data;
      list.forEach(element => {
        if(element.children.length === 0) {
          element.children = ''
        }
      });
      // console.log(res.data);
      setdataSource(list);
    });
  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text) =>{
        return <b>{text}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限地址',
      dataIndex: 'key',
      render: (text) =>{
        return <Tag>{text}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Popover content={<div>
            <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)}></Switch>
            </div>}
            title="配置项"
            trigger={item.pagepermisson!==undefined ? 'click' : ''}
          >
            <Button type="primary" icon={<EditOutlined />} size={10} shape="circle" disabled={item.pagepermisson === undefined}/>
          </Popover>
          <Button
            danger icon={<DeleteOutlined />}
            onClick={()=> showDeleteConfirm(item)} size={10}
            shape="circle"
          />
        </div>
      }
    },
  ];
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
  const switchMethod = (item) => {
    // console.log(item);
    item.pagepermisson = item.pagepermisson === 0 ? 1 : 0;
    setdataSource([...dataSource]);
    if(item.grade === 1) {
      axios.patch(`http://localhost:8000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      });
    } else {
      axios.patch(`http://localhost:8000/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      });
    }
  }
  const deleteMethod = (item) => {
    console.log('确认删除项：', item);
    // 第一层级
    if(item.grade === 1) {
      setdataSource(dataSource.filter(data => data.id !== item.id));
      // axios.delete(`http://localhost:8000/rights/${item.id}`);
    } else {
      const list = dataSource.filter(data => data.id === item.rightId);
      list[0].children = list[0].children.filter(data => data.id !== item.id);
      setdataSource([...dataSource]);
      // axios.delete(`http://localhost:8000/children/${item.id}`);

    }
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{
        pageSize: 5
      }}/>;
    </div>
  )
}
