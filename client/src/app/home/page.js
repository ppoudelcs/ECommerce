'use client'
///////////////////
import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { Breadcrumb, Layout, Menu, theme, Input, Popover, Avatar } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Card from '../../components/Card/page'
import { Pagination } from 'antd';

import Link from 'next/link';


const { Search } = Input;
const { Header, Content, Footer } = Layout;
const App = () => {
  const {userDetails} = useSelector(state=>state.user)

  const [productList, setProductList] = useState([])
  const [searchList, setSearchList] = useState([])
  const fetchProducts = async(page=1)=> {
    const res = await fetch(`http://localhost:4000/products?page=${page}`)
    const data = await res.json()
    setProductList(data.productList)
  }


  useEffect(()=>{
  fetchProducts()
  },[])

  const userEmail = <span>{userDetails.email}</span>
  const content = (
    <div>
        <Link href="/profile"><span>Profile</span></Link>
        <p>Logout</p>
    </div>
  )


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
          
        {/* <Image
      src="/hulakilogo.png"
      width={60}
      height={60}
      alt="Logo"
    /> */}

      <div>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}


        >
        <Link href="/" >
            <Menu.Item key="alipay">
            Logo here
            </Menu.Item>

          </Link>

          <Link href="/login" >
            <Menu.Item key="alipay">
            Login
            </Menu.Item>

          </Link>
          <Link href="/register" >
            <Menu.Item key="alipay">
            Register
            </Menu.Item>

          </Link>

          <div
        style={{
          marginInlineStart: 80,
          clear: 'both',
          whiteSpace: 'nowrap',
        }}
      >

        <Popover placement="bottomRight" title={userEmail} content={content}>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        </Popover>
      </div>
            </Menu>
      </div>
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