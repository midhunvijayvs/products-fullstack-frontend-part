import React from 'react';
import { useState,useEffect } from 'react';
import { Header } from 'antd/lib/layout/layout';
import { Button, Layout, Space } from 'antd';
import { Input } from 'antd';
import './App.css';
import { get, post} from './axiosConfig';
import AddProductModal from './AddProductModal';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux'
import { setProductsGlobal, clearProducts } from './redux/productsSlice'
import {FileAddOutlined} from '@ant-design/icons';
import {Content } from 'antd/lib/layout/layout';

function MainListPage(props) {
    const productsGlobal = useSelector((state) => state)
  const dispatch = useDispatch()
    return(
        <Content>
            {productsGlobal.products.data &&

            productsGlobal.products.data.map((item, key) => {
              return (
                <div key={key}>
                  <ProductCard key={key} data={item} ></ProductCard>
                </div>)
            })}

        </Content>
    )    
}

export default MainListPage;