//Reading Analog Values
//Sending data to browser
const int potValue = A0;  //

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.print(analogRead(potValue));
  Serial.print("b");
  delay(100);

}
