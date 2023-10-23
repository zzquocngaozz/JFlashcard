export const checkImg = (url,onSuccess,onError)=>{
    let image = new Image()
    image.onload = onSuccess
    image.onerror = onError
    image.src = url
}