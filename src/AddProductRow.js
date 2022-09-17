import React, { Component, useEffect } from 'react';
import './App.css';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout, Checkbox} from 'antd';
import { Input, Form } from 'antd';
import { get, post, put } from './axiosConfig';
import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';




function AddProductRow(props) {


  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()



  const { showAddProduct } = props

  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    
   
    
   

  },[selectedFile]);


  const fetchProducts = () => {

    console.log('fetchProducts Called!!')

    get('/list').then((response) => {
      var res = { data: response.data }
      console.log('res:',res)
      dispatch(setProductsGlobal(res))
      console.log('productsGlobal',productsGlobal)

    });
  }

 

  console.log('key from child:', props.map_key);


  return (


    <div className='add-multi-product-form-frame'>

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
            <Form.Item>
              <Checkbox onChange={()=> {
                  alert("You Checked the box!")
                }}>VAT&nbsp;Applicable
        </Checkbox>
            </Form.Item>

            {props.map_key==props.productsCount-1?(<Button className='button-primary' onClick={() => props.add()}>Add More</Button>):null}

    </div>
  );

}

export default AddProductRow;