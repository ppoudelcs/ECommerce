import React from 'react'
import { Card } from 'antd'
import Link from 'next/link'
const { Meta } = Card;
function page(props) {
  return (
    <Link href={`/products/${props.item._id}`}>
        <Card
    hoverable
    style={{
      width: 240,
      margin:'10px'
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
>
   <Link href={'/products'}>
    <Meta title={props.item.productName} description={props.item.productPrice} />
   </Link>
    
  </Card>
    </Link>
    
  )
}

export default page