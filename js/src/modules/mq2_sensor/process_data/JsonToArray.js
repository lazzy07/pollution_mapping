/**
 * 
 * @param {Array} jsonA Smoke data objects array with keys ppm and RsRo
 */
export const jsonToArray = (jsonA) => {
  let ppm = [];
  let resistance = [];
  for(let i=0; i<jsonA.length; i++){
    ppm.push(jsonA[i].ppm);
    resistance.push(jsonA[i].RsRo);
  }
  
  return {
    ppm,
    resistance
  }
}