import axios from "axios";
const instance = axios.create();

export async function uploadImage(files) {
  let filesUrl = [];
  const formdata = new FormData();
  try {
    await Promise.all(
      files.map((img, index) => {
        return new Promise((resolve, reject) => {
          formdata.append("file", img);
          formdata.append("upload_preset", "zxbf0wo6");
          const res = instance.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            formdata
          );
          resolve(res);
        })
          .then((res) => filesUrl.push(res.data.url))
          .catch((err) => {
            throw new Error(`Oops, ${err}`);
          });
      })
    );
  } catch (err) {
    console.log(err.message);
  } finally {
    return filesUrl;
  }
}

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      return resolve({
        data: fileReader.result,
      });
    };
    fileReader.readAsDataURL(file);
  });
}
