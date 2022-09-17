import React, { useState } from 'react';
import './App.css';
import { Button, Space, Image  } from 'antd';
import {Content } from 'antd/lib/layout/layout';
import {EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';



function ProductCard(props) {
  


  const [deleteProduct, setDeleteProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  

  const showEditProduct = (value) => {
    setEditProduct(value)

  }
  const showDeleteProduct = (value) => {
    setDeleteProduct(value)

  }



  return (
    <Content>
      <div className="primary-frame product-card-frame">
      <div className='image-wrap'>
        <Image className='product-image' alt='Product'  src={`${props.data.image_public_url}?${props.data.updated_at}`}></Image>
      </div>
      
      <div className='text-wrap'>
        <h1>{props.data.title}</h1>
        <h3>{props.data.short_notes}</h3>
        <h2><span className='price'>Price: &nbsp;  </span>₹ {props.data.price}</h2>
        <h4><u>Product Description:</u></h4>
        <p>{props.data.description}</p>
      </div>
      <Space direction='vertical' align='center' size='large'>
        <Button className='edit-button' onClick={() => setEditProduct(true)}><EditOutlined />Edit</Button>
        {editProduct ? (<AddProduct function='edit' id={props.data.id} showAddProduct={showEditProduct} data={props.data}></AddProduct>) : null}
        <Button className='dlt-button' onClick={() => setDeleteProduct(true)}  ><DeleteOutlined />Delete</Button>
        {deleteProduct ? (<DeleteProduct id={props.data.id} showDeleteProduct={showDeleteProduct} />) : ""}
      </Space>

    </div>
    </Content>
    
  );
}

export default ProductCard;
