#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <FirebaseArduino.h>

TinyGPSPlus gps;
SoftwareSerial ss(4, 5);

#include "Wlan.h";

Wlan wifi;

void setup()
{
  Serial.begin(9600);
  
  wifi.setup();
  ss.begin(9600);
}

void loop()
{
  while (ss.available() > 0) {
    if (gps.encode(ss.read())) {
      if (gps.location.isUpdated()) {
        Serial.println(gps.location.lat(), 6);
        Serial.println(gps.location.lng(), 6);
      }
    }
  }

  if (millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println(F("No GPS detected: check wiring."));
    while (true);
  }
}
