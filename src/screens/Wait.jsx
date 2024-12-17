import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router'

const Wait = () => {
    const navigate = useNavigate()
    const { setBackground } = useOutletContext()

    useEffect(() => {
        setBackground(false)
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) navigate('/')
    }, []);

    const handleNavigate = () => {
        localStorage.removeItem('user');
        navigate('/');
    }
    return (
        <div className='container mx-auto px-4 relative h-svh w-full flex flex-col justify-center items-center z-20'>
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-amber-400/45 to-transparent z-10' />
            <div className='flex flex-col justify-center items-center w-full h-full z-20 max-w-md'>
                <motion.img
                    animate={{
                        scale: [0, 1],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: 'circInOut',
                        delay: 1.0
                    }}
                    src='/wait.png' alt='logo' className='h-auto w-full max-w-sm' />
                <motion.p
                    animate={{
                        scale: [0, 1],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: 'circInOut',
                        delay: 1.4
                    }}
                    className='text-white text-center text-xl w-full '
                >Los resultados se mostrarán en la <span className='font-bold'>pantalla principal</span>. Mantente atento cuando se anuncien a <span className='font-bold'>los ganadores.</span></motion.p>
                <motion.p
                    className='text-white text-xl text-center w-full my-4 font-bold'
                    animate={{
                        scale: [0, 1],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: 'circInOut',
                        delay: 1.8
                    }}
                >¡Mucha suerte!</motion.p>
                <motion.div
                    animate={{
                        scale: [0, 1],
                    }}
                    transition={{
                        duration: 0.5,
                        ease: 'circInOut',
                        delay: 2.0
                    }}
                >
                    <motion.button
                        onClick={() => handleNavigate()}
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1.8,
                            ease: 'easeInOut'
                        }}
                        className='w-full h-auto' type='submit'
                    >
                        <img src='/finish.png' alt='arrow' className='w-full inline-block' />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    )
}

export default Wait