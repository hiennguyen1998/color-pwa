import React from "react";
import PWAPrompt from "react-ios-pwa-prompt";
import nordprint from "../../assets/img/logo-nordprint-blue.png";
import logo from "../../assets/img/Logo_ColorReader.png";
import scanBtn from "../../assets/img/btn_Scan_blue.png";
import classes from "./SplashScreen.module.css";

function SplashScreen(props) {
  return (
    <div className={classes.wrapper} style={{ height: window.innerHeight }}>
      <div className={classes["main-splash-screen"]}>
        <div className={classes["wrap-nordprint"]}>
          <img className={classes.nordprint} src={nordprint} alt="nordprint" />
        </div>
        <div className={classes["wrap-logo"]}>
          <img className={classes.logo} src={logo} alt="logo" />
        </div>
        <div className={classes["wrap-btn-scan"]}>
          <img
            className={classes.scan}
            src={scanBtn}
            alt="scan"
            onClick={() => {
              props.handlChangePage(2);
            }}
          />
        </div>
        <div className={classes["wrap-footer"]}>
          <h1 className={classes["line-footer"]}>Powered by RONIN.vn</h1>
          <p className={classes.version}>version 1.1</p>
        </div>
      </div>
      <PWAPrompt
        promptOnVisit={3}
        timesToShow={1}
        copyClosePrompt="Close"
        copyBody="This website has app functionality. Add it to your home screen to use it in fullscreen."
        permanentlyHideOnDismiss={false}
      />
    </div>
  );
}

export default SplashScreen;
