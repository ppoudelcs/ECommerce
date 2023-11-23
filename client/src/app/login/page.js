'use client'  //why use client is used?

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import { Alert } from 'antd';
import { message } from 'antd';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignupSchema = Yup.object().shape({
  
  // email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string()
  .required("required")
  .matches(phoneRegExp, 'Phone number is not valid')
  .min(10, "too short")
  .max(10, "too long"),
  password: Yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
 

});

const Home = () => {

  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async(values)=>{
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(values),
      mode:'no-cors'
    })

    const data = await res.json()

    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });

    console.log(res)

  }
  return(
  <div>
    <Image
    src="/ktmEats.png"
    width={100}
    height={100}
    alt="Logo"
    />
    {contextHolder}

    
    <h1>Sign In</h1>
    <Formik
      initialValues={{
        phoneNumber: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        handleLogin(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {/* <Field name="email" type="email" placeholder="Email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          
          <br/> */}
          <Field name="phoneNumber" type="tel" placeholder="Enter phone number"/>
          {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
          <br/>
          <Field name="password" type="password" placeholder="Password"/>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <br/>
          <button type="submit">SignIn</button> 
          <br/>
          <p>Don't have an account? <Link href="/register"> Sign Up </Link> now</p>         
        </Form>
      )}
    </Formik>
  </div>
);
}

export default Home;