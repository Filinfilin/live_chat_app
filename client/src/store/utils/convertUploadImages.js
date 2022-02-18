export async function uploadImage(file) {
  let fileUrl = [];
  const formdata = new FormData();
  for (const img of file) {
    try {
      formdata.append("file", img);
      formdata.append("upload_preset", "zxbf0wo6");
      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dxsalxqoo/image/upload`,
        requestOptions
      );
      if (res.status !== 200) {
        console.log("Looks like there was a problem." + res.status);
        return;
      }
      const response = await res.json();
      fileUrl.push(response.url);
    } catch (error) {
      console.log("Fetch error: ", error);
    }
  }
  return fileUrl;
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
