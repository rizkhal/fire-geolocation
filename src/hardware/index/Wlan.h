#ifndef Wlan_h
#define Wlan_h
#include <ESP8266WiFi.h>

 #define SSID "tidak free"
 #define PASS "sarcesua"

// #define SSID "MW40CJ_1DBE"
// #define PASS "71749404"

class Wlan
{
  public:
    void setup()
    {
      Serial.println("Connecting...");

      WiFi.begin(SSID, PASS);
      while (WiFi.status() != WL_CONNECTED)
      {
        delay(500);
        Serial.println("Trying to connect...");
      }

      Serial.println(WiFi.localIP());
      Serial.println("WiFi connected.");
    }
};

#endif
