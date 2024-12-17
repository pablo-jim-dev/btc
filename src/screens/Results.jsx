import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router'
import Home from '../components/desktop/Home';
import Instructions from '../components/desktop/Instructions';
import Activity from '../components/desktop/Activity';
import { AnimatePresence, motion } from 'framer-motion';

const Results = () => {
    const { setBackground } = useOutletContext();
    const [initial, setInitial] = useState(true)
    const [instructions, setInstructions] = useState(false)
    const [activity, setActivity] = useState(false)
    useEffect(() => {
        setBackground(true)
        return () => {
            setInitial(true)
            setInstructions(false)
        }
    }, []);

    const animateProps = {
        className: 'w-full h-full flex justify-center items-center',
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5 }
    }

    return (
        <>
            <AnimatePresence mode='wait'>
                {initial &&
                    <motion.div
                        key={1}
                        {...animateProps}
                    >
                        <Home setInitial={setInitial} setInstructions={setInstructions} />
                    </motion.div>
                }
                {instructions &&
                    <motion.div
                        key={2}
                        {...animateProps}
                    >
                        <Instructions setInstructions={setInstructions} setActivity={setActivity} />
                    </motion.div>
                }
                {activity &&
                    <motion.div
                        key={3}
                        {...animateProps}
                    >
                        <Activity
                            setBackground={setBackground}
                            setResults={setActivity}
                            setInitial={setInitial}
                            setInstructions={setInstructions}
                            setActivity={setActivity}
                        />
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default Results