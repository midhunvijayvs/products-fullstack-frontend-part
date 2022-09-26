import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, Col, Row, Space } from 'antd';
import { Alert, Input, Checkbox, Divider, Upload, Empty } from 'antd';
import './App.css';
import { get, post } from './axiosConfig';

import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'

import { Content } from 'antd/lib/layout/layout';
import AddProductRow from './AddProductRow';
import { PropertySafetyFilled } from '@ant-design/icons';







function AddProductsPage(props) {


  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()


  const [imageArray, setImageArray] = useState([]);
  const [productsCount, setProductsCount] = useState(0);
  const [tempProductsArray, setTempProductsArray] = useState([{ 'data': 'nill' }]);
  const [vatChecked, setVatChecked] = useState(false);

  //states for image Upload
  const [fileList, setFileList] = useState([]);
  //states for image Upload
  console.log('productCount:', productsCount);

  useEffect(() => {

    console.log('productsCount: ', productsCount)
    console.log('tempProductsArray: ', tempProductsArray);
  }, [productsCount, tempProductsArray,]);





  const fetchProducts = () => {
    get('/list').then((response) => {
      var res = { data: response.data }
      dispatch(setProductsGlobal(res))
      console.log('productsGlobal', productsGlobal)
    });
  }


  function add(values) {
    console.log('values: ', values)

    const temp = tempProductsArray.filter((item, index) => Object.keys(item).length > 1);
    setTempProductsArray([...temp, { 'title': values.title, 'short_note': values.short_note, 'description': values.description, 'price': values.price, 'vat_applicable': vatChecked, 'vat_percentage': vatChecked?values.vat_percentage:0  }, { 'data': 'nill' }]);
    setProductsCount(productsCount + 1);
    
  }

  const popTail= ()=>{
    const temp = tempProductsArray.filter((item, index) => Object.keys(item).length > 1);
    setTempProductsArray([...temp]);
  }
  const submitBatch = () => {
    console.log('tempProductsArray:  ', tempProductsArray);
    popTail();
    
    const form_data = new FormData();
    form_data.append('data', JSON.stringify(tempProductsArray));
    form_data.append('images', JSON.stringify(imageArray));
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








  //functions for Image Input Upload starts here
  // setPreviewImage(file.url || file.preview);
  // setPreviewOpen(true);
  // setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));






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



          {tempProductsArray.map((item, key) => {
            return (
              <AddProductRow rowKey={key} add={add} fileList={fileList} setProductsCount={setProductsCount} productsCount={productsCount} setTempProductsArray={setTempProductsArray} tempProductsArray={tempProductsArray}  setVatChecked={setVatChecked} vatChecked={vatChecked} imageArray={imageArray} setImageArray={setImageArray}></AddProductRow>
            )
          })}





          {productsCount > 0 ? <Button className='button-primary' onClick={submitBatch} >submit</Button> : null}






        </div>
      </div>

    </Content >
  )
}

export default AddProductsPage;