import React, { Component, useEffect } from 'react';
import './App.css';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout, Checkbox } from 'antd';
import { Input, Form, Row, Col, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { FileAddOutlined, UploadOutlined, PlusOutlined, LoadingOutlined, ContactsOutlined } from '@ant-design/icons';
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
  const [fileListlocal, setFileListlocal] = useState([]);




  console.log('props.rowKey:', props.rowKey)
  const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

      const temp = [...props.imageArray];
      temp[props.rowKey] = reader.result
      props.setImageArray(temp)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }
  const fetchProducts = () => {

    console.log('fetchProducts Called!!')

    get('/list').then((response) => {
      var res = { data: response.data }
      console.log('res:', res)
      dispatch(setProductsGlobal(res))
      console.log('productsGlobal', productsGlobal)

    });
  }



  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileListlocal(newFileList);



    // props.setFileList(temp);
    getBase64(newFileList[0].originFileObj)


  };

  const vatToggle = () => {
    props.setVatChecked(props.vatChecked ? false : true);
  };

  const removeClicked = (key) => {

    props.setTempProductsArray(tempProductsArray => tempProductsArray.filter((item, index) => index !== key))


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


  const addData = (values) => {
    console.log('rowKey', props.rowKey)
    props.add(values);
  }

  return (


    <Form name='AddProductForm' className='add-product-form' onFinish={addData} onFinishFailed={onFinishFailed} autoComplete="off">
      <div className='add-multi-product-form-frame'>
        <Row>
          <Col className="gutter-row" span={3}>
            <Form.Item

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

          </Col>
          <Col className="gutter-row" span={3}>
            <Form.Item

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

          </Col>

          <Col className="gutter-row" span={3}>
            <Form.Item

              name="description"
              rules={[
                {
                  required: true,
                  message: 'Enter Description!',
                },
              ]}
            >
              <TextArea />
            </Form.Item>
          </Col>




          <Col className="gutter-row" span={3}>
            <Form.Item
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
          </Col>

          <Col className="gutter-row" span={3}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Upload The Product Image!',
                },
              ]}
            >
              <Upload

                listType="picture-card"
                fileList={fileListlocal}

                onChange={handleChange}
              >
                {fileListlocal.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={3}>
            <Form.Item>
              <Checkbox onChange={vatToggle}>
                VAT&nbsp;Applicable?
              </Checkbox >
            </Form.Item>
          </Col>



          <Col className="gutter-row" span={3}>
            {props.vatChecked ? <div className='vat-input-frame'><Form.Item
              name="vat_percentage">
              <Input className='vat-percentage' type='number'></Input>
            </Form.Item>
              <span>%</span>
            </div>
              : <span>-</span>}
          </Col>
          <Col className="gutter-row" span={3}>
            <Form.Item>
              <Button className='button-warning' onClick={() => removeClicked(props.key)} >Remove</Button></Form.Item>
          </Col>

        </Row>


        <div style={{ display: 'flex' }}>
          {props.productsCount == props.rowKey ? < Button className='button-primary' type="primary" htmlType="submit" >Add</Button> : null}
        </div>

      </div>
    </Form>

  );

}

export default AddProductRow;