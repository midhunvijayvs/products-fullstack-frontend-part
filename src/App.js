import React from 'react';
import './App.css';
import { useState } from 'react';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import axios from "axios";
import AddProduct from './AddProduct';
import ListViewProduct from './ListViewProduct';
import { connect } from "react-redux";
import { setProducts } from './redux/productsSlice';



const baseURL = "http://127.0.0.1:8000";





const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);


function App(props) {

  const [addProduct, setAddProduct] = useState(false);
  const [products, setProducts] = React.useState();
  const [showProducts, setShowProducts] = React.useState(false);


  const showAddProduct = (value) => {
    setAddProduct(value)

  }



  props.setTheProducts(products);

  React.useEffect(() => {
    fetchProducts();

  }, []);






  const fetchProducts =  () => {
    axios.get(`${baseURL}/list`).then((response) => {
      setProducts(response.data);
      // props.setTheProducts({ products })
      // console.log('from App', props.mystates.products)

    });
  }










  return (
    <div className="App">
      <Layout>
        <Header>

          Products
          <Search
            placeholder="input search text"

            style={{
              width: 200,
            }}
          />
          Register

        </Header>
        <Content>
          {/* <Button onClick={listProducts()}>View Products</Button> */}
          <Button className='list-button' onClick={() => showAddProduct(true)}>Add Product</Button>

          {addProduct ? (<AddProduct function='add' showAddProduct={showAddProduct}></AddProduct>) : null}


          <Button className='list-button' onClick={() => setShowProducts(true)}>Show Products</Button>

          {products &&

            products.map((item, key) => {
              return (
                <div key={key}>
                  <ListViewProduct key={key} data={item} ></ListViewProduct>
                </div>)
            })}


        </Content>
      </Layout>

    </div>
  );
}

export default App;
