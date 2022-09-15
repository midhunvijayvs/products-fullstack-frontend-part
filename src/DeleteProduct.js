
import './App.css';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout } from 'antd';
import {CloseOutlined } from '@ant-design/icons';
import {Space, Form } from 'antd';
import axios from "axios";


import { deleteEntry } from './axiosConfig';

import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'

const baseURL = "http://127.0.0.1:8000/api";





function DeleteProduct(props) {


  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()



  const { showDeleteProduct } = props


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

    const id = props.id
    console.log('id to delete:  ', props.id);
    deleteEntry(`/${id}`)


      .then(function (response) {

        fetchProducts();

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
          <Button onClick={() => showDeleteProduct(false)} className="close-button"><CloseOutlined /></Button>
        </Header>
        <Content className='delete-wrapper'>
          <Form name='DeleteProductForm' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <p>Are you sure to delete this Product?</p>
            <Space>
              <Button type="primary" htmlType="submit">Yes</Button>
              <Button className='cancel-button' onClick={() =>
                showDeleteProduct(false)}>Cancel</Button>
            </Space>

          </Form>

        </Content>




      </Layout>

    </div>
  );
}

export default DeleteProduct;