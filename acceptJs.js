var userAgent = new SIP.UA({
    traceSip: true,
   // uri: '7020@192.168.54.112',
   // authorizationUser: '7020',
   // password: '1234',
   // wsServers: 'ws://192.168.54.112:5066',
   uri:'bob.111@sipjs.onsip.com',
    displayName: 'Bob'
});

var session1;

userAgent.on('invite', function(session) {
  session1 = session;
  alert('Connected');
  session.accept();
});

var messageRender = document.getElementById("alice-message-display");

userAgent.on('message', function(msg){
	var msgTag = createMsgTag(msg.remoteIdentity.displayName, msg.body);
    messageRender.appendChild(msgTag);
});

function msg(){
	var text = document.getElementById("newMessage");
	userAgent.message("alice.123@sipjs.onsip.com", text.value);
	var msgTag = createMsgTag("Bob", text.value);
    messageRender.appendChild(msgTag);
    text.value = "";
    var pc = session1.sessionDescriptionHandler.peerConnection;
	// Gets remote tracks
	var remoteStream = new MediaStream();
	pc.getReceivers().forEach(function(receiver) {
	remoteStream.addTrack(receiver.track);
	});
	remoteVideo.srcObject = remoteStream;
	remoteVideo.play();

	// Gets local tracks
	var localStream = new MediaStream();
	pc.getSenders().forEach(function(sender) {
	localStream.addTrack(sender.track);
	});
	localVideo.srcObject = localStream;
	localVideo.play();
}

function createMsgTag(from, msgBody) {
    var msgTag = document.createElement('p');
    msgTag.className = 'message';
    // Create the "from" section
    var fromTag = document.createElement('span');
    fromTag.className = 'message-from';
    fromTag.appendChild(document.createTextNode(from + ':'));
    // Create the message body
    var msgBodyTag = document.createElement('span');
    msgBodyTag.className = 'message-body';
    msgBodyTag.appendChild(document.createTextNode(' ' + msgBody));
    // Put everything in the message tag
    msgTag.appendChild(fromTag);
    msgTag.appendChild(msgBodyTag);
    return msgTag;
}


/*function msg(session){
	var pc = session1.sessionDescriptionHandler.peerConnection;
	// Gets remote tracks
	var remoteStream = new MediaStream();
	pc.getReceivers().forEach(function(receiver) {
	remoteStream.addTrack(receiver.track);
	});
	remoteVideo.srcObject = remoteStream;
	remoteVideo.play();

	// Gets local tracks
	var localStream = new MediaStream();
	pc.getSenders().forEach(function(sender) {
	localStream.addTrack(sender.track);
	});
	localVideo.srcObject = localStream;
	localVideo.play();
}*/