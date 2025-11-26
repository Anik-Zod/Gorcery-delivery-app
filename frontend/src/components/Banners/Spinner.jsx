import React from "react";
import HeroOrbit from "./HeroOrbit";
import { Vegan } from "lucide-react";
import {motion} from "motion/react"

function Spinner() {
  return (
    <div>
      {/* <div className="size-[390px] hero-ring"></div> */}
      <motion.div 
      initial={{scale:0}} whileInView={{scale:1}} transition={{duration:1.5}}
      className="size-[500px] hero-ring "></motion.div>
      <motion.div 
      initial={{scale:0}} whileInView={{scale:1}} transition={{duration:1.5}}
      className="size-[720px] hero-ring "></motion.div>
      <motion.div 
      initial={{scale:0}} whileInView={{scale:1}} transition={{duration:1.5}}
      className="size-[970px] hero-ring "></motion.div>
      <motion.div 
      initial={{scale:0}} whileInView={{scale:1}} transition={{duration:1.5}}
      className="size-[1300px] hero-ring"></motion.div>
      
    </div>
  );
}

export default Spinner;
