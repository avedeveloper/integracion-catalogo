
function randomDelay(){
  let time = Math.floor(Math.random() * 500);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
export {randomDelay}