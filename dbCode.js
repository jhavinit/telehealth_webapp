function videoCall(){
	var x= prompt("Whom Do You Want TO Call(Caller Id)");
	alert("please allow browser to access camera and mic!")
	window.location.replace("calling.html");
}
function messaging(){
	var y= prompt("Whom Do You Want TO Message (Caller Id)");
}

var userAgent = new SIP.UA({
    traceSip: true,
   // uri: '7020@192.168.54.112',
   // authorizationUser: '7020',
   // password: '1234',
   // wsServers: 'ws://192.168.54.112:5066',
   uri:'bob.111@sipjs.onsip.com',
    displayName: 'Bob'
});
var seesion1;

userAgent.on('invite', function(session) {
	session1=session;
alert("Incoming call from 7002 !");
var acceptCall=prompt("Type 'Y' to  accept and 'N' to reject");
if(acceptCall=='Y')
{	window.location.replace("accept.html");}
else
  { alert("call cancelled");
    var ch=prompt("wanna goto home page ? (Y,N)");
    if(ch==Y)
    	{window.location.replace("dashboard.html");}
  }
});
