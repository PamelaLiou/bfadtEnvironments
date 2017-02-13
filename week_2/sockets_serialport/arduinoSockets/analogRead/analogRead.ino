//Reading Analog Values
//Sending data to browser
const int potValue = A0;  //

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.println(analogRead(potValue));
  delay(2);

}
