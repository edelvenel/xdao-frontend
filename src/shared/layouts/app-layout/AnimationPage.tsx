import { motion } from 'framer-motion';
import React from 'react';

interface AnimationPageProps {
	animationKey: string | number;
	children: React.ReactNode;
}

export const AnimationPage = ({ animationKey, children }: AnimationPageProps) => {
	const fadeVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
	};

	const fadeTransition = {
		duration: 0.5,
	};

	return (
		<motion.div
			animate="animate"
			exit="exit"
			initial="initial"
			key={animationKey}
			transition={fadeTransition}
			variants={fadeVariants}
		>
			{children}
		</motion.div>
	);
};
