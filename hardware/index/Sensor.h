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
    char *host = "skripsinaicank.firebaseio.com";
    char *auth = "0DRWE27ehyBPpA16HyeBjbSvmOoY5mjoZTAhXZKC";

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
    }

    void action()
    {
      if (gps.location.isValid()) {
        StaticJsonBuffer<200> jsonBuffer;
        JsonObject& obj = jsonBuffer.createObject();

        obj["lat"] = latitude;
        obj["lng"] = longitude;
        obj["status"] = true;

        Serial.println();
        obj.prettyPrintTo(Serial);
      }
    }
};

#endif
