import React, { useEffect, useState } from 'react';
import './App.css';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Space, Form, Checkbox } from 'antd';
import { get, post, put } from './axiosConfig';



function SendMailModal(props) {



  const [selectedFile, setSelectedFile] = useState(null);




  useEffect(
    () => {

      console.log('selectedFile:',selectedFile);
    }
    , [selectedFile]);


  const posClicked = (values) => {

    props.showPDF(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const cancelClicked = () => {
    props.setSendMailModalShown(false)

  }

  const checkBoxClicked = (e) => {

  };

  const sendMail = (values) => {

    let formdata1 = new FormData;
    formdata1.append('to', values.to);
    formdata1.append('cc', values.cc);
    formdata1.append('bcc', values.bcc);
    formdata1.append('from', values.from);
    formdata1.append('subject', values.subject);
    formdata1.append('content', values.content);
    formdata1.append('attachment', selectedFile);
    formdata1.append('title', props.data.title);
    formdata1.append('price', props.data.price);
    formdata1.append('description', props.data.description);
    


    props.setSendMailModalShown(false);

    post('/sendMail', formdata1)
      .then(function (response) {

        console.log('Response for Add', response);

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (


    <div className='modal-frame'>
      <Layout>
        <Header>
          <h5>Send Email</h5>
          <Button onClick={() => props.setSendMailModalShown(false)} className="close-button"><CloseOutlined /></Button>
        </Header>

        <Content className='modal-content'>

          <Form name='AddProductForm' onFinish={sendMail} onFinishFailed={onFinishFailed} autoComplete="off"
            initialValues={{
              ["to"]: 'midhunvijayvs@gmail.com',
              ["cc"]: 'ramees.c@tranetech.ae',
              ["bcc"]: 'sufwan@tranetech.ae',
              ["from"]: 'midhun@tranetech.com',
              ["subject"]: 'Testing Mail Server',
              ["content"]: 'lorem ipsum dolor sit amet',

            }}>


            <Form.Item
              label="TO"
              name="to"
              rules={[
                {
                  required: true,
                  message: 'Enter to Mail ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>


            <Form.Item
              label="CC"
              name="cc"
              rules={[
                {
                  required: true,
                  message: 'Enter CC Mail ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>



            <Form.Item
              label="BCC"
              name="bcc"
              rules={[
                {
                  required: true,
                  message: 'Enter BCC  Mail ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="FROM"
              name="from"
              rules={[
                {
                  required: true,
                  message: 'Enter from Mail ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>



            <Form.Item
              label="SUBJECT"
              name="subject"
              rules={[
                {
                  required: true,
                  message: 'Enter Subject!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label=" CONTENT"
              name="content"
              rules={[
                {
                  required: true,
                  message: 'Enter Mail Content!',
                },
              ]}
            >
              <Input />
            </Form.Item>



            <Form.Item
              label="ATTACHEMENT"
              name="attachment"
              rules={[
                {
                  required: true,
                  message: 'Upload The Attachment!',
                },
              ]}
            >

              <Input type='file'
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </Form.Item>



            <Space>
              <Form.Item>
                <Button className='button-yellow' type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>

              <Form.Item>
                <Button className='cancel-button' onClick={cancelClicked}>Cancel</Button>
              </Form.Item>


            </Space>

          </Form>




        </Content>




      </Layout>

    </div>
  );
}

export default SendMailModal;