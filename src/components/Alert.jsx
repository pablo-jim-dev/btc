import { motion } from "framer-motion"

const Alert = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center gap-10'>
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
                src='/shake.png' alt='shake' className='h-24 w-24' />
            <p className='text-white text-3xl text-center font-bold'>¡Continúa golpeando la piñata!</p>
        </div>
    )
}

export default Alert