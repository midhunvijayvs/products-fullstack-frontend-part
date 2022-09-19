import React from 'react';
import { useState, useEffect } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Button, Form, Col, Row } from 'antd';
import { Alert, Input, Checkbox, Divider, Upload, Modal } from 'antd';
import './App.css';
import { get, post } from './axiosConfig';

import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'
import { FileAddOutlined, UploadOutlined, PlusOutlined, LoadingOutlined, ContactsOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import AddProductRow from './AddProductRow';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });




function AddProductsPage(props) {
  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()

  const [productsCount, setProductsCount] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tempProductsArray, setTempProductsArray] = useState([]);

  //states for image Upload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  //states for image Upload




const postBatch=()=>{
  console.log('tempProductsArray:  '  , tempProductsArray);
  const form_data1 = new FormData();
  for (var key in tempProductsArray) {
    form_data1.append(key, tempProductsArray[key]);
    console.log('formData:', form_data1);
      }; 
        
      

      post('/add-batch', form_data1)
        .then(function (response) {
          console.log('Success!  :', form_data1);
          console.log('Response for Add', response);
          fetchProducts();
        })
        .catch(function (error) {
          console.log(error);
        });
}

const fetchProducts = () => {

   

  get('/list').then((response) => {
     var res = { data: response.data }
     dispatch(setProductsGlobal(res))
     console.log('productsGlobal',productsGlobal)


   });
 }


  function onFinish(values) {
    setProductsCount(productsCount + 1);
    console.log(productsCount);
    setTempProductsArray([...tempProductsArray, { 'title': values.title, 'short_note': values.short_note, 'description': values.description, 'price': values.price, 'image': selectedFile, 'Image_local_url': fileList[0].thumbUrl }]);
    console.log(tempProductsArray);
  }

  //functions for Image Input Upload starts here
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);





  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Content>
      <div className='primary-frame'>

        <Form name='AddProductForm' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
              <Input />
            </Form.Item>


            <Form.Item
              label="Short Notes"
              name="short_note"
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


              rules={[
                {
                  required: true,
                  message: 'Upload The Product Image!',
                },
              ]}
            >



              <Upload

                listType="picture-card"
                fileList={fileList}

                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>


            </Form.Item>


            <Form.Item>
              <Checkbox onChange={() => {
                alert("You Checked the box!")
              }}>VAT&nbsp;Applicable
              </Checkbox>
            </Form.Item>


            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button className='button-primary' type="primary" htmlType="submit">Add</Button>

            </Form.Item>
          </div>
        </Form>
        
        <Divider orientation="left">List of Added Products</Divider>
        
        <div className='add-products-temp-list'>
          {tempProductsArray && tempProductsArray.map((item, key) => {
            return (

              <Row
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }} key={key}
              >
                <Col className="gutter-row" span={4}>
                  <div>{item.title}</div>
                </Col>

                <Col className="gutter-row" span={4}>
                  <div>{item.short_note}</div>
                </Col>

                <Col className="gutter-row" span={4}>
                  <div>{item.description}</div>
                </Col>

                <Col className="gutter-row" span={4}>
                  <div>{item.price}</div>
                </Col>

                <Col className="gutter-row" span={4}>
                  <img src={item.Image_local_url}></img>
                </Col>

                <Col className="gutter-row" span={4}>
                  <div>Yes</div>
                </Col>
              </Row>



            )

          }
          )
          }

        </div>


        <Button className='button-primary' onClick={postBatch} >
          Submit
        </Button>




      </div>

    </Content>
  )
}

export default AddProductsPage;