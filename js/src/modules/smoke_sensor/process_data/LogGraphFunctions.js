class LogGraphFunctions{
  static find_slope(y, lty, ltx){
    let points = lty.length;
    let counter = 0;

    for (counter = 0; counter < points-1; counter++) {
      if (y < lty[counter] && y > lty[counter + 1]) {
        break;
      }
    }
    if (y > lty[0]) {
      counter=0;
    }
    if (counter >= points-1) {
      counter = points-2;
    }
    return Math.log10(lty[counter + 1] / lty[counter]) / Math.log10(ltx[counter + 1] / ltx[counter]);
  }

  static find_Xo(y, lty, ltx) {
    let counter = 0;
    let points = lty.length;
    for (counter = 0; counter < points-1; counter++) {
      if (y < lty[counter] && y > lty[counter + 1]) {
        break;
      }
    }
    if (y > lty[0]) {
      counter=0;
    }
    if (counter >= points-1) {
      counter = points-2;
    }
    return ltx[counter];
  }

  static find_Yo(y, lty) {
    let counter = 0;
    let points = lty.length;

    for (counter = 0; counter < points-1; counter++) {
      if (y < lty[counter] && y > lty[counter + 1]) {
        break;
      }
    } 
    if (y > lty[0]) {
      counter=0;
    }
    if (counter >= points-1) {
      counter = points-2;
    }
    return lty[counter];
  }
}

export default LogGraphFunctions;