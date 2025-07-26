import { motion } from "framer-motion";

const Title = () => {
    return (
        <div className="flex justify-center items-center">
            <motion.h1
                className="text-4xl font-bold text-gray-800 mb-4"
                initial={{ scale: 1 }}
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
            >
                DineXpress
            </motion.h1>
        </div>
    );
};

export default Title;
