'use client'

import React, {useState, useEffect} from 'react'

function page({params}) {
    const [productPage, setProductPage] = useState({}) //the productPage will be single object
    const fetchProducts = async()=> {
      const res = await fetch(`http://localhost:4000/products/${params.id}`)
      
      
      const data = await res.json()
      
      
      setProductPage(data.productList)
      
      
    }

    
  
  
    useEffect(()=>{
    
    fetchProducts()
    },[])

    return(
        
        <section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={`http://localhost:4000/products-image?userId=${params.id}`}/>
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">{productPage.productType}</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{productPage.productName}</h1>
        
            <span class="text-gray-600 ml-3">4 Reviews</span>
      
        <p class="leading-relaxed">{productPage.productDescription}</p>
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div class="flex">
            <span class="mr-3">Color</span>
            <button class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
            <button class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
            <button class="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
          </div>
          <div class="flex ml-6 items-center">
            <span class="mr-3">Size</span>
            <div class="relative">
              <select class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
              
            </div>
          </div>
        </div>
        <div class="flex">
          <span class="title-font font-medium text-2xl text-gray-900">NPR{productPage.productPrice}</span>
          <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
          <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add to Cart</button>
          
        </div>
      </div>
    </div>
  </div>
</section>
    )
}

export default page