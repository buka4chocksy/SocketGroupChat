var socket = io.connect( window.location.hostname == "localhost" ? "http://localhost:8080/groupChat"
 : "https://lawyerppapi.herokuapp.com/groupChat");

 var message = document.getElementById("message"),
     userId = document.getElementById("userId"),
     btn = document.getElementById("send"),
     onl = document.getElementById("onl");
     roomId = document.getElementById("roomId");
     exitbtn = document.getElementById("disconnectBtn");


     btn.addEventListener('click', function(){
         socket.emit("sendMessage", {userId:userId.value  , message:message.value ,
         "roomId":roomId.value , chattime:new  Date()})
        output.innerHTML += "<p><strong>Me:</strong>" + message.value + "</p>";
        message.value  = "";
     });

     exitbtn.addEventListener('click', function(){
        socket.emit('disconn' , userId.value); 
     })

    onl.addEventListener('click', function(){
        socket.emit('online' , ({"userId":userId.value, "roomId":roomId.value}));
    });

    message.addEventListener('keypress', function(){
        socket.emit('typing', { sender:userId.value , "roomId":roomId.value})
    });

    socket.on('disconnect', function(data){
        feedback.innerHTML =  "<p><em>" + data + " left the room </em></p>";

    })


    socket.on('previousChat', function(data){
        console.log(data , 'lolllllll')
        const output = data
        const mapOutput = output.map(a => a.chats)
        feedback.innerHTML = "";
        output.innerHTML += "<p><strong>" + data.userId + "</strong>" + data.message + "</p>";
    });

    socket.on('messages', function(data){
        console.log(data , 'dhdhddjdkfkfg')
    
        output.innerHTML += "<p><strong>" + data.userName + "</strong>" + data.message +"</strong></p>";
    });

    socket.on('online', function(data){
        console.log("online indicated-----",  data.userName)
        feedback.innerHTML =  "<p><em>" +data.userName + " Joined the chat</em></p>";
    })

    socket.on("newuser", function(data){
        feedback.innerHTML =  "<p><em>" + data + " is online</em></p>";

    })
    socket.on('typings' , function(data){
        feedback.innerHTML =  "<p><em>" + data.userName + " is typing a message</em></p>";
    });

    feedback.addEventListener('mouseout', function(){
        feedback.innerHTML = "";
    });