$( document ).ready(function() {
  
  /*global io*/
  let socket = io();
  
  socket.on('user', function(data){
    $('#num-users').text(data.currentUsers+' users online');
    let message = data.name;
    if(data.connected) {
      message += ' has joined the chat.';
    } else {
      message += ' has left the chat.';
    }
    $('#messages').append($('<li>').html('<b>'+ message +'<\/b>'));
  });
  
  socket.on('chat message', function(data){
    let message = data.name.concat(': ', data.message)
    $('#messages').append($('<li>').html(message));
  });
     
  // Form submittion with new message in field with id 'm'
  $('form').submit(function(){
    let messageToSend = $('#m').val();
    //send message to server here?
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
  
  
  
});
