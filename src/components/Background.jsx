import { useState } from 'react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router'

const Background = () => {
  const [background, setBackground] = useState(true)
  return (
    <div className='w-full h-svh bg-black bg-[url("/bg-mobile.png")] bg-cover bg-no-repeat bg-center md:bg-[url("/bg-desktop.png")] '>
      <motion.div
        style={{ display: background ? 'flex' : 'none' }}
        initial={{
          translateX: "0%",
          translateY: "-250%",
          rotate: 16
        }}
        animate={{
          translateX: ["-30%", "0%", "30%"],
          translateY: ["-23%", "5%", "-23%"],
          rotate: [16, 0, -16]
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1.9,
          ease: [0.42, 0, 0.58, 1]
        }}
        className='fixed w-[1200px] z-10'>
        <img src='/pinata.png' alt='pinata' className='w-[500px]' />
      </motion.div>
      <Outlet
        context={{
          background,
          setBackground
        }}
      />
    </div>
  )
}

export default Background