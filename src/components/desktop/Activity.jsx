import { useState } from 'react';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import ConfettiExplosion from 'react-confetti-explosion';
import { useEffect } from 'react'
import { results } from '../../api/endpoints';
import { toast } from 'sonner';
const mode = import.meta.env.MODE === 'development' ? 0 : 1;

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
            const response = await results(mode);
            console.log(response);
            
            if (response.status !== 200) {
                if (response.data.message !== null || response.data.message !== undefined) {
                    toast(response.data.message);
                } else {
                    toast('Aún no tenemos a los ganadores ¡Sigan rompiendo la piñata!')
                }
                setLoading(false)
                return;
            }
            setResultsData(response.data.winnersSnapshot.winners);
            console.log(response.data.winnersSnapshot.winners);
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
                {exploding && <ConfettiExplosion colors={['#D96ED7', '#cc9b4e']} onComplete={() => setExploding(false)} />}
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
                                    className='fixed origin-top'
                                    style={{ transformOrigin: '50% 0%' }}
                                    animate={{
                                        translateX: ['-18%', '12%', '-22%', '18%', '-10%', '14%', '-20%'],
                                        translateY: ['-18%', '-10%', '-22%', '-12%', '-15%', '-11%', '-19%'],
                                        rotate: [16, -11, 18, -13, 10, -9, 15],
                                        skewX: [1.2, -0.8, 1.5, -1, 0.7, -0.5, 1.1]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 7.4,
                                        ease: 'easeInOut',
                                        repeatDelay: 0.35,
                                        times: [0, 0.12, 0.34, 0.56, 0.7, 0.88, 1]
                                    }}
                                >
                                    <motion.img
                                        animate={controls}
                                        src='/pinata.png'
                                        alt='pinata'
                                        className='h-auto w-4/6'
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
                                    <div className='w-full h-[calc(100vh-5.75rem)] sticky top-16 overflow-y-scroll overscroll-contain pr-2 space-y-6'>
                                        {resultsData.map((result, index) => {
                                            const { prizeSnapshot = {} } = result || {};
                                            const {
                                                rank: prizeRank,
                                                hotel,
                                                noches,
                                                descripcion
                                            } = prizeSnapshot;
                                            const rankToShow = prizeRank ?? result.rank;
                                            const fullName = `${result.name || ''} ${result.lastname || ''}`.trim();

                                            return (
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
                                                    className='relative w-full h-auto overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.35)] backdrop-blur'
                                                >
                                                    <div className='pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-purple-500/10 opacity-70' />
                                                    <div className='relative flex items-start justify-between gap-4'>
                                                        <div className='flex flex-col gap-1'>
                                                            <p className='text-lg uppercase tracking-[0.14em] text-white/60'>Rank #{rankToShow ?? '-'}</p>
                                                            <h3 className='text-2xl font-black leading-tight text-white'>{fullName || 'Nombre no disponible'}</h3>
                                                        </div>
                                                        <div className='text-right'>
                                                            <p className='text-lg uppercase tracking-[0.14em] text-white/60'>Puntaje</p>
                                                            <p className='text-3xl font-black text-amber-300 drop-shadow-[0_6px_18px_rgba(255,191,72,0.45)]'>{result.score ?? '-'}</p>
                                                        </div>
                                                    </div>
                                                    <div className='relative mt-5 grid grid-cols-1 gap-4 text-sm text-white/80'>
                                                        <div className='flex flex-col gap-1'>
                                                            <span className='text-lg uppercase tracking-[0.14em] text-white/60'>Hotel</span>
                                                            <p className='text-xl font-semibold leading-snug text-white/90'>{hotel || 'Por definir'}</p>
                                                        </div>
                                                        <div className='flex items-center gap-3'>
                                                            <span className='text-lg uppercase tracking-[0.14em] text-white/60'>Noches</span>
                                                            <span className='inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-base font-semibold text-white'>
                                                                {noches ? `${noches} noche${noches === 1 ? '' : 's'}` : '-'}
                                                            </span>
                                                        </div>
                                                        <div className='flex flex-col gap-1'>
                                                            <span className='text-lg uppercase tracking-[0.14em] text-white/60'>Descripción</span>
                                                            <p className='text-xl leading-relaxed text-white/90'>{descripcion || 'Sin descripción'}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
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
            <div className='absolute top-0 left-0 right-0 w-full bottom-0 bg-gradient-to-t from-purple-400/60 via-transparent to-transparent z-10' />
        </>
    )
}

export default Activity
