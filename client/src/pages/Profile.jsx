// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col' >
        <img src={currentUser.user.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover
        
        cursor-pointer self-center mt-2'/>
        <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg m-3 outline-none'/>
        <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg m-3 outline-none'/>
        <input type='password' placeholder='password' id="password" className='border p-3 rounded-lg m-3 outline-none'/>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">update </button>
                       
      </form>
       <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete account</span>
          <span className='text-red-700 cursor-pointer'>Sign  out</span>
       </div>
    </div>
  )
}

export default Home