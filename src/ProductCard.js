import React, { useState } from 'react';
import './App.css';
import { Button, Space, Image } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddProductModal from './AddProductModal';
import DeleteProduct from './DeleteProduct';
import PrintPDFModal from './PrintPDFModal';

function ProductCard(props) {



  const [deleteProduct, setDeleteProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [printPDFmodalShown, setPrintPDFmodalShown] = useState(false);

  const showEditProduct = (value) => {
    setEditProduct(value)

  }
  const showDeleteProduct = (value) => {
    setDeleteProduct(value)

  }


  const showPDF = (value) => {    
    setPrintPDFmodalShown(false);
}
  return (

    
    <Content>
      {printPDFmodalShown ? (<PrintPDFModal id={props.data.id} setPrintPDFmodalShown={setPrintPDFmodalShown}  showPDF={showPDF} data={props.data}></PrintPDFModal>) : null}
           

      <div className="primary-frame product-card-frame">
        <div className='image-wrap'>
          <Image className='product-image' alt='Product' src={`${props.data.image_public_url}?${props.data.updated_at}`}></Image>
        </div>

        <div className='text-wrap'>
          <h1>{props.data.title}</h1>
          <h3>{props.data.short_note}</h3>
          <h2><span className='price'>Price: &nbsp;</span>₹ {props.data.price} + {props.data.vat_percentage}% <span className='vat'>VAT</span></h2>
          <h4><u>Product Description:</u></h4>
          <p>{props.data.description}</p>
        </div>
        <Space direction='vertical' align='center' size='large'>
          
          <Button className='button-yellow' onClick={function () {
                    setPrintPDFmodalShown(true);
                }}>Print PDF</Button>
          <Button className='edit-button' onClick={() => setEditProduct(true)}><EditOutlined />Edit</Button>
          {editProduct ? (<AddProductModal function='edit' id={props.data.id} showAddProduct={showEditProduct} data={props.data}></AddProductModal>) : null}
          <Button className='button-warning' onClick={() => setDeleteProduct(true)}  ><DeleteOutlined />Delete</Button>
          {deleteProduct ? (<DeleteProduct id={props.data.id} showDeleteProduct={showDeleteProduct} />) : ""}
        </Space>

      </div>
    </Content>

  );
}

export default ProductCard;
