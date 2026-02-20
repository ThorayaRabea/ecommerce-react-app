import style from './Categories.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useState } from 'react'
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import useCategories from '../../Hooks/useCategories';

export default function Categories() {
  const [subCategories, setSubCategories] = useState(null);
  const [nameOfCategory, setNameOfCategory] = useState('');
  const [isSubLoading, setIsSubLoading] = useState(false); 

  let { data, isLoading } = useCategories();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  async function getSubCategories(name, id) {
    setNameOfCategory(name);
    setSubCategories(null); 
    setIsSubLoading(true);

    try {
      
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      setSubCategories(res.data.data);
      setIsSubLoading(false);

      
      setTimeout(() => {
        window.scrollTo({ 
          top: document.body.scrollHeight, 
          behavior: 'smooth' 
        });
      }, 300);

    } catch (error) {
      console.log("Error fetching subcategories:", error);
      setIsSubLoading(false);
    }
  }

  return (
    <>
   
      <div className='flex flex-wrap py-10'>
        {data.map((category) => (
          <div key={category._id} className='w-full md:w-1/2 lg:w-1/4 mb-8 px-3'>
            <div className='product text-start hover:shadow-lg hover:shadow-green-300 rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 cursor-pointer'>
              <button className='w-full' onClick={() => getSubCategories(category.name, category._id)}>
                <img src={category.image} className='w-full object-cover h-[350px]' alt={category.name} />
                <h2 className='text-green-600 text-center text-2xl font-bold py-4 bg-white'>{category.name}</h2>
              </button>
            </div>
          </div>
        ))}
      </div>

     
      {isSubLoading && (
        <div className="py-10 flex justify-center">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-green-500"></i>
        </div>
      )}

      
      <div className='transition-all duration-500 ease-in-out pb-20'>
        {subCategories?.length > 0 ? (
          <div className='p-5 bg-gray-50 rounded-xl border-t-4 border-green-500 shadow-inner'>
            <h2 className='text-green-600 text-center text-3xl font-extrabold mb-8 uppercase'>
              {nameOfCategory} Subcategories
            </h2>
            <div className='flex flex-wrap justify-center gap-4'>
              {subCategories.map((sub) => (
                <div key={sub._id} className='w-full md:w-[30%] bg-white p-6 rounded-lg border border-gray-200 text-center hover:scale-105 hover:border-green-400 hover:shadow-md transition-all duration-300'>
                  <span className='text-xl font-semibold text-gray-700'>{sub.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

       
        {subCategories && subCategories.length === 0 && !isSubLoading && (
          <div className='p-10 text-center bg-gray-100 rounded-lg border border-dashed border-gray-400 mx-3'>
            <p className='text-gray-600 text-lg font-medium italic'>
              No specific subcategories found for <span className='text-green-600 font-bold'>{nameOfCategory}</span>.
            </p>
          </div>
        )}
      </div>
    </>
  );
}