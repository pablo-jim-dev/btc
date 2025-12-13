import { motion } from 'framer-motion'

const Instructions = ({
    setInstructions,
    setActivity,
}) => {
    return (
        <>
            <div className='container mx-auto px-4 relative h-svh w-full flex flex-col justify-center items-center z-40'>
                <div className='flex flex-col justify-center items-center w-full h-full z-20'>
                    <div className='flex flex-row justify-center items-center w-full h-full z-20'>
                        <div className='flex flex-1 flex-col justify-end items-center w-full h-full z-20'>
                            <motion.p
                                animate={{
                                    scale: [0, 1],
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: 'circInOut',
                                    delay: 0.5
                                }}
                                className='text-white/90 text-4xl text-left mb-10 font-semibold'>
                                Rompe la piñata digital de <span className='font-black text-white'>BTC. </span><span className='font-bold text-white'>Agita tu celular para acumular la mayor cantidad de puntos posibles en 90 segundos</span> y romper la piñata. ¡Mucha suerte!
                            </motion.p>
                            <button
                                key={`button-instructions`}
                                onClick={() => { setInstructions(false); setActivity(true) }}
                                className='w-full h-auto' type='submit'>
                                <img src='/start.png' alt='arrow' className='w-full inline-block max-w-xl' />
                            </button>
                        </div>
                        <div className='flex flex-1 flex-col justify-center items-center w-full h-full z-20 gap-10'>
                            <motion.img
                                animate={{
                                    scale: [0, 1],
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: 'circInOut',
                                    delay: 1.2
                                }}
                                src='/desktop/scan.png'
                                alt='logo'
                                className='h-auto w-full max-w-md mt-10'
                            />
                            <motion.img
                                animate={{
                                    scale: [0, 1],
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: 'circInOut',
                                    delay: 1.2
                                }}
                                src='/desktop/qr.png'
                                alt='logo'
                                className='h-auto w-full max-w-xl'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute top-0 left-0 right-0 w-full bottom-0 bg-gradient-to-t from-purple-400/60 via-transparent to-transparent z-10' />
        </>
    )
}

export default Instructions