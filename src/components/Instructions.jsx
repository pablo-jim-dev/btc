import { motion } from 'framer-motion'

const Instructions = ({
    grantPermissions
}) => {
    return (
        <div className='flex flex-col justify-end items-center w-full max-w-md h-auto my-8'>
            <motion.img
                animate={{
                    scale: [0, 1],
                }}
                transition={{
                    duration: 0.5,
                    ease: 'circInOut',
                    delay: 0.7
                }}
                src='/instructions.png'
                alt='logo'
                className='h-auto w-full' />
            <motion.p
                animate={{
                    scale: [0, 1],
                }}
                transition={{
                    duration: 0.5,
                    ease: 'circInOut',
                    delay: 1.4
                }}
                className='text-white text-lg w-full font-semibold'
            >
                ¡Ahora deberás romper la piñata! para ello, <span className='font-black text-xl'>agita tu celular para acumular la mayor cantidad de puntos posibles</span> y romper la piñata.
            </motion.p>
            <motion.div
                animate={{
                    scale: [0, 1],
                }}
                transition={{
                    duration: 0.5,
                    ease: 'circInOut',
                    delay: 1.7
                }}
                className='flex flex-col justify-start items-center my-6 gap-10'>
                <motion.img
                    animate={{
                        rotate: [-20, 80],
                    }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.3,
                        ease: 'linear'
                    }}
                    src='/shake.png'
                    alt='arrow'
                    className='h-20 w-auto'
                />
                <p className='text-white text-lg w-full text-center font-black mb-2'>¡No pares de agitar por 90 segundos al comenzar!</p>
            </motion.div>
            <motion.div
                animate={{
                    scale: [0, 1],
                }}
                transition={{
                    duration: 0.5,
                    ease: 'circInOut',
                    delay: 2.0
                }}
                className='mx-10'
            >
                <button to='/activity' className='h-auto w-full -mt-5' onClick={() => grantPermissions()}>
                    <motion.img
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 1.8,
                            ease: 'easeInOut'
                        }}
                        src='/play.png'
                        alt='arrow'
                        className='w-full' />
                </button>
                <button onClick={() => localStorage.removeItem('user')} className='text-white text-lg w-full text-center font-black mt-2'>Volver a inicio</button>
            </motion.div>
        </div>
    )
}

export default Instructions