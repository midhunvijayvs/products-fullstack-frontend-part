import React, { Component, useEffect } from 'react';
import './App.css';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout } from 'antd';
import { Input, Form } from 'antd';
import axios from "axios";
import { get, post, put } from './axiosConfig';
import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
const baseURL = "http://127.0.0.1:8000/api";



function AddProduct(props) {


  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()



  const { showAddProduct } = props

  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    
    console.log("image File", selectedFile);
    console.log(props.data);
    
   

  },[selectedFile]);


  const fetchProducts = () => {

    console.log('fetchProducts Called!!')

    axios.get(`${baseURL}/list`).then((response) => {
      var res = { data: response.data }
      console.log('res:',res)
      dispatch(setProductsGlobal(res))
      console.log('productsGlobal',productsGlobal)

      // props.setTheProducts({ products })
      // console.log('from App', props.mystates.products)

    });
  }

 

  const onFinish = (values) => {
    console.log(typeof(values));
    
   
    
    
   
   
    if (props.function == 'add') {
      
      const form_data1 = new FormData();
      for ( var key in values ) {
        form_data1.append(key, values[key]);
      }

      form_data1.set("image", selectedFile);

      post('/add', form_data1)
        .then(function (response) {
          console.log('Success!  :', form_data1);
          console.log('Response for Add',response);
          fetchProducts();
        })
        .catch(function (error) {
          console.log(error);
        });

      showAddProduct(false)
    }



    else if (props.function == 'edit') {

      var form_data2 = new FormData();

      for ( var key in values ) {
          form_data2.append(key, values[key]);
      }

      form_data2.append("_method",'put' )

      form_data2.set("image", selectedFile);

      post(`/edit/${props.id}`, form_data2)
        .then(function (response) {
          console.log(response);
          fetchProducts();
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
          <Button onClick={() => showAddProduct(false)} className="close-button">Close</Button>
        </Header>
        <Content>


          <Form name='AddProductForm' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off"
          initialValues={{
            ["title"]: props.data.title,
            ["short_notes"]: props.data.short_notes,
            ["description"]: props.data.description,
            ["price"]: props.data.price
            
            
            
            
          }}>

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
              <Input/>
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

              <Input type='file' 
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.files[0])}
              />
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