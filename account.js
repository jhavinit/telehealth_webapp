var x=[7001,7002,7003,7004,7005,7006,7007,7008,7009];
function getUserName(){
	for(var i=0;i<8;i++)
	{
		if(x[i]==" ")
		{
			i++;
		}
		var value=x[i];
		document.getElementById('callerIdPlace').innerHTML=x[i];
		x[i]=" ";

	} 

}