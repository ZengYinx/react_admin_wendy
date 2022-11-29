import { Table, Button, Modal, Tree } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  AlignLeftOutlined
} from '@ant-design/icons';
const { confirm } = Modal;


export default function RoleList() {
  const [dataSource, setdataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRights, setcurrentRights] = useState([]);
  const [currentId, setcurrentId] = useState(0);
  const [rightList, setrightlist] = useState([]);
  useEffect(() => {
    axios.get('/roles').then((res) => {
      const list = res.data;
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
      title: '角色名称',
      dataIndex: 'roleName'
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
            onClick={() => {
              showModal();
              // console.log(item.rights)
              setcurrentRights(item.rights);
              setcurrentId(item.id);
            }}
          />
          <Button
            danger icon={<DeleteOutlined />}
            size={10}
            shape="circle"
            onClick={()=> showDeleteConfirm(item)}
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
    axios.delete(`/roles/${item.id}`);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  // 确认
  const handleOk = () => {
    console.log(currentRights,"checkStrictly");
    setIsModalOpen(false);

    // 同步 dataSource
    setdataSource(dataSource.map((item) => {
      if(item.id === currentId) {
        return {
          ...item,
          rights: currentRights

        };
      }
      return item;
    }))
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    axios.get('/rights?_embed=children').then((res) => {
      const list = res.data;
      setrightlist(list);
    });
  }, []);
  const onCheck= (checkedKeys, info) => {
    setcurrentRights(checkedKeys);
  };

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{
        pageSize: 5
      }} rowKey={(item) => item.id}/>;
      {/*  */}
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Tree
          checkable
          treeData={rightList}
          checkedKeys = {currentRights}
          onCheck={onCheck}
          checkStrictly={true}
        />
      </Modal>
    </div>
  )
}
