import { motion } from 'framer-motion';

const NotFoundIllustration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-48 h-48 mx-auto mb-8"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Crane Base */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          d="M20 160 L20 40"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
        />
        
        {/* Crane Arm */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          d="M20 40 L60 40"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
        />
        
        {/* Crane Cable */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
          d="M40 40 L40 80"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-accent-500"
        />

        {/* Building Structure */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
          d="M60 160 L60 80 L140 80 L140 160"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
        />
        
        {/* Construction Lines */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeInOut" }}
          d="M60 100 L140 100"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-accent-500"
        />
        
        {/* Windows */}
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          x="75"
          y="90"
          width="15"
          height="15"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
        />
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.3 }}
          x="95"
          y="90"
          width="15"
          height="15"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
        />
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
          x="115"
          y="90"
          width="15"
          height="15"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
        />
        
        {/* Door */}
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.3 }}
          x="90"
          y="130"
          width="20"
          height="30"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
        />

        {/* Construction Sign */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.3 }}
          d="M160 140 L180 140 L180 160 L160 160 Z"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
        />
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
          d="M165 145 L175 155 M175 145 L165 155"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent-500"
        />
        
        {/* 404 Text */}
        <motion.text
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
          x="100"
          y="30"
          textAnchor="middle"
          className="text-accent-500 font-kuunari-medium text-2xl"
        >
          404
        </motion.text>
      </svg>
    </motion.div>
  );
};

export default NotFoundIllustration; 