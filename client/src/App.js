import React, { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animateFade, transition } from "./Animation/Animation";
import ColorInformation from "./components/ColorInformation/ColorInformation";
import ScanColor from "./components/ScanColor/ScanColor";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import imgToList from "./hooks/use_imgToColor";
import "./index.css";

const App = () => {
  // const location = useLocation();

  const [pageNum, setPageNum] = useState(1);
  const [base64, setBase64] = useState("");

  const [color, err, text] = imgToList(base64);

  const handlGetText = (base) => {
    setBase64(base);
  };
  const handCancle = () => {
    setBase64("");

    handlChangePage(2);
  };

  const handlChangePage = (page) => {
    setPageNum(page);
  };

  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter key={pageNum}>
        {pageNum === 1 && (
          <motion.div
            initial="out"
            animate="in"
            exit="out"
            variants={animateFade}
            transition={transition}
            key={pageNum}
          >
            <SplashScreen handlChangePage={handlChangePage} pageNum={pageNum} />
          </motion.div>
        )}

        {pageNum === 2 && (
          <motion.div
            initial="out"
            animate="in"
            exit="out"
            transition={transition}
            variants={animateFade}
            key={pageNum}
          >
            <ScanColor
              onHandlImg={handlGetText}
              handlChangePage={handlChangePage}
            />
          </motion.div>
        )}

        {pageNum === 3 && (
          <motion.div
            initial="out"
            animate="in"
            exit="exit"
            variants={animateFade}
            key={pageNum}
          >
            <ColorInformation
              colorinfo={color}
              errCode={err}
              text={text}
              handCancle={handCancle}
              handlChangePage={handlChangePage}
              pageNum={pageNum}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default App;
