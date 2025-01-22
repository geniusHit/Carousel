import React, { useEffect, useState } from 'react'
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

  const left=()=>{
    let imgs=document.querySelectorAll("img")[0];
    let imgWidth = window.getComputedStyle(imgs).width;
    imgWidth=imgWidth.slice(0, -2);
    imgWidth=parseFloat(imgWidth)
    console.log("imgWidth = ", imgWidth)
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

  const right=()=>{
    let imgs=document.querySelectorAll("img")[0];
    let imgWidth = window.getComputedStyle(imgs).width;
    imgWidth=imgWidth.slice(0, -2);
    imgWidth=parseFloat(imgWidth)
    console.log("imgWidth = ", imgWidth)
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

  window.addEventListener("resize", ()=>{
    let imgs=document.querySelectorAll("img")[0];
    let imgWidth = window.getComputedStyle(imgs).width;
    imgWidth=imgWidth.slice(0, -2);
    imgWidth=parseFloat(imgWidth)
    console.log("imgWidth = ", imgWidth)

    if(imgNum==0)
    {
      setMarginLeft(0)
    }
    else{
      //marginLeft=-(imgWidth*imgNum);
      setMarginLeft((prev)=>(-imgWidth*imgNum))
      console.log("marginLeft = ", marginLeft)
    }
  })

  useEffect(()=>{
    let imgs=document.querySelectorAll("img")[0];
    console.log("marginLeft = ", marginLeft)
    console.log("ImgNum = " , imgNum)
    imgs.style="transition:0.5s; margin-left:"+marginLeft+"px;";
  }, [marginLeft])

  return (
    <div>
      <h3 className='text-center'>Carousel</h3>

      <div className='w-75 mx-auto my-4 d-flex justify-content-between bg-light rounded-2' style={{height:"40vw"}}>
        <div className='d-flex align-items-center' style={{}}> 
          <FaAngleLeft className='fs-1 d-inline-block' style={{}} onClick={()=>{left()}}/>
        </div>

        <div className='d-flex overflow-hidden' style={{height:"40vw", width:"100%"}}>
          {
            images.map((image, index)=>{
              return (
                <img key={index} src={image} className='w-100 img' style={{height:"40vw"}}></img>
              )
            })
          }
        </div>

        <div className='d-flex align-items-center' style={{}}> <FaAngleRight onClick={()=>right()} className='float-end fs-1 d-inline-block' style={{}}/> </div>
      </div>
    </div>
  )
}

export default App