import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Steps, Input, Select, message } from 'antd';
import axios from 'axios';
import NewsEditor from '../../../components/news-manage/NewsEditor';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
export default function NewsAdd() {
  const [stepIndex, setStepIndex] = useState(0);
  const [categoriesList, setcategoriesList] = useState([]);
  const NewsForm = useRef();
  const [formInfo, setFormInfo] = useState({});
  const [newsContent, setNewsContent] = useState('');
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('token'));
  const items = [
    { title: '基本信息', description: '新闻标题' },
    { title: '新闻内容', description: '新闻主体内容'},
    { title: '新闻提交', description: '保存草稿或者提交审核' }];
  useEffect(() => {
    axios.get('/categories').then((res) => {
      // console.log(res.data);
      setcategoriesList(res.data);
    });
  }, []);
  // 下一步
  const handleNext = () => {
    console.log('handleNext');
    if (stepIndex === 0) {
      NewsForm.current.validateFields().then(res => {
        setStepIndex(stepIndex+1);
        console.log(res)
        setFormInfo(res)
      }).catch(err => {
        message.error('请填写信息')
      });
    } else {
      if(newsContent === '' || newsContent.trim() === '<p></p>') {
        message.error('新闻内容不能为空');
      } else {
        setStepIndex(stepIndex+1);
      }
    }
  }

  const handleSave = (state) => {
    console.log('handleNext', formInfo);
    const params = {
      ...formInfo,
      categoryId: 3,
      content: newsContent,
      region: userInfo.region || "全球",
      author: userInfo.username,
      roleId: userInfo.roleId,
      auditState: state,
      publishState: 0,
      createTime: Date.now(),
      star: 0,
      view: 0
    }
    axios.post('/news', params).then(res => {
      console.log(res);
      const navigateUrl = !state ? '/news-manage/draft' : '/audit-manage/list';
      navigate(navigateUrl);
    })
  }

  return (
    <div>
      <p style={{paddingBottom: '20px'}}>撰写新闻</p>
      <Steps items={items} current={stepIndex} />
      <div style={{margin: '50px 0'}}>
        <div className={stepIndex !== 0 ? 'hide' : ''}>
          <Form
            name="basic"
            labelCol={{span: 4}}
            wrapperCol={{span: 20}}
            initialValues={{remember: true}}
            autoComplete="off"
            ref={NewsForm}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[{
                  required: true,
                  message: 'Please input your username!',
                }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="categories"
              rules={[{
                  required: true,
                  message: 'Please input your username!',
                }]}
            >
              <Select>
                {
                  categoriesList.map(item => <Option key={item.id} value={item.id}>{item.title}</Option>)
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={stepIndex !== 1 ? 'hide' : ''}>
          <NewsEditor getContent={content => {
            setNewsContent(content)
          }}></NewsEditor>
        </div>
        <div className={stepIndex !== 2 ? 'hide' : ''}>
          2
        </div>
      </div>
      <div style={{paddingTop: '20px'}}>
        { (stepIndex === 2) && <>
          <Button type='primary' onClick={()=>handleSave(0)}>保存草稿箱</Button>
          <Button danger  onClick={()=>handleSave(1)}>提交审核</Button>
          </>
        }
        { stepIndex > 0 && <Button type='primary' onClick={() => setStepIndex(stepIndex-1)}>上一步</Button> }
        { stepIndex < 2 &&<Button onClick={() => handleNext()}>下一步</Button>}
      </div>
    </div>
  )
}
