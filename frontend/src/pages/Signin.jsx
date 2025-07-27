import React from 'react'
import {Google} from 'lucide-react';
const Signin = () => {
  return (
    <>
     <div className="flex bg-[#0F172A] text-[#FF6B9D]">
        <h2>Sign In</h2>
        <div className="cl">
           <label htmlFor="email" className="c">
             Email Address
           </label>
           <input type='email' id='email' name='email' placeholder='xyz@gmail.com'  required
                    class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
        </div>
        <div className=''>
            <label htmlFor="password">
                Password
            </label>
            <input input='password' id='password' name='password' placeholder='*******'  required
                    class="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                /> 
        </div>
        <div className='l'>
            <button>
            <Google size={24} color="blue" />
            Sign In With Google
            </button>
        </div>
     </div>
    </>
  )
}

export default Signin