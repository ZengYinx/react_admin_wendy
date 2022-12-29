import React, { useEffect, useState } from 'react';
import { Card, Col, Row, List, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Meta } = Card;
export default function Home() {
  const [viewList, setviewList] = useState([]); // 最常浏览的数据列表
  const [startList, setstartList] = useState([]); // 点赞最多

  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category&_sort=view&_order=sesc&_limit=6').then(res => {
      // console.log(res.data);
      setviewList(res.data);
    });
    axios.get('/news?publishState=2&_expand=category&_sort=start&_order=sesc&_limit=6').then(res => {
      // console.log(res.data);
      setstartList(res.data);
    })
  }, []);
  const { username, region,  role: {roleName}} = JSON.parse(localStorage.getItem('token'));
  return (
    <div>
      <Row gutter={16}>
      <Col span={8}>
        <Card title="用户最常浏览" bordered={true}>
        <List
          bordered= {false}
          dataSource={viewList}
          renderItem={(item) => (
            <List.Item>
              <a href={`#/news-manage/preview/${item.id}`}>
                {item.title}
              </a>
            </List.Item>
          )}
        />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="用户点赞最多" bordered={true}>
        <List
          bordered= {false}
          dataSource={startList}
          renderItem={(item) => (
            <List.Item>
              <a href={`#/news-manage/preview/${item.id}`}>
                {item.title}
              </a>
            </List.Item>
          )}
        />
        </Card>
      </Col>
      <Col span={8}>
        <Card
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={username}
            description={
              <div>
                <b>{region?region: '全球'}</b>
                <span style={{paddingLeft:'30px'}}>{roleName}</span>
              </div>
            }
          />
        </Card>
      </Col>
    </Row>
    </div>
  )
}
