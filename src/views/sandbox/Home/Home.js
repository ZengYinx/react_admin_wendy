import React from 'react';
import { Button } from 'antd';
import axios from 'axios';

export default function Home() {
  // json-server的增删改查；
  return (
    <div>
      Home
      <Button onClick={() => {
        axios.get('http://localhost:8000/posts').then((res) => {
          console.log('get的数据：', res)
        });
      }}>获取数据</Button>
      <Button onClick={() => {
        axios.post('http://localhost:8000/posts', {
          title: '777',
          author: 'kervin'
        });
      }}>post提交数据</Button>

      <Button onClick={() => {
        axios.put('http://localhost:8000/posts/1', {
          title: '111- 替换id为1的值'
        });
      }}>put替换数据</Button>

      <Button onClick={() => {
        axios.patch('http://localhost:8000/posts/1', {
          title: '111- 修改id为1的值'
        });
      }}>patch更新数据</Button>

      <p>关联的id会一并删除</p>
      <Button onClick={() => {
        axios.delete('http://localhost:8000/posts/1')
      } }>delete更新数据</Button>

      <p>_embed</p>
      <Button onClick={() => {
        axios.get('http://localhost:8000/posts?_embed=comments').then((res) => {
          console.log('get的数据：', res.data)
        });
      }}>获取_embed向下关联的数据数据</Button>
      <hr />
      <p>_expand</p>
      <Button onClick={() => {
        axios.get('http://localhost:8000/comments?_expand=post').then((res) => {
          console.log('get的数据：', res.data)
        });
      }}>获取_expand向下关联的数据数据</Button>
    </div>
  )
}
