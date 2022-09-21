import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, Col, Row, Space } from 'antd';
import { Alert, Input, Checkbox, Divider, Upload, Empty } from 'antd';
import './App.css';
import { get, post } from './axiosConfig';

import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'
import { FileAddOutlined, UploadOutlined, PlusOutlined, LoadingOutlined, ContactsOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import AddProductRow from './AddProductRow';
import TextArea from 'antd/lib/input/TextArea';






function AddProductsPage(props) {
  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()


  const [selectedFile, setSelectedFile] = useState(null);
  const [productsCount, setProductsCount] = useState(0);
  const [tempProductsArray, setTempProductsArray] = useState([]);
  const [vatChecked, setVatChecked] = useState(false);

  //states for image Upload
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  //states for image Upload


  useEffect(() => {
    console.log('vatChecked: ', vatChecked)
    console.log('productsCount: ', productsCount)
    console.log('tempProductsArray: ', tempProductsArray);
  }, [vatChecked, productsCount, tempProductsArray]);



  const getBase64 = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setSelectedFile(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  const fetchProducts = () => {
    get('/list').then((response) => {
      var res = { data: response.data }
      dispatch(setProductsGlobal(res))
      console.log('productsGlobal', productsGlobal)
    });
  }



  const submitBatch = () => {
    console.log('tempProductsArray:  ', tempProductsArray);
    const form_data = new FormData();
    form_data.append('data', JSON.stringify(tempProductsArray));
    console.log('formData:', ...form_data);


    post('/add-batch', form_data)
      .then(function (response) {
        console.log('Success!  :', form_data);
        console.log('Response for Add', response);
        fetchProducts();
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  function onFinish(values) {

    setTempProductsArray([...tempProductsArray, { 'title': values.title, 'short_note': values.short_note, 'description': values.description, 'price': values.price, 'vat_applicable': vatChecked, 'vat_percentage': values.vat_percentage, 'image': selectedFile, 'Image_local_url': fileList[0].thumbUrl }]);
    setProductsCount(productsCount + 1);
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //functions for Image Input Upload starts here
  // setPreviewImage(file.url || file.preview);
  // setPreviewOpen(true);
  // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));


  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    getBase64(newFileList[0].originFileObj)


  };

  const vatToggle = () => {
    setVatChecked(vatChecked ? false : true);
  };

  const removeClicked = (key) => {

    setTempProductsArray(tempProductsArray => tempProductsArray.filter((item, index) => index !== key))


  }

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
              label="Short Note"
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
              <TextArea />
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

            <div className='vat-input-frame'>
              <Form.Item>
                <Checkbox onChange={vatToggle}>
                  VAT&nbsp;Applicable?
                </Checkbox >
              </Form.Item>

              {vatChecked ? <div className='inner'><Form.Item
                name="vat_percentage">
                  VAT:&nbsp;
                <Input className='vat-percentage' type='number'></Input>
              </Form.Item>
                <span>%</span>
              </div>
                : null}
            </div>


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
              <p>VAT(%)</p>
            </Col>
            <Col className="gutter-row" span={3}>
              <p>Remove</p>
            </Col>
          </Row>


          {tempProductsArray && tempProductsArray.map((item, key) => {
            return (

              <div key={key} className='add-products-display-row'>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                >
                  <Col className="gutter-row" span={3}>
                    <p>{item.title}</p>
                  </Col>

                  <Col className="gutter-row" span={3}>
                    <p>{item.short_note}</p>
                  </Col>

                  <Col className="gutter-row" span={3}>
                    <p className='description'>{item.description}</p>
                  </Col>

                  <Col className="gutter-row" span={3}>
                    <p>{item.price}</p>
                  </Col>

                  <Col className="gutter-row" span={3}>
                    <img src={item.Image_local_url}></img>
                  </Col>

                  <Col className="gutter-row" span={3}>
                    <p>{item.vat_percentage}</p>
                  </Col>
                  <Col className="gutter-row" span={3}>
                    <Button className='button-warning' onClick={() => removeClicked(key)} >Remove</Button>
                  </Col>
                </Row>

              </div>



            )

          }
          )
          }
          {productsCount == 0 ? <Empty /> : null}
        </div>

        


        {productsCount > 0 ? <Button className='button-primary' onClick={submitBatch}>
          Submit
        </Button> : null}




      </div>

    </Content>
  )
}

export default AddProductsPage;