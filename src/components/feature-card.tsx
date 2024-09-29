// FeatureCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    image: StaticImageData; // Adjust this type if needed
    custom: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, image, custom }) => {
    return (
        <motion.div
            className="border-[3px] hover:border-purple-500 group bg-background transition-colors duration-150 ease-linear overflow-hidden relative col-span-1 p-6 md:p-10 h-[23rem] md:h-[25rem] rounded-lg"
            initial="hidden"
            whileInView="visible"
            custom={custom}
            viewport={{ once: true, amount: 0.3 }}
        >
            {icon}
            <h3 className="text-xl md:text-3xl font-semibold mb-2">{title}</h3>
            <p className='text-sm text-gray-400 font-[300]'>{description}</p>
            <Image
                className='absolute md:left-[50%] md:translate-x-[-50%] transition-all duration-300 opacity-50 ease-linear bottom-[-150px] group-hover:opacity-100 group-hover:bottom-[-70px] md:group-hover:bottom-[-110px] border-2 p-2 rounded-md'
                src={image}
                width={500}
                height={500}
                alt={title}
            />
            <div className='absolute transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 left-[50%] translate-x-[-50%] -bottom-[0rem] -z-[20] size-[3rem] md:size-[12rem] overflow-hidden rounded-full bg-gradient-to-t from-purple-400 to-purple-700 blur-[8em]'></div>
        </motion.div>
    );
};

export default FeatureCard;
