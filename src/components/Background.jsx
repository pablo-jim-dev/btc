import { useState } from 'react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router'

const Background = () => {
  const [background, setBackground] = useState(true)
  const [logo, setLogo] = useState(true)
  return (
    <div className='w-full h-svh bg-black bg-[url("/bg-mobile.png")] bg-cover bg-no-repeat bg-center md:bg-[url("/bg-desktop.png")] '>
      <div className='fixed top-0 left-0 right-0 flex w-full h-36 justify-center items-center px-4 py-2 z-20 bg-gradient-to-b from-black  to-transparent'>
        {logo && <img src='/logo.png' alt='logo' className='h-32 drop-shadow-md shadow-black' />}
      </div>
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
        <img src='/pinata.png' alt='pinata' className='w-[900px]' />
      </motion.div>
      <Outlet
        context={{
          background,
          setBackground,
          logo,
          setLogo
        }}
      />
    </div>
  )
}

export default Background