import React from 'react'
import './AnimatedTileList.scss'

export default function AnimatedTileList({imgList}) {

  let tileList = [];
  imgList.forEach(imgSrc => {
    tileList.push(
      <div className='tile'>
        <img src={imgSrc}/>
      </div>
    );
  });
  return (
    <div className='animatedTileList'
      style={{
        gridTemplateColumns: `repeat(${tileList.length}, 1fr)`
      }}
    >
      {tileList}
    </div>
  )
}
