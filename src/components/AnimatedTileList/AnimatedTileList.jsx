import React from 'react'
import './AnimatedTileList.scss'

export default function AnimatedTileList({imgList}) {

  let tileList = [];
  let counter = 0;
  imgList.forEach(imgSrc => {
    tileList.push(
      <div key={counter} className='tile'>
        <img src={imgSrc}/>
      </div>
    );
    counter++;
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
