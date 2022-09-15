import React, { Component } from 'react';
import './App.css';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Form } from 'antd';
import axios from "axios";
import { connect } from "react-redux";
import { setProducts } from './redux/productsSlice';
import { setShowProducts } from './redux/showProductsReducer';
import { get, post, deleteEntry } from './axiosConfig';




const mapStateToProps = (state) => {
  return {
    mystates: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTheProducts: (obj) => dispatch(setProducts(obj)),

    setTheshowProducts: (obj) => dispatch(setShowProducts(obj)),
  

  };
};


function DeleteProduct(props) {

  const [products, setProducts] = React.useState(null);
  const { showDeleteProduct } = props



  const onFinish = (values) => {

    const id = props.id
    console.log('id to delete:  ', props.id);
    deleteEntry(`/${id}`)


      .then(function (response) {

      })
      .catch(function (error) {

      });
      showDeleteProduct(false)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  return (


    <div className='add-product-frame'>
      <Layout>
        <Header>
          <h5>Delete Product</h5>
          <Button onClick={() => showDeleteProduct(false)}>Close</Button>
        </Header>
        <Content className='delete-wrapper'>
          <Form name='DeleteProductForm' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <p>Are you sure to delete this Product?</p>
            <Space>
              <Button type="primary" htmlType="submit">Yes</Button>
              <Button onClick={() =>
                showDeleteProduct(false)}>Cancel</Button>
            </Space>

          </Form>

        </Content>




      </Layout>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProduct);