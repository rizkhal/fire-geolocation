#ifndef Sensor_h
#define Sensor_h

#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <FirebaseArduino.h>

TinyGPSPlus gps;
SoftwareSerial ss(4, 5);

const int flame = D0;

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
      if (gps.location.isValid()) {
        StaticJsonBuffer<200> jsonBuffer;
        JsonObject& obj = jsonBuffer.createObject();

        obj["lat"] = String(gps.location.lat(), 6);
        obj["lng"] = String(gps.location.lng(), 6);

        bool fire = digitalRead(flame);

        if (fire) {
          obj["status"] = true;
          Firebase.set("fire-geolocation", obj);
          delay(5000);
        } else {
          obj["status"] = false;
          Firebase.set("fire-geolocation", obj);
          delay(5000);
        }

        if (Firebase.failed()) {
          Serial.println(Firebase.error());
        }

        Serial.println();
        obj.prettyPrintTo(Serial);
      }
      

      delay(1000);
    }
};

#endif
