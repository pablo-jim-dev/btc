import { motion } from 'framer-motion'

const Home = ({
    setInitial,
    setInstructions
}) => {
    return (
        <>
            <div className='container mx-auto px-4 relative h-svh w-full flex flex-col justify-center items-center z-40'>
                <div className='flex flex-col justify-center items-center w-full h-full z-20'>
                    <motion.p
                        animate={{
                            scale: [0, 1],
                        }}
                        transition={{
                            duration: 0.5,
                            ease: 'circInOut',
                            delay: 0.5
                        }}
                        className='text-white text-3xl text-center font-bold -mb-6'>Participa en nuestro</motion.p>
                    <motion.img
                        animate={{
                            scale: [0, 1],
                        }}
                        transition={{
                            duration: 0.5,
                            ease: 'circInOut',
                            delay: 1.2
                        }}
                        src='/desktop/contest.png' alt='logo' className='h-auto w-full max-w-4xl' />
                    <motion.button
                        key={`button-Home`}
                        onClick={() => { setInitial(false); setInstructions(true) }}
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
                        <img src='/start.png' alt='arrow' className='w-full inline-block max-w-lg' />
                    </motion.button>
                </div>
            </div>
            <div className='absolute top-0 left-0 right-0 w-full bottom-0 bg-gradient-to-t from-yellow-400/60 via-transparent to-transparent z-10' />
        </>
    )
}

export default Home