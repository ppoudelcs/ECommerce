import React from 'react'
import { Card } from 'antd'
import Link from 'next/link'
const { Meta } = Card;

function page(props) {

  const imgSource = `https://source.unsplash.com/900x1600/?${props.item.productName}`

  return (
    <Link href={`/products/${props.item._id}`}>
        <Card
    hoverable
    style={{
      width: 240,
      margin:'10px'
    }}
    cover={<img alt="example" src={imgSource} />}
>
   <Link href={'/products'}>
    
    <Meta title={props.item.productName+'('+props.item.productType+')'} description={'NPR '+props.item.productPrice} />
   </Link>
    
  </Card>
    </Link>
    
  )
}

export default page