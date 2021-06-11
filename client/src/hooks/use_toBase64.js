const blobToBase64 = (blob, callback) => {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function () {
        let dataUrl = reader.result;
        let base64 = dataUrl.split(",")[1];
        // console.log(base64);
        callback(base64);
    };


};

export default blobToBase64;