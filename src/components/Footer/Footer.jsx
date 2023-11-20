import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
        <>
        <footer className=' w-full flex justify-center align-center gap-40 bg-black text-white p-4'>
      {/* Service Column */}
      <div className='footer-column'>
        <h3 className='text-lg font-bold mb-2'>Support</h3>
        <ul>
          <li className='mb-1 hover:text-gray-300 cursor-pointer'>Account</li>
          <li className='mb-1 hover:text-gray-300 cursor-pointer'>Help</li>
          <li className='mb-1 hover:text-gray-300 cursor-pointer'>Contact us</li>
        </ul>
      </div>

      {/* Contact Details Column */}
      <div >
        <h3 className='text-lg font-bold mb-2'>Contact Details</h3>
        <p className='mb-1 hover:text-gray-300 cursor-pointer'>Email: info@matrixblog.com</p>
        <p className='mb-1 hover:text-gray-300 cursor-pointer'>Phone: (+91) 84444-93333</p>
        {/* Add more contact details as needed */}
      </div>

      {/* Legal/Copyright Info Column */}
      <div >
        <h3 className='text-lg font-bold mb-2'>Legal/Copyright</h3>
        <p className='mb-1'><Link  className=' hover:text-gray-300 cursor-pointer'>Terms of Service</Link></p>
        <p className='mb-1'><Link  className=' hover:text-gray-300 cursor-pointer' >Privacy Policy</Link></p>
        <p className='mb-1'>&copy; 2023 Matrix Blog</p>
      </div>
    </footer>
        </>
  )
}

export default Footer;