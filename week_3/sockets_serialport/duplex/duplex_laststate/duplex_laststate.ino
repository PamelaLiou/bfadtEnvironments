int switchState =0;
int lastSwitchState=0;
int ledPin = 12;
int switchPin = 3;

void setup() {

  Serial.begin(9600);

  pinMode(ledPin, OUTPUT);
  pinMode(switchPin, INPUT);



}

void loop() {

  switchState = digitalRead(switchPin);

  //Serial.println(switchState);

  if (switchState != lastSwitchState) {
    if (switchState) {
      Serial.print("on");//print the state to serial
      Serial.print("b");
    } else {
      Serial.print("off");
      Serial.print("b");
    }
  }

  lastSwitchState = switchState;

  delay(2);

  if (Serial.available()) {




    char inByte = Serial.read();

    // mousedown event
    if (inByte == '1') {


      digitalWrite(ledPin, HIGH);

    }

    // mouseup event
    else if (inByte == '0') {

      // send the color to the browser, then turn the LED off

      digitalWrite(ledPin, LOW);


    }
  }
  delay(2);



}
