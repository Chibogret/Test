import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import styles from '../styles.module.css';

const AnimatedText = () => {
  const ref = useRef([]);
  const [items, setItems] = useState(['Nadeline', 'and', 'Deinyel']);
  const [showAnd, setShowAnd] = useState(true);

  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: 'perspective(600px) rotateX(0deg)',
      color: 'black',
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { color: '#A87676' },
    ],
    leave: [{ color: 'white' }, { innerHeight: 0 }, { opacity: 0.5, height: 0 }],
    update: { color: 'black' },
    config: {
      mass: 0.5,
      tension: 500,  // Increase tension for faster transition
      friction: 100,  // Decrease friction for faster transition
    },
  });

  const reset = useCallback(() => {
    ref.current.forEach(clearTimeout);
    ref.current = [];
    setItems(['Nadeline', showAnd ? 'and' : null, 'Deinyel'].filter(Boolean));
  }, [showAnd]);

  const toggleAnd = () => {
    setShowAnd(prev => !prev);
    setItems(['Nadeline', !showAnd ? 'and' : null, 'Deinyel'].filter(Boolean));
  };

  useEffect(() => {
    reset();
    return () => ref.current.forEach(clearTimeout);
  }, [reset]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {transitions(({ innerHeight, ...rest }, item) => (
          <animated.div className={styles.transitionsItem} style={rest} onClick={toggleAnd}>
            <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedText;
