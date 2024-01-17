import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface Iprops {
    children: React.ReactNode;
    className?: string;
    Scale?: {
        to: number;
        from: number;
    };
}

const AnimationScale = ({ children, className, Scale = { to: 0, from: 1 } }: Iprops) => {
    const ref = useRef(null);

    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className={className}>
            <div
                style={{
                    transform: isInView ? `scale(${Scale.from})` : `scale(${Scale.to})`,

                    opacity: isInView ? 1 : 0,
                    transition: 'all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default AnimationScale;
