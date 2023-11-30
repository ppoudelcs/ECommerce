'use client'
import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Card from '../components/Card/page'
import { Pagination } from 'antd';

const { Search } = Input;
const { Header, Content, Footer } = Layout;
const App = () => {

  const [productList, setProductList] = useState([])
  const [searchList, setSearchList] = useState([])
  const fetchProducts = async(page=1,pageSize=3)=> {
    const res = await fetch(`http://localhost:4000/products?page=${page}`)
    const data = await res.json()
    setProductList(data.productList)
  }


  useEffect(()=>{
  fetchProducts()
  },[])


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
  const onSearch = async(value, _e, info) => {
  const res = await fetch('http://localhost:4000/search-products?name='+value)
  const data = await res.json()
  setSearchList(data.productList)
  };
  return (
    <Layout className="layout">
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor:'#fff',
          border: '1px solid'
        }}
      >
        <div className="demo-logo" />
          
        <Image
      src="/hulakilogo.png"
      width={60}
      height={60}
      alt="Logo"
    />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[{key:1, label:"login"},{key:2, label:"sign up"} ]}
        />
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Search
      placeholder="Search for Products"
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={onSearch}
    />
    {JSON.stringify(searchList)}
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
            display:'flex',
            margin:'10px'
            
          }}
        >


          {productList.length > 0 && productList.map((item,id)=>{
            return (
             <Card item={item}/>
            )
          }) }
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
       <Pagination onChange={(page)=>fetchProducts(page)} defaultCurrent={1} total={500} />
      </Footer>
    </Layout>
  );
};
export default App;