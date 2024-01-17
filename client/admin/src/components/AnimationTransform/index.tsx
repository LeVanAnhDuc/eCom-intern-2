import React, { useRef } from 'react';
import { useInView } from 'framer-motion';

interface Iprops {
    children: React.ReactNode;
    className?: string;
    TransX?: {
        to: number;
        from: number;
    };
    TransY?: {
        to: number;
        from: number;
    };
}

const AnimationTransform = ({ children, className, TransX, TransY }: Iprops) => {
    const ref = useRef(null);

    const isInView = useInView(ref, { once: true });

    const transformStyleX = TransX && {
        transform: isInView ? `translateX(${TransX.from}px)` : `translateX(${TransX.to}px)`,
    };
    const transformStyleY = TransY && {
        transform: isInView ? `translateY(${TransY.from}px) ` : `translateY(${TransY.to}px) `,
    };

    const transformStyle = TransX ? transformStyleX : transformStyleY;
    return (
        <div ref={ref} className={className}>
            <div
                style={{
                    ...transformStyle,
                    opacity: isInView ? 1 : 0,
                    transition: 'all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
                }}
                className="h-full w-full"
            >
                {children}
            </div>
        </div>
    );
};

export default AnimationTransform;
