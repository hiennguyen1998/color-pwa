import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { animateSlideToTop, transition } from "../../Animation/Animation";
import cart from "../../assets/img/btn_Buy_blue.png";
import close from "../../assets/img/close.png";
import loading from "../../assets/img/loading.gif";
import ChangeColorText from "../../hooks/use_changeColorText";
import Notify from "../Notify/Notify";
import classes from "./ColorInformation.module.css";

function ColorInformation(props) {
  const { colorinfo, errCode, handCancle, text } = props;

  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const errorText = {
    notResult: "Aucune correspondance trouvée",
    notTex: "Nous n’avons pas pu lire votre référence. Merci de recommencer.",
  };
  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });
  const handlTouchStart = (event) => {
    if (event.target.nodeName !== "p") {
      setTouch({ ...touch, start: event.changedTouches[0].clientY });
    }
  };
  const handlTouchEnd = (event) => {
    setTouch({ ...touch, end: event.changedTouches[0].clientY });
  };

  useEffect(() => {
    if (
      touch.start > touch.end &&
      touch.start > 0 &&
      touch.end > 0 &&
      touch.start - touch.end > 250
    ) {
      console.log(touch);
      handCancle();
    }
  }, [touch.end, handCancle, touch.start, touch]);

  useEffect(() => console.log(colorinfo, errCode), [colorinfo, errCode]);

  return (
    <React.Fragment>
      {cartIsShown && <Notify onClose={hideCartHandler} />}
      <div
        className={classes.wrapper}
        onTouchStart={handlTouchStart}
        onTouchEnd={handlTouchEnd}
      >
        <div className={classes.wrapper}>
          {errCode === -1 && (
            <div className={classes.loading}>
              <img src={loading} alt="Loading" />
            </div>
          )}
          {errCode !== -1 && (
            <motion.div
              initial="out"
              animate="in"
              exit="exit"
              transition={transition}
              variants={animateSlideToTop}
            >
              <div
                className={classes["color-infomation"]}
                style={{ height: window.innerHeight }}
              >
                <div
                  className={classes["content-top"]}
                  style={{
                    backgroundColor: `${
                      errCode === 0
                        ? colorinfo.hexCode
                        : errCode === 1
                        ? "#ff7f00"
                        : "#fed000"
                    }`,
                  }}
                >
                  <div className={classes["image-container-close"]}>
                    <div to="scan" onClick={handCancle}>
                      <img
                        className={classes["btn-close"]}
                        src={close}
                        alt="cart"
                        style={{
                          background: `${
                            ChangeColorText(colorinfo.hexCode) === "black"
                              ? "#6b8129"
                              : ""
                          }`,
                        }}
                      />
                    </div>
                  </div>
                  <div className={classes.grid}>
                    <div className={classes.row}>
                      <div className={classes.col}>
                        <h1
                          className={classes["headline-top"]}
                          style={{ color: ChangeColorText(colorinfo.hexCode) }}
                        >
                          {errCode === 0
                            ? `${colorinfo.name}`
                            : errCode === 1
                            ? `${errorText.notTex}`
                            : errCode === 2
                            ? `${errorText.notResult}`
                            : ""}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={classes["content-bottom"]}
                  style={{ height: errCode !== 0 ? "70vh" : "" }}
                >
                  <div className={classes.grid}>
                    <div className={classes.row}>
                      <div className={classes.col}>
                        {errCode === 0 && (
                          <div className={classes["description-container"]}>
                            <p className={classes["description-header"]}>
                              La couleur de référence{" "}
                              <span
                                style={{
                                  // color: colorinfo.hexCode,
                                  color: `${
                                    ChangeColorText(colorinfo.hexCode) ===
                                    "black"
                                      ? "black"
                                      : colorinfo.hexCode
                                  }`,
                                  fontWeight: "bold",
                                }}
                              >
                                {colorinfo.name}
                              </span>{" "}
                              a été identifiée. Dans une version ultérieure de
                              l’application, sa fiche technique sera affichée
                              ici. D’autres fonctionnalités d’analyses et
                              d’aides à la vente seront également disponibles.
                            </p>
                          </div>
                        )}
                        {errCode === 1 && (
                          <div className={classes["description-container"]}>
                            <p className={classes["description-header"]}>
                              Pour une reconnaissance optimale du texte,
                              veuillez :
                              <p className={classes["description-content"]}>
                                - Stabiliser votre appareil photo <br /> - Vous
                                assurer d’un éclairage suffisant <br /> - Cadrer
                                la photo de face si possible
                              </p>
                            </p>
                          </div>
                        )}
                        {errCode === 2 && (
                          <div className={classes["description-container"]}>
                            <p className={classes["description-header"]}>
                              L’application a détecté la référence suivante :
                              <b> {text}</b> mais n’a trouvé aucune
                              correspondance dans sa base de données. Une des
                              raisons peut être la suivante :{" "}
                              <p className={classes["description-content"]}>
                                - La base de données ne contient pas cette
                                référence à ce stade du projet. <br />
                                - La référence scannée comporte trop ou pas
                                assez de texte afin d’être reconnue par notre
                                application. <br />
                              </p>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {errCode === 0 && (
                  <div className={classes["btn-wrapper"]}>
                    <img
                      className={classes["cart-img"]}
                      src={cart}
                      alt="cart"
                      onClick={showCartHandler}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ColorInformation;
