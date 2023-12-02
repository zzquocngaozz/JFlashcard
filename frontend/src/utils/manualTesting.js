export const checkImg = (url, onSuccess, onError) => {
  let image = new Image();
  image.onload = onSuccess;
  image.onerror = onError;
  image.src = url;
};

export function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
