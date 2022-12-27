
function randomDelay(){
  let time = Math.floor(Math.random() * 500);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
function procesatorCSV(data){
  let result = [];
  let headers = data[0].split(',');
  for(let i=1; i<data.length; i++){
    let obj = {};
    let currentline = data[i].split(',');
    for(let j=0; j<headers.length; j++){
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}
function conversorBase64Tostring(base64){
  let buff = new Buffer.from(base64, 'base64');
  return buff.toString('ascii');
}

export {randomDelay}