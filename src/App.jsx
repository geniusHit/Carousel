import React, { useEffect, useRef, useState } from 'react'
import './bootstrap.css'
import './bootstrap.js'
import img1 from '../public/aerial_view_of_ocean_hd_beach.jpg'
import img2 from '../public/black_panther_logo_in_black_background_4k_hd_black.jpg'
import img3 from '../public/blue_aston_martin_amr23_2023_car_4k_hd_cars.jpg'
import img4 from '../public/closeup_view_yellow_green_blue_orange_small_beak_parrot_bird_tree_branch_blur_trunk_background_4k_hd_birds.jpg'
import img5 from '../public/four_white_swans_floating_water_reflection_buildings_houses_nature_background_hd_swan.jpg'
import img6 from '../public/group_of_adelie_penguins_snow_mountain_sky_background_4k_hd_penguin.jpg'

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const App = () => {
  const [images, setImages]=useState([img1, img2, img3, img4, img5, img6]);
  const [marginLeft, setMarginLeft]=useState(0);
  const [imgNum, setImgNum]=useState(0);
  const rightBtn=useRef()
  const [imgW, setImgW]=useState()

  const left=()=>{                // To scroll the carousel left.
    let imgs=document.querySelectorAll("img")[0];
    let imgWidth = window.getComputedStyle(imgs).width;
    imgWidth=imgWidth.slice(0, -2);
    imgWidth=parseFloat(imgWidth)
    setImgW(imgWidth)
    if(imgNum>0 && imgNum<images.length)
    {
      setMarginLeft((prev)=>prev+imgWidth);
      setImgNum((prev)=>prev-1)
    }
    else if(imgNum==0)
    {
      setMarginLeft((prev)=>-imgWidth*(images.length-1));
      setImgNum((prev)=>5)
    }
  }

  const right=()=>{             // To scroll the carousel right.
    let imgs=document.querySelectorAll("img")[0];
    let imgWidth = window.getComputedStyle(imgs).width;
    imgWidth=imgWidth.slice(0, -2);
    imgWidth=parseFloat(imgWidth)
    setImgW(imgWidth)
    if(imgNum>=0 && imgNum<images.length-1)
    {
      setMarginLeft((prev)=>prev-imgWidth);
      setImgNum((prev)=>prev+1)
    }
    else if(imgNum==images.length-1)
    {
      setMarginLeft((prev)=>0);
      setImgNum((prev)=>0)
    }
  }

  window.onload = ()=>{
    let imgs=document.querySelectorAll("img")[0];       // correctly when window is resized.
    let imgWidth = window.getComputedStyle(imgs).width;
    imgWidth=imgWidth.slice(0, -2);
    imgWidth=parseFloat(imgWidth)
    setImgW(imgWidth)
  }

  window.addEventListener("resize", ()=>{               // To set the position of image 
    let imgs=document.querySelectorAll("img")[0];       // correctly when window is resized.
    let imgWidth = window.getComputedStyle(imgs).width;
    imgWidth=imgWidth.slice(0, -2);
    imgWidth=parseFloat(imgWidth)
    setImgW(imgWidth)

    if(imgNum==0)
    {
      setMarginLeft(0)
    }
    else{
      //marginLeft=-(imgWidth*imgNum);
      setMarginLeft((prev)=>(-imgWidth*imgNum))
    }
  })

  useEffect(()=>{       // When marginLeft state changes then the image changes.
    let imgs=document.querySelectorAll("img")[0];
    imgs.style="transition:0.5s; margin-left:"+marginLeft+"px;";

    const interval = setInterval(()=>{
      rightBtn.current.click();
    }, 3000)

    let dots = document.querySelectorAll(".dots span");
    dots[0].style.backgroundColor="blue";

    for(let a=0; a<dots.length; a++)
    {
      if(a==imgNum)
      {
        dots[a].style.backgroundColor="black";
      }
      else{
        dots[a].style.backgroundColor="white";
      }
    }

    return ()=> clearInterval(interval);
  }, [marginLeft])

  return (
    <div>
      <h3 className='text-center'>Carousel</h3>

      <div className='w-75 mx-auto my-4 d-flex justify-content-between bg-light rounded-2' style={{height:"40vw"}}> {/* Carousel container */}
        <div className='d-flex align-items-center' style={{}}>  {/* Left button */}
          <button className='border-0' onClick={()=>{left()}}><FaAngleLeft className='fs-1 d-inline-block' style={{}} /></button>
        </div>

        <div className='d-flex overflow-hidden' style={{height:"40vw", width:"100%", position:"relative"}}>
          {
            images.map((image, index)=>{    // Displaying images.
              return (
                <img key={index} src={image} className='w-100 img' style={{height:"40vw"}}></img>
              )
            })
          }

          <div className='d-flex py-3 justify-content-center dots' style={{gap:"14px", position:"absolute", zIndex:"3", width:imgW, bottom:"0"}}>
            <span className='rounded-5 ' style={{width:"10px", height:"10px"}}></span>
            <span className='rounded-5 ' style={{width:"10px", height:"10px"}}></span>
            <span className='rounded-5 ' style={{width:"10px", height:"10px"}}></span>
            <span className='rounded-5 ' style={{width:"10px", height:"10px"}}></span>
            <span className='rounded-5 ' style={{width:"10px", height:"10px"}}></span>
            <span className='rounded-5 ' style={{width:"10px", height:"10px"}}></span>
          </div>
        </div>

        {/* Right button */}
        <div className='d-flex align-items-center' style={{}}> <button className='border-0' onClick={()=>right()} ref={rightBtn}><FaAngleRight className='float-end fs-1 d-inline-block' style={{}}/></button> </div>
      </div>
    </div>
  )
}

export default App