// Adapted from Andy Sigler's Node 
//https://github.com/websockets/ws  



//our global color variables
int r = 0;
int g = 0;
int b = 0;
int switchState = 0;

// use Serial when using laptop
// use Serial1 when using YUN

void setup() {
  
  Serial.begin(9600);
  
  pinMode(13,OUTPUT); // red pin
  pinMode(2,INPUT); // green pin
  
 
 // digitalWrite(4,LOW); // ground for our LED
}

void loop() {

   switchState = digitalRead(2);
   Serial.println(switchState);

//  if(Serial.available()){
//    
//    char inByte = Serial.read();
//    
//    // mousedown event
//    if(inByte=='1'){
//      
//      // make a new color, and turn the LED on
//      r = random(255);
//      g = random(255);
//      b = random(255);
//      
//      digitalWrite(13, HIGH);
//      
//
//    }
//    
//    // mouseup event
//    else if(inByte=='0'){
//      
//      // send the color to the browser, then turn the LED off
//      switchState = digitalRead(2);
//      Serial.println(switchState);
//
//      if (switchState== HIGH){
//      Serial.print(r);
//      Serial.print(',');
//      Serial.print(g);
//      Serial.print(',');
//      Serial.println(b);
//      }
//      
//      digitalWrite(13, LOW);
//
//
//    }
//  }
}
