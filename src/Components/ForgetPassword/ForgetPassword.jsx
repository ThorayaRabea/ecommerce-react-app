import React from 'react'

export default function ForgetPassword() {
  return (
    <>
<div className='flex justify-start px-10 pt-16'>

  <div className='w-full'>
    <h1 className='text-3xl font-medium mb-3 text-start '>please enter your verification code</h1> 

    
<form className=" flex flex-col "> 
  <input type="email" id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2.5 focus:bg-white focus:ring-2 focus:ring-offset-0 focus:outline-none " placeholder="Email"/>

  <button type="button" className="focus:outline-none text-green-500 bg-white hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-3 border border-green-500 mt-4 self-start transition duration-500">Verify</button>

</form>



   </div>

</div>

    </>
  )
}
