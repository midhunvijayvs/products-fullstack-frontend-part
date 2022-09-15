import React, { useState } from 'react';
import './App.css';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout, Space } from 'antd';
import axios from "axios";
import AddProduct from './AddProduct';
import DeleteProduct from './DeleteProduct';
import { connect } from "react-redux";
import { setProducts } from './redux/productsSlice';
import { setShowProducts } from './redux/showProductsReducer';



const mapStateToProps = (state) => {
  return {
    mystates: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    setTheProducts: (obj) => dispatch(setProducts(obj)),
    setTheShowProducts: (obj) => dispatch(setShowProducts(obj)),
    
  };
};



function ListViewProduct(props) {


  const [deleteProduct, setDeleteProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);


  const showEditProduct = (value) => {
    setEditProduct(value)

  }
  const showDeleteProduct = (value) => {
    setDeleteProduct(value)

  }



  return (
    <div className="list-view-product">
      <img src={props.data.image}></img>
      <Space direction='vertical'>
        <h2>{props.data.title}</h2>
        <h2>{props.data.short_note}</h2>
        <h2>Rs: {props.data.price}</h2>
        <h2>{props.data.description}</h2>
      </Space>
      <Space direction='vertical' align='center' size='large'>
        <Button className='edit-button' onClick={() => setEditProduct(true)}>Edit</Button>
        {editProduct ? (<AddProduct function='edit' id={props.data.id} showAddProduct={showEditProduct}></AddProduct>) : null}
        <Button className='dlt-button' onClick={() => setDeleteProduct(true)}  >Delete</Button>
        {deleteProduct ? (<DeleteProduct id={props.data.id} showDeleteProduct={showDeleteProduct} />) : ""}
      </Space>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ListViewProduct);
