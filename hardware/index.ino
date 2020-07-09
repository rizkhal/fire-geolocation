#include <TinyGPS++.h>
#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>

// ssid of the wifi
const char *ssid =  "MW40CJ_1DBE";
const char *pass =  "71749404";

// sensor of the flame
const int flame = D0;

// gps library
TinyGPSPlus gps;
SoftwareSerial ss(4, 5); // The serial connection to the GPS device
String latitude, longitude;
String Json_Data = "";

WiFiClient client;

void setup()
{
  Serial.begin(9600);
  connectWifi();
}

void connectWifi()
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

void getLatLong()
{
  Serial.print(F("Location: "));
  if (gps.location.isValid())
  {
    latitude = String(gps.location.lat(), 6);
    longitude = String(gps.location.lng(), 6);

    Serial.print(latitude);
    Serial.print(", ");
    Serial.print(longitude);
  }
  else
  {
    Serial.print(F("INVALID"));
  }
  Serial.println();

  delay(5000);
}

void loop()
{
  getLatLong();

  return 1;
}
