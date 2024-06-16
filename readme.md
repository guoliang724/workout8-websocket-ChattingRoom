### introduciton
This project includes both client and server. 
yarn start: start the server
yarn start: start the client

### chatting room
- joining room notification
- leaving room notification
- real-time chatting
- chatting history

### show case
![client/public/chatting example.gif](<client/public/chatting example.gif>)

### server to trigger and client to listen on
| Event Name |  Trigger |  Message |  Message instance | 
| - | - | - | -|
| $updateUser |1. new user join 2.old user leave 3.self join    | real-time users array | ["Jesse","Elly"] |
|$name| self join| user name| "Jesse"|
|$history|self join| chat history|[{name: "Jesse",content:"hello",data:163546476732}]|
|$message|other messages| message object| {name: "Jesse",content:"hello",data:163546476732}| 

### client to trigger and server to listen on
| Event Name |  Trigger |  Message |  Message instance | 
| - | - | - | -|
| $message | sent the message    | message string | "hello" |