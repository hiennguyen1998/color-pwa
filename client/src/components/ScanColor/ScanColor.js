import React, { useRef, useState, useEffect } from "react";
import capture from "../../assets/img/btn_Scan_blue.png";
import useUserMedia from "../../hooks/use_camera";
import toBase64 from "../../hooks/use_toBase64";
import classes from "./ScanColor.module.css";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "environment" },
};

function ScanColor(props) {
  const { onHandlImg } = props;

  const canvasRef = useRef();
  const videoRef = useRef();
  const viewRef = useRef();

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const [touch, setTouch] = useState({
    start: 0,
    end: 0,
  });

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  useEffect(() => {
    if (
      touch.start > touch.end &&
      touch.end > 0 &&
      touch.start - touch.end > 250
    ) {
      props.handlChangePage(1);
    }
  }, [touch.end, touch.start, touch, props]);

  const handlTouchStart = (event) => {
    setTouch({ ...touch, start: event.changedTouches[0].clientY });
  };

  const handlTouchEnd = (event) => {
    setTouch({ ...touch, end: event.changedTouches[0].clientY });
  };

  const handleCanPlay = () => {
    setIsVideoPlaying(true);
    videoRef.current.play();
  };

  const handleCapture = () => {
    if (!isVideoPlaying) return;
    let context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,

      videoRef.current.videoWidth * 0.1, //x
      videoRef.current.videoHeight * 0.3, //y
      videoRef.current.videoWidth * 0.8, //x ve
      videoRef.current.videoHeight * 0.25, //y ve
      0,
      0,
      (canvasRef.current.width = videoRef.current.videoWidth * 0.8),
      (canvasRef.current.height = videoRef.current.videoHeight * 0.25) // .25
    );

    canvasRef.current.toBlob(
      (blob) => toBase64(blob, onHandlImg),
      "image/png",
      0.8
    );
    props.handlChangePage(3);
  };
  return (
    <div
      className={classes.wrapper}
      onTouchStart={handlTouchStart}
      onTouchEnd={handlTouchEnd}
      style={{ height: window.innerHeight, width: window.innerWidth }}
      ref={viewRef}
    >
      <canvas
        ref={canvasRef}
        className={classes.canvas}
        style={{
          width: "80%",
          height: "25%",
          position: "relative",
          display: "none",
          // zIndex: 100,
        }}
      ></canvas>
      <div className={classes.container}>
        <div className={classes["container-text"]}>
          <h1 className={classes.headline}>
            Veuillez scanner une référence de couleur
          </h1>
        </div>
        <div className={classes["container-scan"]}>
          <video
            ref={videoRef}
            onCanPlay={handleCanPlay}
            autoPlay
            playsInline
          ></video>
          <div className={classes.backdrop}></div>
          <div className={classes["btn-wrapper"]}>
            <img
              className={classes["capture-img"]}
              onClick={handleCapture}
              src={capture}
              alt="Capture handler"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScanColor;
