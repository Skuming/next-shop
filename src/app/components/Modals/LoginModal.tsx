import * as motion from "motion/react-client";

export default function LoginModal() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex z-50 w-full h-screen absolute bg-amber-50"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
      </motion.div>
    </>
  );
}
