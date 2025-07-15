import React from 'react'
import "./paymentsuccess.css"
import { Link, useParams } from 'react-router-dom'
const PaymentSuccess = ({user}) => {
    const params=useParams() //sending razorpy id
  return (
    <div className='payment-success'>
        {user && <div className='success-message'>
            <h2>Payment successfull</h2>
            <p>Your course subscription activated</p>
            <p>Reference no:{params.id}</p>
            <Link to={`/${user._id}/dashboard`} className='btn' >Go to dashboard</Link>
        </div>}
    </div>
  )
}

export default PaymentSuccess