import { useEffect, useState } from "react";
import ColorApi from "../apis/ColorApi";
import googleApiOcr from "../apis/googleApiOcr";

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const ImgToColor = (base64) => {
  const [color, setColor] = useState({});
  const [err, setErr] = useState(-1);
  // 0 no error
  // 1 "Can not scan the text, please try again"
  // 2 don't have result

  const [text, setText] = useState("");

  useEffect(() => {
    if (base64 !== "") {
      let data = JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [
              {
                type: "TEXT_DETECTION",
              },
            ],
          },
        ],
      });
      googleApiOcr.getText(data).then((response) => {
        if (isEmpty(response.responses[0])) {
          setErr(1);
        } else {
          setText(response.responses[0].fullTextAnnotation.text.trim());
        }
      });
    }

    return () => {
      setText("");
      setErr(-1);

      setColor({});
    };
  }, [base64]);

  useEffect(() => {
    if (text !== "") {
      ColorApi.getColor(text)
        .then((data) => {
          console.log("data--", data);

          if (data.Colors.length === 0) {
            setErr(2);
          } else {
            if (data.Colors[0]) {
              setColor(data.Colors[0]);
              setErr(0);
            } else {
              setErr(2);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setErr(2);
        });
    }
  }, [text]);

  return [color, err, text];
};

export default ImgToColor;
