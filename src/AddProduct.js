import React, { Component } from 'react';
import './App.css';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout } from 'antd';
import { Input, Form } from 'antd';
import axios from "axios";
import { get, post, put } from './axiosConfig';





function AddProduct(props) {
  

  const [products, setProducts] = React.useState(null);

  const { showAddProduct } = props


  const onFinish = (values) => {
    console.log(typeof(values));
    console.log('Success:', values);
    console.log('Add Product Props:', props);
    if (props.function == 'add') {
      
      

      post('/add', values)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      showAddProduct(false)
    }
    else if (props.function == 'edit') {

      var form_data = new FormData();

    for ( var key in values ) {
        form_data.append(key, values[key]);
    }
    form_data.append("_method",'put' )

    
      post(`/edit/${props.id}`, form_data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        showAddProduct(false)
    }
  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (


    <div className='add-product-frame'>
      <Layout>
        <Header>
          <h5>{props.function} Product</h5>
          <Button onClick={() => showAddProduct(false)}>Close</Button>
        </Header>
        <Content>


          <Form name='AddProductForm' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">

            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Enter Title!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Enter Description!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Short Notes"
              name="short_notes"
              rules={[
                {
                  required: true,
                  message: 'Enter Short Notes!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Enter Price!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: 'Upload The Product Image!',
                },
              ]}
            >
              <Input type='file' />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>





          </Form>
        </Content>




      </Layout>

    </div>
  );
}

export default AddProduct;