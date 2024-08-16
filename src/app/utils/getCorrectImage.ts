//use with await !!!!!!!!!!!
const getCorrectImage = async (url: string, type: 'default' | 'comingSoon' = 'default'): Promise<string> => {
  const variants = {
    default: 'assets/images/default-img-devise',
    comingSoon: 'assets/images/default-img-devise'
  }
  return new Promise<string>((resolve) => {
    const img = new Image();

    img.onload = function () {
      resolve(url);
    };

    img.onerror = function () {
      img.src = variants[type];
      resolve(img.src);
    };

    img.src = url;
  });
}

export default getCorrectImage;
