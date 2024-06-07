import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import { useState } from 'react'
import MenuItem from './/MenuItem'
import useRole from '../../../../hooks/useRole'

import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useAuth from '../../../../hooks/useAuth.js'
import { CgProfile } from 'react-icons/cg'
const GuestMenu = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()
  const [role] = useRole()
  
  return (
    <>
        <MenuItem
          icon={CgProfile }
          label='My Profile'
          address='my-profile'
        />
      <MenuItem
        icon={BsFingerprint}
        label='Requested Meals'
        address='requested-meals'
      />
      <MenuItem
        icon={BsFingerprint}
        label='My Reviews'
        address='my-reviews'
      />
      <MenuItem
        icon={BsFingerprint}
        label='Payment History'
        address='payment-history'
      />
    </>
  )
}

export default GuestMenu