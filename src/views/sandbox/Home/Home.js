import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Card, Col, Row, List, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import _ from 'lodash';

const { Meta } = Card;
export default function Home() {
  const [viewList, setviewList] = useState([]); // 最常浏览的数据列表
  const [startList, setstartList] = useState([]); // 点赞最多
  const barRef = useRef();

  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category&_sort=view&_order=sesc&_limit=6').then(res => {
      // console.log(res.data);
      setviewList(res.data);
    });
    axios.get('/news?publishState=2&_expand=category&_sort=start&_order=sesc&_limit=6').then(res => {
      // console.log(res.data);
      setstartList(res.data);
    });
  }, []);

  // echarts的数据的格式
  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category').then(res => {
      // console.log(res.data);
      // console.log(_.groupBy(res.data, item => item.category.title));
      renderBarView(_.groupBy(res.data, item => item.category.title))
    });
    // 组件销毁的时候调用
    return () => {
      window.onresize = null;
    };
  }, []);
  const renderBarView = (obj) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(barRef.current);
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '新闻分类'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: '45',
          interval: 0
        }
      },
      yAxis: {
        minInterval: 1
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map(item => item.length)
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // resize的监听；
    window.onresize = () => {
      myChart.resize();
    }
  }
  const { username, region,  role: {roleName}} = JSON.parse(localStorage.getItem('token'));
  return (
    <div style={{overflowY: 'scroll'}}>
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
    {/* ecahrts的数据表格 */}
    <div ref= {barRef} style={{
      height: '400px',
      width: '100%',
      marginTop: '30px'
      }}></div>
    </div>
  )
}
