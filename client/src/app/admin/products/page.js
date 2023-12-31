'use client'  //why use client is used?

import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { message } from 'antd';



const ProductSchema = Yup.object().shape({
  productName: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    productType: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    productPrice: Yup.number()
    .min(1, 'Too Short!')
    .max(5000000, 'Too Long!')
    .required('Required'),
    productDescription: Yup.string()
    .min(10, 'Too Short!')
    .max(100000, 'Too Long!')
    .required('Required'),
    
    

});

const Product = () => {

  const [messageApi, contextHolder] = message.useMessage();
  //?? relationship betn messageApi, contextHolder
  const [productImg, setProductImg] = useState(null)

  const productRegister = async (values) => {

    var formData = new FormData()
    formData.append('productImage', productImg)

    Object.entries(values).map((item,id)=>{
      formData.append(item[0], item[1])
    })

    const res = await fetch('http://localhost:4000/products', {
      method: 'POST',
     body: formData
    })

    const data = await res.json()

    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });

    console.log(res)

  }

  const saveImg = (e) => {
    setProductImg(e.target.files[0])
    // setProductImg(e.target.files[0])
  }

  return (
    <div>
      <h1>Products</h1>
      <Formik
        initialValues={{
          productName: '',
          productType: '',
          productPrice: '',
          productDescription: '',
          
          
        }}
        validationSchema={ProductSchema}
        onSubmit={values => {
          // same shape as initial values
          productRegister(values)
        }}
      >
        {({ errors, touched }) => (
          <Form>

            {contextHolder}

            <Field name="productName" type="text" placeholder="Product Name" />
            {errors.productName && touched.productName ? (
              <div>{errors.productName}</div>
            ) : null}
            <br />
            
            <Field name="productType" type="text" placeholder="Product Type" />
            {errors.productType && touched.productType ? (
              <div>{errors.productType}</div>
            ) : null}
            <br />
            <Field name="productPrice" type="text" placeholder="Price in NPR" />
            {errors.productPrice && touched.productPrice ? (
              <div>{errors.productPrice}</div>
            ) : null}
            <br/>
            <Field name="productDescription" as="textarea" placeholder="Describe the product" />
            {errors.productDescription && touched.productDescription ? (
              <div>{errors.productDescription}</div>
            ) : null}
            <br/>
            <input type="file" onChange={saveImg}/>
            <br/>
            <button type="submit">Register</button> 
            <br/>


            

          </Form>
        )}
      </Formik>
    </div>
  )

}

export default Product;