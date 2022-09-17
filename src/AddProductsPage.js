import React from 'react';
import { useState,useEffect } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Button, Form } from 'antd';
import { Alert } from 'antd';
import './App.css';
import { get, post} from './axiosConfig';
import AddProduct from './AddProduct';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'
import {FileAddOutlined} from '@ant-design/icons';
import {Content } from 'antd/lib/layout/layout';
import AddProductRow from './AddProductRow';


function MainListPage(props) {
  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()

  const [productsCount, setProductsCount] = useState(1);

  

  const [tempProductsArray, setTempProductsArray] = useState([{'key':1,'data':{'title':'','short_note':'', 'description':'', 'price':''}}]);
  
  
  function add(){
    setProductsCount(productsCount+1);
    console.log(productsCount);

     setTempProductsArray([...tempProductsArray, {'key':1,'data':{'title':'','short_note':'', 'description':'', 'price':''}}]);
    console.log(tempProductsArray);
  }


  const onFinish = (values) => {
    
    if (props.function == 'add') {
      
      const form_data1 = new FormData();
      for ( var key in values ) {
        form_data1.append(key, values[key]);
      }

      //form_data1.set("image", selectedFile);

      post('/add', form_data1)
        .then(function (response) {
          console.log('Success!  :', form_data1);
          console.log('Response for Add',response);
          
        })
        .catch(function (error) {
          console.log(error);
        });

      
    }



    else if (props.function == 'edit') {

      var form_data2 = new FormData();

      for ( var key in values ) {
          form_data2.append(key, values[key]);
      }

      form_data2.append("_method",'put' )

      //form_data2.set("image", selectedFile);

      post(`/edit/${props.id}`, form_data2)
        .then(function (response) {
          console.log(response);
          
        })
        .catch(function (error) {
          console.log(error);
        });

       
    }
  }


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return(
      <Content>
        <div className='primary-frame'>
          
          <Form name='AddProductForm'  onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            {tempProductsArray && tempProductsArray.map((item, key)=>{
              console.log('key from parent:', key);

                  return (
                  <AddProductRow map_key={key} productsCount={productsCount} add={add}></AddProductRow>)
                }
              )
            }

<Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className='button-primary'>
                Submit
              </Button>
            </Form.Item>
          </Form>
          
            
          
          
          
        </div>
        
    </Content>
  )    
}

export default MainListPage;