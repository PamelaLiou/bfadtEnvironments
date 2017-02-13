int switchState = 0;
int lastSwitchState=0;

void setup() {
  
  Serial.begin(9600);
  
  pinMode(2,INPUT); // declare toggle switch
  
}

void loop() {

    switchState = digitalRead(2);// current state set
     //if (lastSwitchState != switchState ){ //if the state has changed
        Serial.println(switchState); //print the state to serial
       // lastSwitchState = switchState; // update lastSwitchState
//     }
}
