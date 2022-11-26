import React from 'react'
import {FiUser} from "react-icons/fi"
import './ProfilePicPlaceholder.scss'

export default function ProfilePicPlaceholder(props) {
  return (
    <div className='profilePicPlaceholder'>
      <FiUser size={props.size} />
    </div>
  )
}