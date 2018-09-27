#include<math.h>
//The number of points marked on the curves in data sheets
#define POINTS 9
//Variables Details
//Ro is the resistance of sensor in clean air(Run the following code in clean air for finding Ro and take the value of Resistance in the serial monitor)
//Rs is the resistance of the sensor when exposed to a perticular Gas
//R1 is the resistance of Resistor connected in series with sensor on the sensor module(Potentiometer connected between Sensor and ground, just find the resistance between the Vout( or Sig) pin and ground)
//The following code has lookup tables for LPG, to find the concentration of other gasses change the values in ltx and lty array




//Find and change Ro by Running the following code in clean air, and R1 using a multimeter
float Ro = 98800, Vref = 5.0, R1 = 7700;
// Change the following values for different gasses from the corresponding curves from datasheet
//The following valure are corresponding X and Y coordinate values for the marked points on curves

float ltx[POINTS] = {200, 500, 800, 1000, 1600, 2000, 3000, 5000, 10000};
float lty[POINTS] = {1.67, 1.11, 0.88, 0.78, 0.64, 0.56, 0.46, 0.36, 0.26};
//loop control variables
int counter1, counter2;
int temp;
int rawAnalogValue[100];      
void setup() {
  // Initializing serial port
  Serial.begin(9600);  
}
void loop() {
  float gasConcentration, Vs, Rs, slope, Y, Yo, Xo;
  // read 100 Values from analog Port and store it in raw array
  for(counter1=0; counter1<100; counter1++){
    rawAnalogValue[counter1]=analogRead(A0);      
  }
  //Find the median value
  //Sort the 100 values and find the median value
  for(counter1=0; counter1<100; counter1++){      
    for(counter2=0; counter2<100-counter1-1; counter2++){      
        if(rawAnalogValue[counter2]<rawAnalogValue[counter2+1]){
          temp=rawAnalogValue[counter2];      
          rawAnalogValue[counter2]=rawAnalogValue[counter2+1];      
          rawAnalogValue[counter2+1]=temp;      
        }
    }
  }
  //The middle value of the sorted values gives median
  Vs = Vref - rawAnalogValue[50] * Vref / 1024.0;
  Serial.print("Voltage: ");
  Serial.println(Vs);
  //Find Resistance of the sensor
  Rs = (R1 * Vs) / (Vref - Vs);
  Serial.print("Resistance: ");
  Serial.println(Rs);
  //Find the Rs/Ro Ratio
  Y = Rs / Ro;
  Serial.print("RS/RO: ");
  Serial.println(Y);
  Serial.print("Concentration: ");
  //Find the slope and Initial Values usiong the ratio
  slope = find_slope(Y);
  Xo = find_Xo(Y);
  Yo = find_Yo(Y);
  //Find the concentration and Limit the Output to MQ2's range
  gasConcentration = Xo * pow(Y / Yo, slope);
  if (gasConcentration > 10000.00) {
    gasConcentration = 10000.00;
  }
  else if (gasConcentration < 200.00) {
    gasConcentration = 200.00;
  }
  Serial.println(gasConcentration);
  delay(100);
}
float find_slope(float y) {
  for (counter1 = 0; counter1 < POINTS-1; counter1++) {
    if (y < lty[counter1] && y > lty[counter1 + 1]) {
      break;
    }
  }
  if (y > lty[0]) {
    counter1=0;
  }
  if (counter1 >= POINTS-1) {
    counter1 = POINTS-2;
  }
  return log(lty[counter1 + 1] / lty[counter1]) / log(ltx[counter1 + 1] / ltx[counter1]);
}
float find_Xo(float y) {
  for (counter1 = 0; counter1 < POINTS-1; counter1++) {
    if (y < lty[counter1] && y > lty[counter1 + 1]) {
      break;
    }
  }
  if (y > lty[0]) {
    counter1=0;
  }
  if (counter1 >= POINTS-1) {
    counter1 = POINTS-2;
  }
  return ltx[counter1];
}
float find_Yo(float y) {
  for (counter1 = 0; counter1 < POINTS-1; counter1++) {
    if (y < lty[counter1] && y > lty[counter1 + 1]) {
      break;
    }
  } 
  if (y > lty[0]) {
    counter1=0;
  }
  if (counter1 >= POINTS-1) {
    counter1 = POINTS-2;
  }
  return lty[counter1];
}

