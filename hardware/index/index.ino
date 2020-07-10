#include "Wlan.h";
#include "Sensor.h";

Wlan wifi;
Sensor sensors;

void setup()
{
  Serial.begin(9600);  
  sensors.setup(9600);
  
  if(gps.location.isValid()) {
    wifi.setup();
  }
}

void loop()
{
  sensors.loop();
}
