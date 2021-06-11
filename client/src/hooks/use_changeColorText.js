import Color from "color";

const ChangeColorText = (hex) => {
  if (!hex) return "";
  hex = hex.trim();
  let color = Color(hex).rgb().array();
  let o = Math.round(
    (parseInt(color[0]) * 299 +
      parseInt(color[1]) * 587 +
      parseInt(color[2]) * 114) /
      1000
  );
  if (o > 125) {
    return "black";
  } else {
    return "white";
  }
};
export default ChangeColorText;
