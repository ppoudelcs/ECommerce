'use client'
import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import { Breadcrumb, Layout, Menu, theme, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Card from '../components/Card/page'

const { Search } = Input;
const { Header, Content, Footer } = Layout;
const App = () => {

  const [productList, setProductList] = useState([])
  const fetchProducts = async()=> {
    const res = await fetch('http://localhost:4000/products')
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
  const onSearch = (value, _e, info) => console.log(info?.source, value);
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
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default App;