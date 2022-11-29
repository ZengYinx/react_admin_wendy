import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  VerticalAlignBottomOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import axios from 'axios';
const { confirm } = Modal;


export default function NewDraft() {
  const [dataSource, setdataSource] = useState([]);
  const {username} = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    axios.get(`/news?author=${username}&auditState=0&_expand=category`).then((res) => {
      const list = res.data;
      console.log(res.data);
      setdataSource(list);
    });
  }, [username]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (text) =>{
        return <b>{text}</b>
      }
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => category.title
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size={10}
            shape="circle"
          />
          <Button
            danger icon={<DeleteOutlined />}
            onClick={()=> showDeleteConfirm(item)}
            size={10}
            shape="circle"
          />
          <Button
            danger icon={<VerticalAlignBottomOutlined />}
             size={10}
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
  const deleteMethod = (item) => {
    console.log('确认删除项：', item);
    setdataSource(dataSource.filter(data => data.id !== item.id));
    axios.delete(`/news/${item.id}`);
  }
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={item => item.id}
      />;
    </div>
  )
}
