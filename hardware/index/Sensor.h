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
          postLatLng();
        }
      }

      if (millis() > 5000 && gps.charsProcessed() < 10) {
        Serial.println(F("No GPS detected."));
        while (true);
      }
    }

    void postLatLng()
    {
      String latitude = String(gps.location.lat(), 6);
      String longitude = String(gps.location.lng(), 6);

      if (gps.location.isValid()) {
        StaticJsonBuffer<200> jsonBuffer;
        JsonObject& obj = jsonBuffer.createObject();

        obj["lat"] = latitude;
        obj["lng"] = longitude;
        obj["status"] = true;

        Serial.println();
        obj.prettyPrintTo(Serial);

        Firebase.set("fire-geolocation", obj);

        if (Firebase.failed()) {
          Serial.println(Firebase.error());
        }
      }

      delay(2 * 5000);
    }
};

#endif
