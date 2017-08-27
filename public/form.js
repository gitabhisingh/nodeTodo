var err_found = 0;

function validate() {
	todo = $('#todo').val();
	isDone = $('#isDone').val();
	hasAtt = $('#hasAtt').val();

	/*regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	regexUC = new RegExp('[A-Z]');
	regexLC = new RegExp('[a-z]');
	regexNum = new RegExp('[0-9]');*/

	$('.errMsg').removeClass('show');
	err_found = 0;

	if (!todo) {
		printErrors('.errMsg.errtodo', 'Todo Field cannot be left blank.');
	}
	if (!isDone) {
		printErrors('.errMsg.errisDone', 'Is Done Field cannot be left blank.');
	}
	if (!hasAtt) {
		printErrors('.errMsg.errhasAtt', 'Has Attachment field cannot be left blank.');
	}
	
	/*if (!email) {
		printErrors('.errMsg.erremail', 'EMail field cannot be left blank.');
	} else if(!regexEmail.test(email)){
		printErrors('.errMsg.erremail', 'Enter a valid email address.');
	}
	if(!pass){
		printErrors('.errMsg.errpass', 'Password field cannot be left blank.');
	} else{
		if(pass.length < 5){
			printErrors('.errMsg.errpass', 'Password must be atleast 5 characters long.');
		} else if(pass.match(regexUC) === null || pass.match(regexLC) === null || pass.match(regexNum) === null){
			printErrors('.errMsg.errpass', 'Password must contain alphanumeric with at least 1 uppercase and lowercase letter');
		}	
	}
	if(!rpass){
		printErrors('.errMsg.errrpass', 'Repeat Password field cannot be left blank.');
	} else if(pass != rpass){
		printErrors('.errMsg.errrpass', 'Password and Repeat Password field do not match.');
	}*/

	if (!err_found) {
		return 1;	// Validation successful
	} else {
		return 0;	// Validation failed
	}
}

function printErrors(ele, msg) {
	$(ele).text(msg).addClass('show');
	err_found = 1;
}

function fetchRecords(){
	$.ajax({
		url: 'api/todos/test',
		dataType: 'json',
		success: function(data){
			var str = '<span>User Entered following Details!</span>';
			str +=  '<table>'
				+	'	<tr>'
				+	'		<th>ID</th>'		
				+	'		<th>User Name</th>'
				+	'		<th>Todo Task</th>'
				+	'		<th>Is Done</th>'
				+	'		<th>Has Attachment</th>'
				+	'	</tr>';
			$.each(data, function (i, v) {
				str	+=	'<tr>'
					+	'	<td>' + v._id + '</td>'
					+	'	<td>' + v.username + '</td>'
					+	'	<td>' + v.todo + '</td>'
					+	'	<td>' + v.isDone + '</td>'
					+	'	<td>' + v.hasAttachment + '</td>'
					+	'</tr>';
			});
			str += '</table>';
			$('#response').html(str);
		}
	});
}

$(document).ready(function(){
	fetchRecords();
	$('#submitForm').submit(function(e){

		e.preventDefault();
		
		if(validate()){
			$.ajax({
				url: '/api/todo',
				data: {
					todo: $('#todo').val(),
					isDone: $('#isDone').val().toLowerCase() == 'false' ? false : true,
					hasAttachment: $('#hasAtt').val().toLowerCase() == 'false' ? false : true
				},
				dataType: 'json',
				method: 'POST',
				async: false,
				success: function(data){
					console.log(data);
					//$('#submitForm input').val('');
				}
			});
			fetchRecords();
		}
	});
});