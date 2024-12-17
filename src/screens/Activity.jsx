import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import ConfettiExplosion from 'react-confetti-explosion';
import Instructions from '../components/Instructions';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { register } from '../api/endpoints';

const Activity = () => {
    const [count, setCount] = useState(0);
    const [granted, setGranted] = useState(false);
    const { setBackground } = useOutletContext();
    const controls = useAnimationControls();
    const [exploding, setExploding] = useState(false);
    const inactivityTimer = useRef(null);
    const [timeLeft, setTimeLeft] = useState(90);
    const [finished, setFinished] = useState(false);
    const lastMultipleRef = useRef(0);
    const motionHandlerRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();
    const mode = import.meta.env.MODE;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (!user) navigate('/');
        return () => {
            setBackground(true);
            setGranted(false);
            setCount(0);
            setTimeLeft(90);
            setFinished(false);
            setLoading(false);
            setAlert(false);
        };
    }, []);

    useEffect(() => {
        if (finished && motionHandlerRef.current) window.removeEventListener('devicemotion', motionHandlerRef.current);
    }, [finished]);

    useEffect(() => {
        const currentMultiple = Math.floor(count / 200) * 200;
        if (currentMultiple > lastMultipleRef.current) {
            lastMultipleRef.current = currentMultiple;
            if (!exploding) {
                setExploding(true);
                animationBeat();
                setTimeout(() => {
                    setExploding(false)
                    if (alert) setAlert(false);
                }, 2000);
            }
        }
    }, [count, exploding, alert]);

    useEffect(() => {
        if (inactivityTimer.current && granted && !finished) {
            clearTimeout(inactivityTimer.current)
            inactivityTimer.current = null;
        };

        if (granted && !finished) {
            inactivityTimer.current = setTimeout(() => {
                setAlert(true);
                inactivityTimer.current = null;
            }, 5000);
        }

        return () => {
            if (granted && !finished) {
                clearTimeout(inactivityTimer.current);
                inactivityTimer.current = null;
            }
        };
    }, [count, granted, finished]);

    useEffect(() => {
        if (timeLeft > 0 && granted) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setFinished(true);
            setExploding(true);
            setAlert(false);
        }
    }, [timeLeft, granted]);

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

    const grantPermissions = async () => {
        try {
            const response = await DeviceMotionEvent.requestPermission();
            if (response === 'granted') {
                setGranted(true);
                setBackground(false);
                const motionHandler = (event) => {
                    event.preventDefault()
                    event.stopPropagation();
                    setCount((prevCount) => {
                        const increment = Math.abs(
                            event.acceleration.x +
                            event.acceleration.y +
                            event.acceleration.z
                        );
                        return Math.round(prevCount + increment / 30);
                    });
                };

                motionHandlerRef.current = motionHandler;

                window.addEventListener('devicemotion', motionHandler, { passive: false });
            } else {
                toast.error('Para poder participar en la actividad, necesitas conceder permiso a los sensores de tu dispositivo.');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (event) => {
        try {
            setLoading(true);
            event.preventDefault();
            const user = JSON.parse(localStorage.getItem('user'));
            const data = {
                ...user,
                count: count,
                // mode: mode === 'development' ? false : true
                mode: false
            };
            const res = await register(data);
            console.log(res);
            setLoading(false);
            navigate('/wait');
            // Enviar datos a la API
        } catch (error) {
            setLoading(false);
            console.log(error);

            // If error.response.data.message is not undefined or empty, show it
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
                localStorage.removeItem('user');
                navigate('/');
            } else {
                console.error(error);
                toast.error('Ha ocurrido un error, por favor intenta de nuevo');
            }
        }
    }

    return (
        <div className='container mx-auto px-4 relative h-svh w-full flex flex-col justify-center items-center z-20'>
            {exploding && <ConfettiExplosion colors={['#ff5f5f', '#cc9b4e']} onComplete={() => setExploding(false)} />}
            <AnimatePresence mode='wait'>
                {alert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className='fixed top-0 left-0 w-full h-full bg-transparent z-50 flex justify-center items-center'>
                        <Alert />
                    </motion.div>
                )}
            </AnimatePresence>
            {!granted && !finished && (
                <div className='flex flex-col justify-end items-center w-full h-full'>
                    <Instructions grantPermissions={grantPermissions} />
                </div>
            )}
            {granted && !finished && (
                <>
                    <div className='flex flex-col justify-center items-center w-full h-full z-20'>
                        <div className='absolute top-28 left-0 right-0 w-full flex flex-col justify-center items-center text-center z-30'>
                            <p className='text-white text-base uppercase font-black'>Tiempo restante: </p>
                            <h2 className='text-white text-3xl'>{timeLeft}</h2>
                        </div>
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
                        <motion.div
                            animate={controls}
                            className='absolute bottom-10 left-0 right-0 z-10 pointer-events-none text-center'
                        >
                            <h2 className='text-white text-lg'>Puntuación</h2>
                            <p className='text-white text-8xl'>{count}</p>
                        </motion.div>
                    </div>
                    <motion.div
                        animate={{
                            translateY: ["100%", "0%"],
                        }}
                        transition={{
                            duration: 1.2,
                            ease: 'circInOut',
                        }}
                        className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-yellow-400/60 via-transparent to-transparent z-10' />
                </>
            )}
            {finished && timeLeft === 0 && (
                <>
                    <motion.div
                        animate={{
                            scaleY: [0, 1],
                        }}
                        transition={{
                            duration: 0.5,
                            ease: 'circInOut',
                            delay: 0.7
                        }}
                        className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-amber-400/45 to-transparent z-10' />
                    <div className='flex flex-col justify-center items-center w-full max-w-md h-auto my-8 z-20'>
                        <motion.img
                            animate={{
                                scale: [0, 1],
                            }}
                            transition={{
                                duration: 0.5,
                                ease: 'circInOut',
                                delay: 0.7
                            }}
                            src='/done.png'
                            alt='game-over'
                            className='h-auto w-full'
                        />
                        <motion.div
                            animate={{
                                scale: [0, 1],
                            }}
                            transition={{
                                duration: 0.5,
                                ease: 'circInOut',
                                delay: 1.2
                            }}
                            className='relative w-full h-auto pointer-events-none text-center'
                        >
                            <h2 className='text-white text-lg'>Puntuación</h2>
                            <p className='text-white text-8xl'>{count}</p>
                        </motion.div>
                        <motion.div
                            animate={{
                                scale: [0, 1],
                            }}
                            transition={{
                                duration: 0.5,
                                ease: 'circInOut',
                                delay: 1.4
                            }}
                        >
                            <motion.button
                                onClick={handleSubmit}
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
                                <img src='/continue.png' alt='arrow' className='w-full inline-block' />
                            </motion.button>
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Activity;
