import React from 'react';
import { useState,useEffect } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Button, Layout, Space } from 'antd';
import { Input } from 'antd';
import './App.css';
import { get, post} from './axiosConfig';
import AddProduct from './AddProduct';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'
import {FileAddOutlined} from '@ant-design/icons';
import MainListView from './MainListView';
import SearchListView from './SearchListView';






const { Search } = Input;



function App(props) {

  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()

  const [addProduct, setAddProduct] = useState(false);
  const [contentView, setContentView] =useState('main-list');
  const[searchQuery, setSearchQuery] =useState('initial');

  
  


  const showAddProduct = (value) => {
    setAddProduct(value)

  }


 



 useEffect(() => {
    fetchProducts();
  },[]);




  const fetchProducts = () => {

    console.log('fetchProducts Called!!')

   get('/list').then((response) => {
      var res = { data: response.data }
      console.log('res:',res)
      dispatch(setProductsGlobal(res))
      console.log('productsGlobal',productsGlobal)


    });
  }


  const fetchSearchResult=($query)=>{
    console.log('fetchSearchResults Called!!')

    const form_data = new FormData();
    
      form_data.append('term', $query);
 
    post('/search', form_data).then((response) => {
      var res = { data: response.data.data}
      console.log('res:',res)
      dispatch(setProductsGlobal(res))
      console.log('productsGlobal',productsGlobal)

      // props.setTheProducts({ products })
      // console.log('from App', props.mystates.products)

    });
   
  }


  const onSearch = (value) => {
    console.log('search term:',value);
    setSearchQuery(value);
    fetchSearchResult(value);
    setContentView('search');
    console.log('searchQuery in:',searchQuery);
  }

  
  console.log('searchQuery out:',searchQuery);

const empty={
  'title':'',
  'description':'',
  'short_notes':'',
  'price':'',
  'image_public_url':'',
  'image_name':'',
}


console.log('contentView: ' ,contentView);

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
        
          <Space className='sub-header'>
          <Button className='button-primary' onClick={() => showAddProduct(true)} ><FileAddOutlined />Add a New Product</Button>

          </Space>
          
          {addProduct ? (<AddProduct function='add' showAddProduct={showAddProduct} data={empty}></AddProduct>) : null}
          
          {contentView=='main-list'&& <MainListView></MainListView> }
          {contentView=='search'&& <SearchListView contentView={contentView} searchQuery={searchQuery}></SearchListView> }

          

          


        
      </Layout>

    </div>
  );
}

export default App;
