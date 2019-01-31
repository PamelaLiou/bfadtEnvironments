int switchState = 0;
int lastSwitchState=0;

void setup() {
  
  Serial.begin(9600);
  
  pinMode(12,OUTPUT); // declare toggle switch
  
}

void loop() {
  if(Serial.available()){
    
    char inByte = Serial.read();
    
    // mousedown event
    if(inByte=='1'){
      
    
      digitalWrite(12, HIGH);

    }
    
    // mouseup event
    else if(inByte=='0'){
      
      // send the color to the browser, then turn the LED off
  
      digitalWrite(12, LOW);


    }
  }
}
