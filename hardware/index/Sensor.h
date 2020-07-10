#ifndef Sensor_h
#define Sensor_h

#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <FirebaseArduino.h>

TinyGPSPlus gps;
SoftwareSerial ss(4, 5);

class Sensor
{
  private:
    String latitude;
    String longitude;
    char *host = "https://skripsinaicank.firebaseio.com/";
    char *auth = "PRkyaIvLUNn0M6xqenvxFdXX6mFCgQM3Q7gXHU10";

  public:
    void setup(int baud)
    {
      ss.begin(baud);
      Firebase.begin(host, auth);
    }

    void loop()
    {
      while (ss.available() > 0) {
        if (gps.encode(ss.read())) {
          if (gps.location.isUpdated()) {
            latitude = String(gps.location.lat(), 6);
            longitude = String(gps.location.lng(), 6);
          }
        }
      }

      if (millis() > 5000 && gps.charsProcessed() < 10) {
        Serial.println(F("No GPS detected."));
        while (true);
      }

      if (gps.location.isValid()) {
        Serial.print("Latitude: "); Serial.println(latitude);
        Serial.print("Longitude: "); Serial.println(longitude);
        
        Firebase.pushString("lat", latitude);
        Firebase.pushString("lng", longitude);
        Firebase.pushBool("status", true);
      }

      if (Firebase.failed()) {
        Serial.print("pushing /logs failed:");
        Serial.println(Firebase.error());
        return;
      }

      delay(1000);
    }
};

#endif
