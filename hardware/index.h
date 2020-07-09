#include <TinyGPS++.h>
#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>

class Wifi {
  private:
    char *ssid =  "MW40CJ_1DBE";
    char *pass =  "71749404";

  public:
    void setup()
    {
      Serial.println("Connecting...");

      WiFi.begin(ssid, pass);
      while (WiFi.status() != WL_CONNECTED)
      {
        delay(500);
        Serial.println("Trying to connect...");
      }

      Serial.println(WiFi.localIP());
      Serial.println("WiFi connected");
    }
}

Wifi wifi;

void setup()
{
  Serial.begin(9600);
  wifi.setup();
}

void loop()
{
  //
}
