import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { validateLogin } from '../utils'
import { useOutletContext } from 'react-router'

const Home = () => {
  const formRef = useRef(null)
  const navigate = useNavigate()
  const { setBackground } = useOutletContext()

  useEffect(() => {
    setBackground(true)
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) navigate('/activity')

    return () => {
      document.activeElement.blur();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current)
    const user = {
      name: formData.get('name'),
      lastname: formData.get('lastname'),
      email: formData.get('email')
    }
    try {
      await validateLogin(user);
      localStorage.setItem('user', JSON.stringify(user));
      // navigate('/activity');
      window.location.reload();
    } catch (error) {
      console.error(error)
      toast.error(`${error.message}`)
    }
  }

  return (
    <div className='container mx-auto px-4 relative h-svh w-full flex flex-col justify-center items-center z-20'>
      <div className='flex flex-col justify-end items-center w-full h-full z-20'>
        <motion.img
          animate={{
            scale: [0, 1],
          }}
          transition={{
            duration: 0.5,
            ease: 'circInOut',
            delay: 1.0
          }}
          src='/welcome-1.png' alt='logo' className='h-auto w-full max-w-md' />
        <motion.img
          animate={{
            scale: [0, 1],
          }}
          transition={{
            duration: 0.5,
            ease: 'circInOut',
            delay: 1.4
          }}
          src='/welcome-2.png' alt='logo' className='h-auto w-full max-w-md -mt-10' />
        <div className='flex flex-col w-full max-w-md my-2 z-40'>
          <motion.form
            animate={{
              scale: [0, 1],
            }}
            transition={{
              duration: 0.5,
              ease: 'circInOut',
              delay: 1.8
            }}
            ref={formRef}
            onSubmit={handleSubmit}
            className='flex flex-col w-full'
          >
            <p className='text-white text-lg font-semibold'>Registra tus datos para participar por alguno de los premios que <span className='font-black'>BTC</span> tiene para ti.</p>
            <input name='name' type='text' placeholder='Nombre' className='w-full h-12 bg-white text-black text-lg mt-4 px-4 border-3 border-yellow-400' />
            <input name='lastname' type='text' placeholder='Apellidos' className='w-full h-12 bg-white text-black text-lg mt-4 px-4 border-3 border-yellow-400' />
            <input name='email' type='email' placeholder='Correo Electrónico' className='w-full h-12 bg-white text-black text-lg mt-4 px-4 border-3 border-yellow-400' />
            <motion.button
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.8,
                ease: 'easeInOut'
              }}
              className='w-full h-auto' type='submit'>
              <img src='/start.png' alt='arrow' className='w-full inline-block' />
            </motion.button>
          </motion.form>
        </div>
      </div>
      <div
        className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-yellow-400/60 via-transparent to-transparent z-10' />
    </div>
  )
}

export default Home