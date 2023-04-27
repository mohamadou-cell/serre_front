#include <SPI.h> // SPI
#include <MFRC522.h> // RFID
#include "DHT.h"
#include <IRremote.h>
#include <Servo.h> 
#define DHTPIN 2
#define ventilateurPIN 5 // broche -> pour ventilateur
#define buzzerPIN 6 // broche -> pour buzzer
#define DHTTYPE DHT11

#define SS_PIN 10
#define RST_PIN 9
const int RELAY_PIN = A5;
int sensorPin = A1;
int sensorValue = 0;
    
// Déclaration 
MFRC522 rfid(SS_PIN, RST_PIN); 

// Tableau contentent l'ID
byte nuidPICC[4];
DHT dht(DHTPIN, DHTTYPE);
Servo monServo;
int sensorValue1;
int mini = 0; 
int maxi = 1023; 
int pourcentage;

void setup() 
{ 
  // Init RS232
  Serial.begin(9600);

  dht.begin();

  // Init SPI bus
  SPI.begin(); 

  // Init MFRC522 
  rfid.PCD_Init(); 

  pinMode(A0, INPUT);
  pinMode(ventilateurPIN,OUTPUT);
  pinMode(buzzerPIN,OUTPUT);
  monServo.attach(4);
  pinMode(RELAY_PIN, OUTPUT);
}
 
void loop() 
{
  
  //digitalWrite(buzzerPIN, HIGH);  // turn off pump 5 second
  sensorValue1 = analogRead(A0);
  sensorValue = analogRead(sensorPin);
  pourcentage = map(sensorValue, mini, maxi, 0, 100);
  int t = dht.readTemperature();
  int h = dht.readHumidity();
  Serial.print(t);
  Serial.print("/");
  Serial.print(h);
  Serial.print("/");
  Serial.print(sensorValue1);
  Serial.print("/");
  Serial.print(pourcentage);
    Serial.println("/");
  //delay(60);
  unsigned char inChar = (unsigned char)Serial.read();
  //Serial.println(inChar);
  //monServo.write(0);
  if( (inChar == '0') || (( h > 77 ) && ( h <= 80 ))){
    digitalWrite(ventilateurPIN, LOW);
  }
  else if(( inChar == '1') || ( h > 80 )) {
    digitalWrite(ventilateurPIN, HIGH);
  }
  else if((inChar == '2') || (sensorValue1 < 5)){
    monServo.write(45); 
  }
  else if(inChar == '3'){
    monServo.write(90); 
  }
  else if(inChar == '4'){
    monServo.write(180); 
  }
  else if(inChar == '5'){
    monServo.write(0); 
  }
  else if(inChar == '6'){
    digitalWrite(buzzerPIN, LOW); // turn on pump 5 seconds
  }
  else if((inChar == '7') || (sensorValue1 < 5)){
    digitalWrite(buzzerPIN, HIGH); // turn on pump 5 seconds
  }
  // Initialisé la boucle si aucun badge n'est présent 
  if ( !rfid.PICC_IsNewCardPresent())
    return;
    Serial.print("@");

  // Vérifier la présence d'un nouveau badge 
  if ( !rfid.PICC_ReadCardSerial())
    return;

  // Enregistrer l'ID du badge (4 octets) 
  for (byte i = 0; i < 4; i++) 
  {
    nuidPICC[i] = rfid.uid.uidByte[i];
  }
  

  for (byte i = 0; i < 4; i++) 
  {
    Serial.print(nuidPICC[i], HEX);
  }
  Serial.print("@");
  Serial.println();

  // Re-Init RFID
  rfid.PICC_HaltA(); // Halt PICC
  rfid.PCD_StopCrypto1(); // Stop encryption on PCD
}
