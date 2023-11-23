'use client'  //why use client is used?

import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { message } from 'antd';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "passswords must match"),
  phoneNumber: Yup.string()
    .required("required")
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, "too short")
    .max(10, "too long"),

});

const Register = () => {

  const [messageApi, contextHolder] = message.useMessage();
  //?? relationship betn messageApi, contextHolder

  const handleRegister = async (values) => {
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
      mode: 'no-cors'
    })

    const data = await res.json()

    messageApi.open({
      type: res.status == 200 ? 'success' : 'error',
      content: data.msg,
    });

    console.log(res)

  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          phoneNumber: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          handleRegister(values)
        }}
      >
        {({ errors, touched }) => (
          <Form>

            {contextHolder}

            <Field name="fullName" type="text" placeholder="Full Name" />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}
            <br />
            <Field name="email" type="email" placeholder="Email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <br />
            <Field name="password" type="password" placeholder="Password" />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            <br />
            <Field name="confirmPassword" type="password" placeholder="Confirm Password" />
            {errors.confirmPassword && touched.confirmPassword ? <div>{errors.confirmPassword}</div> : null}
            <br />
            <Field name="phoneNumber" type="tel" placeholder="Enter phone number" />
            {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}
            <br />


            <button type="submit">SignUp</button>
            <br />

            Already have an account? <Link href="/login">Sign In</Link> instead

          </Form>
        )}
      </Formik>
    </div>
  )

}

export default Register;