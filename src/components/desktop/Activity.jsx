import { useState } from 'react';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import ConfettiExplosion from 'react-confetti-explosion';
import { useEffect } from 'react'
const mode = import.meta.env.MODE;
import { results } from '../../api/endpoints';
import { toast } from 'sonner';

const Activity = ({ setBackground }) => {
    const controls = useAnimationControls();
    const [exploding, setExploding] = useState(false);
    const [resultsData, setResultsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setBackground(false)
    }, []);

    const animationBeat = async () => {
        await controls.start({
            scale: 1.5,
            transition: {
                duration: 0.2,
                ease: 'easeInOut'
            }
        });
        return await controls.start({
            scale: 1,
            transition: {
                duration: 0.2,
                ease: 'easeInOut'
            }
        });
    };

    useEffect(() => {
        // Randomize the time the pinata will beat between 2 and 3 seconds
        const randomTime = Math.floor(Math.random() * (3000 - 2000) + 2000);
        const interval = setInterval(() => {
            animationBeat();
            setExploding(true);
        }, randomTime);
        return () => clearInterval(interval);
    }, []);

    const handleResults = async () => {
        try {
            setLoading(true);
            // const sandbox = mode !== 'development';
            const response = await results(1, 1);
            setResultsData(response.data.data);
            console.log(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Ha ocurrido un error, por favor intenta de nuevo');
            }
        }
    }

    return (
        <>
            <div className='container mx-auto px-4 relative h-svh w-full flex flex-col justify-center items-center z-40'>
                {exploding && <ConfettiExplosion colors={['#ff5f5f', '#cc9b4e']} onComplete={() => setExploding(false)} />}
                <div className='flex flex-col justify-center items-center w-full h-full z-20'>
                    <AnimatePresence mode='wait'>
                        {resultsData.length === 0 ? (
                            <motion.div
                                key={'pinata'}
                                initial={{
                                    scale: 1,
                                    opacity: 1
                                }}
                                exit={{
                                    scale: 0,
                                    opacity: 0
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: 'easeInOut'
                                }}
                                className='flex flex-col justify-center items-center w-full h-full'
                            >
                                <motion.div
                                    className='fixed'
                                    animate={{
                                        translateX: ['-30%', '0%', '30%'],
                                        translateY: ['-23%', '5%', '-23%'],
                                        rotate: [16, 0, -16]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        repeatType: 'mirror',
                                        duration: 1.9,
                                        ease: [0.42, 0, 0.58, 1]
                                    }}
                                >
                                    <motion.img
                                        animate={controls}
                                        src='/pinata.png'
                                        alt='pinata'
                                        className='h-auto w-full'
                                    />
                                </motion.div>
                            </motion.div>
                        ) : (
                            // Display the results with animation for each result
                            <div className='flex flex-row justify-between items-center w-full h-screen relative'>
                                <div className='flex flex-1 flex-row justify-start items-center w-full h-full'>
                                    <img
                                        src='/pinata.png'
                                        alt='pinata'
                                        className='h-auto w-3/4 rotate-12'
                                    />
                                </div>
                                <div className='flex flex-[2] flex-col justify-center items-center w-full h-full pt-32'>
                                    <div className='w-full h-[calc(100vh-5.75rem)] sticky top-16 overflow-y-scroll overscroll-contain'>
                                        {resultsData.map((result, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{
                                                    scale: 0,
                                                    opacity: 0
                                                }}
                                                animate={{
                                                    scale: 1,
                                                    opacity: 1
                                                }}
                                                exit={{
                                                    scale: 0,
                                                    opacity: 0
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    ease: 'easeInOut',
                                                    delay: index * 0.1
                                                }}
                                                className='flex flex-row justify-between items-center w-full h-auto border-b-1 border-b-white/30 mb-10 text-xl'
                                            >
                                                <p className='text-white/90 font-semibold text-left flex-[2]'>{result.name} {result.lastName}</p>
                                                <p className='text-white/90 font-semibold text-right flex-[4]'>{result.awardName}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                    {resultsData.length === 0 && (
                        <motion.div
                            animate={{
                                scale: [0, 1],
                                opacity: [0, 1]
                            }}
                            transition={{
                                duration: 0.5,
                                ease: 'circInOut',
                                // delay: 10
                            }}
                            className='fixed bottom-0 left-0 right-0 w-full h-auto z-50'>
                            <motion.button
                                key={`button-instructions`}
                                onClick={() => { handleResults() }}
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
                                style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.5 : 1 }}
                                >
                                <img src='/desktop/results.png' alt='arrow' className='w-full inline-block max-w-xl' />
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </div>
            <div className='absolute top-0 left-0 right-0 w-full bottom-0 bg-gradient-to-t from-yellow-400/60 via-transparent to-transparent z-10' />
        </>
    )
}

export default Activity