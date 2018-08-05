//permisos sudo chmod a+rw /dev/ttyUSB0


void setup() {
  Serial.begin(19200);
}

void loop() {
  Serial.println(millis());
  delay(1000);
}


void setup() {
  Serial.begin(19200);
  pinMode(12,INPUT_PULLUP);
}

void loop() {
  int button = digitalRead(12);
  if(button==false){
    Serial.println("cambio");
  }
  delay(1000);
}