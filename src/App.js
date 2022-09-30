import React from 'react';
import { useState, useEffect } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Button, Layout, Space } from 'antd';
import { Input } from 'antd';
import './App.css';
import { get, post } from './axiosConfig';
import AddProductModal from './AddProductModal';
import AddProductsPage from './AddProductsPage';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'
import { FileAddOutlined, HomeOutlined } from '@ant-design/icons';
import MainListPage from './MainListPage';
import SearchListPage from './SearchListPage';


import { Document, Page, Text, View, StyleSheet, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';



const { Search } = Input;



function App(props) {

  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()
  const [addProductShown, setAddProductShown] = useState(false);
  const [pageView, setPageView] = useState('main-list');
  const [searchQuery, setSearchQuery] = useState('initial');




  const showAddProduct = (value) => {
    setAddProductShown(value)

  }






  useEffect(() => {
    fetchProducts();
  }, []);




  const fetchProducts = () => {



    get('/list').then((response) => {
      var res = { data: response.data }
      dispatch(setProductsGlobal(res))
      console.log('productsGlobal', productsGlobal)


    });
  }


  const fetchSearchResult = ($query) => {

    const form_data = new FormData();

    form_data.append('term', $query);

    post('/search', form_data).then((response) => {
      var res = { data: response.data.data }
      console.log('res:', res)
      dispatch(setProductsGlobal(res))
      console.log('productsGlobal', productsGlobal)



    });

  }


  const onSearch = (value) => {
    console.log('search term:', value);
    setSearchQuery(value);
    fetchSearchResult(value);
    setPageView('search');

  }




  const empty = {
    'title': '',
    'description': '',
    'short_notes': '',
    'price': '',
    'image_public_url': '',
    'image_name': '',
  }


  console.log('pageView: ', pageView);



  


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

          {pageView == 'main-list' ? <Button className='button-grey' onClick={() => setPageView('add-products')} ><FileAddOutlined />Add Products</Button> : <Button className='button-grey' onClick={() => setPageView('main-list')} ><HomeOutlined />Home</Button>}


        </Space>

        {addProductShown ? (<AddProductModal function='add' showAddProduct={showAddProduct} data={empty}></AddProductModal>) : null}
        {pageView == 'main-list' && <MainListPage></MainListPage>}
        {pageView == 'search' && <SearchListPage searchQuery={searchQuery}></SearchListPage>}
        {pageView == 'add-products' && <AddProductsPage></AddProductsPage>}

      </Layout>

    </div>
  );
}

export default App;
