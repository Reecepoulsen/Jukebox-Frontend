import './Loading.scss'
import {ImSpinner8} from 'react-icons/im'

export default function Loading() {
  return (
    <div className='loading'>
      <div className="text">
        <h2>Loading</h2>
        {/* <ImSpinner8 size={30} className="spinner" /> */}
        <div class="logo-container">
          <div class="circle c1"></div>
          <div class="circle c2"></div>
          <div class="circle c3"></div>
          <div class="circle c4"></div>
          <div class="circle c5"></div>
          <div class="circle c6"></div>
          <div class="circle c7"></div>
          <div class="circle c8"></div>
        </div>
      </div>
    </div>
  )
}
