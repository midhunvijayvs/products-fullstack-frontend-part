import React from 'react';
import { useState,useEffect } from 'react';
import { Header, Content } from 'antd/lib/layout/layout';
import { Button, Layout, Space } from 'antd';
import { Input } from 'antd';
import './App.css';
import axios from "axios";
import AddProduct from './AddProduct';
import ListViewProduct from './ListViewProduct';
import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'
import {FileAddOutlined} from '@ant-design/icons';


const baseURL = "http://127.0.0.1:8000/api";





const { Search } = Input;



function App(props) {

  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()

  const [addProduct, setAddProduct] = useState(false);

  
  


  const showAddProduct = (value) => {
    setAddProduct(value)

  }


 



 useEffect(() => {
    fetchProducts();
  },[]);




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


  const fetchSearchResult=(query)=>{
    console.log('fetchSearchResults Called!!')
   
    axios.get(`${baseURL}/search/${query}`).then((response) => {
      var res = { data: response.data }
      console.log('res:',res)
      dispatch(setProductsGlobal(res))
      console.log('productsGlobal',productsGlobal)

      // props.setTheProducts({ products })
      // console.log('from App', props.mystates.products)

    });
   
  }


  const onSearch = (value) => {
    console.log(value);
    fetchSearchResult(value)
  }


const empty={
  'title':'',
  'description':'',
  'short_notes':'',
  'price':'',
  'image_public_url':'',
  'image_name':'',
}




  return (
    <div className="App">
      <Layout>
        <Header>
          <Space>
          <h3>Products  :</h3> <h4 className='dash-board'> DashBoard</h4>
          
          </Space>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
          

        </Header>
        <Content>
          
          <Button className='add-product-button' onClick={() => showAddProduct(true)} ><FileAddOutlined />Add a New Product</Button>

          {addProduct ? (<AddProduct function='add' showAddProduct={showAddProduct} data={empty}></AddProduct>) : null}


          {/* <Button className='list-button' onClick={() => setShowProducts(true)}>Show Products</Button> */}

          {productsGlobal.products.data &&

productsGlobal.products.data.map((item, key) => {
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
