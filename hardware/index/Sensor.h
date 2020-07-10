#ifndef Sensor_h
#define Sensor_h

#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <FirebaseArduino.h>

TinyGPSPlus gps;
SoftwareSerial ss(4, 5);

class Sensor
{
  public:
    void setup(int baud)
    {
      ss.begin(baud);
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
};

#endif
