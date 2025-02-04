import { motion } from "framer-motion";

const PokeLoader = () => {
  const letters = "loading".split("");

  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        className="w-20 h-20 bg-cover"
        style={{ backgroundImage: "url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png')" }}
        animate={{
          rotate: [0, 360],
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
        }}
      />
      <div className="flex space-x-1">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-2xl font-bold pokemon-font"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default PokeLoader;