import React from 'react'
import './LogoutBtn.scss'

export default function LogoutBtn(props) {
  return (
    <div className='logoutBtn' onClick={() => props.setLoginToken(null)}>
      Logout
    </div>
  )
}
