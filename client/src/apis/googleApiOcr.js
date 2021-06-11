import axiosClient from "./axiosClient";

//url and key here
const url = "https://vision.googleapis.com/v1/images:annotate?key=";
const key = "AIzaSyDFEKk0wo1hu5cP_XrZKL8Ej5_2anw1yjQ";
const googleApiOcr = {
  getText: (param) => {
    return axiosClient.post(`${url}${key}`, param);
  },
};

export default googleApiOcr;
