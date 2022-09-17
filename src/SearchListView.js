import React, { Fragment, useState } from 'react';
import './App.css';
import { Button, Space,Layout ,Form,Input, Select  } from 'antd';
import {Content } from 'antd/lib/layout/layout';
import {EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteProduct from './DeleteProduct';
import { useSelector, useDispatch } from 'react-redux';
import { setProductsGlobal, clearProducts } from './redux/productsSlice'
import Sider from 'antd/lib/layout/Sider';
import ProductCard from './ProductCard';
import Scroll from './Scroll';
import {post} from './axiosConfig';





function SearchListView(props) {
  
  const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()

  const fetchPriceSearchResult=(values)=>{
    console.log('searchQuery in props of SearchListView :', props.searchQuery);
    console.log('fetchPriceSearchResults Called!!')

    const form_data = new FormData();
    
      form_data.append('priceFrom', values.priceFrom);
      form_data.append('priceTo', values.priceTo);
      form_data.append('searchQuery', props.searchQuery);
      
 
    post('/search-price-filter', form_data).then((response) => {
      var res = { data: response.data.data}
      dispatch(setProductsGlobal(res))
      

    });
  }

  const onFinish = (values) => {
    fetchPriceSearchResult(values);
   }




  const fetchSortResult=(value)=>{
    console.log('fetchSortResults Called!!')

    const form_data = new FormData();
    
      form_data.append('sortKey', value);
      form_data.append('searchQuery', props.searchQuery);

    post('/search-sort', form_data).then((response) => {
      var res = { data: response.data.data}
      dispatch(setProductsGlobal(res))
    })
  };


  const handleChange = (value) => {
    console.log(`selected ${value}`);
    fetchSortResult(value);
  };


  


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  const { Option } = Select;
    return(
        <div className='search-content-wraper'>
          <Space>
            <label>Sort: </label>
            <Select
              defaultValue="Select"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              >
              <Option value="PriceAscending">Price Low-Hight</Option>
              <Option value="PriceDescending">Price Hight-Low</Option>
                             
              <Option value="option3" disabled>Disabled</Option>
              
            </Select>
          </Space>
          
          <Space align='start'>
            <Sider width={300} className='sider'>
              <h3 align='start'>Filter Search</h3>
              <Form Layout='vertical' name='PriceFilterForm' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <Space align='start'>


                  <Form.Item
                  name="priceFrom"
                  label="Price"
                  rules={[
                    {
                      required: true,
                      message:'required'
                      
                    },
                  ]}
                    >
                      <Input placeholder= 'Min'/>
                    </Form.Item>



                  <Form.Item
                    name="priceTo"
                    rules={[
                      {
                        required: true,
                        message:'required'
                      },
                    ]}
                  >
                    <Input placeholder= 'Max'/>
                  </Form.Item>

                  <Form.Item
                  >
                    <Button className='button-primary' type="primary" htmlType="submit">
                      Go
                    </Button>
                  </Form.Item>
                </Space>
            

              </Form>
            
            </Sider>
          
          
            <Scroll>
              <Content className='search-result-list, search-result-list' >
              
            
                {productsGlobal.products.data &&

                productsGlobal.products.data.map((item, key) => {
                  return (
                    <div key={key}>
                      <ProductCard key={key} data={item} ></ProductCard>
                    </div>)
                })}
             
              </Content>
            </Scroll>
          </Space>
        
        </div>
        
        
    )    
}

export default SearchListView;
