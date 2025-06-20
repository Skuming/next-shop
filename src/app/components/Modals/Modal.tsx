import { Modal } from "@/app/interfaces/interfaces";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect } from "react";

export default function ModalLayout({ children }: Modal) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className=" flex z-50 w-full h-screen absolute bg-black/20 justify-center items-center backdrop-blur"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-[90%] md:w-[60%] lg:w-[30%] h-fit rounded-2xl pr-[10px] pl-[10px] pt-[30px] pb-[30px] flex flex-col items-center gap-[30px]"
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
