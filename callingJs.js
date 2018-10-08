var userAgent = new SIP.UA({
    traceSip: true,
    //uri: '7015@192.168.54.112',
    //authorizationUser: '7015',
    //password: '1234',
    //wsServers: 'ws://192.168.54.112:5066',
   uri: 'alice.123@sipjs.onsip.com',
   displayName: 'Alice'
});

var session = userAgent.invite('bob.111@sipjs.onsip.com');

var remoteVideo = document.getElementById('remoteVideo');
var localVideo = document.getElementById('localVideo');

var messageRender = document.getElementById("alice-message-display");

userAgent.on('message', function(msg){
	var msgTag = createMsgTag(msg.remoteIdentity.displayName, msg.body);
    messageRender.appendChild(msgTag);
});

function message(){
	var text = document.getElementById("newMessage");
	userAgent.message("bob.111@sipjs.onsip.com", text.value);
	var msgTag = createMsgTag("Alice", text.value);
    messageRender.appendChild(msgTag);
    text.value = "";
    var pc = session.sessionDescriptionHandler.peerConnection;

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

/*function message(){
    userAgent.message("bob.111@sipjs.onsip.com", "Hello Bryan!");
    var pc = session.sessionDescriptionHandler.peerConnection;

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