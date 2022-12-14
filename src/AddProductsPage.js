import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, Col, Row, Input, Space } from 'antd';
import { Alert, Checkbox, Divider, Upload, Empty } from 'antd';
import './App.css';
import { get, post } from './axiosConfig';

import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'

import { Content } from 'antd/lib/layout/layout';

import { PropertySafetyFilled, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';




const AddProductsPage = () => {
  const [form] = Form.useForm();
  const [fileListlocal, setFileListlocal] = useState([]);
  const[base64ImageArray, setBase64ImageArray] = useState([]);  // for converting images to base64
  const [vatCheckedArray, setVatCheckedArray] = useState([]);

  useEffect(() => {
    console.log('fileListlocal:', fileListlocal);
  }, [fileListlocal])


  useEffect(() => {
    console.log('base64ImageArray:', base64ImageArray);
  }, [base64ImageArray])

  // const fetchProducts = () => {
  //   get('/list').then((response) => {
  //     var res = { data: response.data }
  //     dispatch(setProductsGlobal(res))
  //     console.log('productsGlobal', productsGlobal)
  //   });
  // }


  const convertToBase64AndPush = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {


      setBase64ImageArray([...base64ImageArray,reader.result]);
     
       
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  
  }


  const submitBatch = (values) => {
    var images = [];

    console.log('Received values of form:', values)

    for (let i = 0; i < values.products.length; i++) {

      values.products[i].vat_applicable = vatCheckedArray[i];

      if (values.products[i].vat_applicable == false) {
        values.products[i].vat_percentage = 0
      }

      values.products[i].image = base64ImageArray[i];

    }

    console.log('values of form after conversions:', values)


    post('/add-batch', values)
      .then(function (response) {
        console.log('Response for Add', response);
        //fetchProducts();
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  const addItemsToStateLists = (form) => {
    setFileListlocal([...fileListlocal, []]);
    setVatCheckedArray([...vatCheckedArray, false]);
    
   
    console.log('Received values of form:', form.getFieldsValue(true));

  }

  const removeItemsFromFileList = (form, key) => {
    const temp = fileListlocal;
    temp[key] = [];
    // console.log('temp', temp);
    setFileListlocal(temp);

    // console.log('Received values of form:', form.getFieldsValue(true));
  }
  const handleChange = (fileList, key) => {
    // console.log(fileList, key)
    let temp = [...fileListlocal];
    temp[key] = fileList;
    setFileListlocal(temp);

    convertToBase64AndPush(fileList[0].originFileObj);         // take the first(only one image in each row as of now) image, convert to base64 and push to base64ImageArray
    


  };

  const vatToggle = (key) => {
    let temp = [...vatCheckedArray];
    temp[key] = vatCheckedArray[key] ? false : true;
    setVatCheckedArray(temp);
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

  const doNothing = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    onSuccess("Ok");
  }

  return (
    <Content>
      <div className='primary-frame'>
        <div className='add-products-temp-list'>

          <Row className='table-header'
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            <Col className="gutter-row" span={3}>
              <p>Title</p>
            </Col>

            <Col className="gutter-row" span={3}>
              <p>Short Note</p>
            </Col>

            <Col className="gutter-row" span={3}>
              <p>Description</p>
            </Col>

            <Col className="gutter-row" span={3}>
              <p>Price</p>
            </Col>

            <Col className="gutter-row" span={3}>
              <p>Image</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>VAT Applicable?</p>
            </Col>

            <Col className="gutter-row" span={3}>
              <p>VAT(%)</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>Remove</p>
            </Col>
          </Row>



          <Form name="addProductForm" form={form} onFinish={submitBatch} autoComplete="off">
            <Form.List name="products">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row
                      key={key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >

                      <Col className="gutter-row" span={3}>
                        <Form.Item
                          {...restField}
                          name={[name, 'title']}
                          rules={[
                            {
                              required: true,
                              message: 'Enter Title',
                            },
                          ]}
                        >
                          <Input placeholder="Title" />
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={3}>
                        <Form.Item
                          {...restField}
                          name={[name, 'short_note']}
                          rules={[
                            {
                              required: true,
                              message: 'Enter ShortNote',
                            },
                          ]}
                        >
                          <Input placeholder="Short Note" />
                        </Form.Item>
                      </Col>

                      <Col className="gutter-row" span={3}>
                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          rules={[
                            {
                              required: true,
                              message: 'Enter Description!',
                            },
                          ]}
                        >
                          <Input placeholder="Description" />
                        </Form.Item>
                      </Col>


                      <Col className="gutter-row" span={3}>
                        <Form.Item
                          {...restField}
                          name={[name, 'price']}
                          rules={[
                            {
                              required: true,
                              message: 'Enter Price!',
                            },
                          ]}
                        >
                          <Input type='number' placeholder="Price" />
                        </Form.Item>
                      </Col>

                      <Col className="gutter-row" span={3}>
                        <Form.Item
                          {...restField}
                          name={[name, 'image']}
                          rules={[
                            {
                              required: true,
                              message: 'Upload The Product Image!',
                            },
                          ]}
                        >
                          <Upload
                            customRequest={doNothing}  // to stop the antd Upload's default uploading api call when selecting image

                            listType="picture-card"
                            fileList={fileListlocal[{ key }]}

                            onChange={(object) => handleChange(object.fileList, key)}
                          >
                            {fileListlocal[key].length >= 1 ? null : uploadButton}
                          </Upload>
                        </Form.Item>
                      </Col>





                      <Col className="gutter-row" span={3}>
                        <Form.Item
                          valuePropName='checked'


                          {...restField}
                          name={[name, 'vat_applicable']}
                          rules={[
                            {
                              required: false,

                            },
                          ]}
                        >
                          <Checkbox defaultChecked={false} onChange={() => vatToggle(key)}>

                          </Checkbox >
                        </Form.Item>
                      </Col>
                      <Col className="gutter-row" span={3}>
                        {vatCheckedArray[key] ? <div className='vat-input-frame'><Form.Item
                          {...restField}
                          name={[name, 'vat_percentage']}
                          rules={[
                            {
                              required: true,
                              message: 'Enter Price!',
                            },
                          ]}
                        >
                          <Input className='vat-percentage' type='number'></Input>
                        </Form.Item>

                          <span>%</span>
                        </div>
                          : <span>-</span>}
                      </Col>

                      <Col className="gutter-row" span={3}>
                        <MinusCircleOutlined onClick={() => {
                          remove(name);
                          removeItemsFromFileList(form, key);
                        }} />
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>





                    <Button type="dashed" className='button-grey button-add' onClick={() => {
                      add()
                      addItemsToStateLists(form);
                    }} block icon={<PlusOutlined />}>
                      Add New Product
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" className='button-yellow' htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Content>
  );
};

export default AddProductsPage;
