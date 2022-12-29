import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Card, Col, Row, List, Avatar, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios, { all } from 'axios';
import _ from 'lodash';

const { Meta } = Card;
export default function Home() {
  const [viewList, setviewList] = useState([]); // 最常浏览的数据列表
  const [startList, setstartList] = useState([]); // 点赞最多
  const [allList, setallList] = useState([]); 

  const [isVisible, setisVisible] = useState(false);
  const [pieChart, setpieChart] = useState();


  const barRef = useRef();
  const pieRef = useRef();

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
      renderBarView(_.groupBy(res.data, item => item.category.title));
      setallList(res.data)
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
  const renderPieView = (obj) => {
    const currentList = allList.filter(item => item.author === username);
    const groupObj = _.groupBy(currentList, item => item.category.title);
    let list = [];
    for(let key in groupObj) {
      list.push({
        name: key,
        value: groupObj[key].length
      })
    }
    console.log(list)
    // 基于准备好的dom，初始化echarts实例
    var myChart;
    if(!pieChart) {
      myChart = echarts.init(pieRef.current);
      setpieChart(myChart);
    } else {
      myChart = pieChart;
    }
    var option;
    option = {
      title: {
        text: '当前用户新闻分类图示',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        itemWidth: 24,   // 设置图例图形的宽
        itemHeight: 18,  // 设置图例图形的高
        // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
        x: 'left',
        // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
        y: 'center',
        textStyle: {
          color: '#666'  // 图例文字颜色
        },
        // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
        itemGap: 30,
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);

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
            <SettingOutlined key="setting" onClick={() => {
              setisVisible(true);
              setTimeout(() => {
                renderPieView();
              }, 0);
            }}/>,
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
    {/* 右边的抽屉的效果 */}
    <Drawer
      width='500px'
      title="个人新闻分类"
      placement="right"
      onClose={() => {
        setisVisible(false)
      }}
      open={isVisible}
    >
      <div ref= {pieRef} style={{
      width: '500px',
      height:'500px',
      marginTop: '30px'
      }}></div>
    </Drawer>
    {/* ecahrts的数据表格 */}
    <div ref= {barRef} style={{
      height: '400px',
      width: '100%',
      marginTop: '30px'
      }}></div>
    </div>
  )
}
