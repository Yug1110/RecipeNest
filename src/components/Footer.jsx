import React from 'react'
import Github from "../assets/Github.svg"
import Youtube from "../assets/Youtube.svg"
import Linkedin from "../assets/Linkedin.svg"

function Footer() {
  return (
    <div className='footer-container'>
        <div className='footer-text'>Copyright Since 2024 - By Yugayu Garg</div>
        <div className='footer-icons'>
            <a href="https://github.com/Yug1110" target='_blank'><img src={Github} alt="" /></a>
            <a href="https://www.youtube.com/@maskedcoder-dy1ub"target='_blank'><img src={Youtube} alt="" /></a>
            <a href="https://www.linkedin.com/in/yugayu-garg-47a001225/" target='_blank'><img src={Linkedin} alt="" /></a>
        </div>


    </div>
  )
}

export default Footer