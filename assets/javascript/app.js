var data;

var config = {
apiKey: "AIzaSyDFQDe1zn9KgQ0Q_yvDUvG9MX_443-i5Kw",
authDomain: "train-scheduler-74e8e.firebaseapp.com",
databaseURL: "https://train-scheduler-74e8e.firebaseio.com",
storageBucket: "train-scheduler-74e8e.appspot.com",
messagingSenderId: "44817135072"
};
firebase.initializeApp(config);

database = firebase.database();

database.ref().on("child_added", function(snapshot) {
  var newTrain = snapshot.val();
  var diffTime = moment().diff(moment(newTrain.firstTrain, "hh:mm"), "minutes");
  var tRemainder = diffTime % newTrain.frequency;
  var tMinutesTillTrain = newTrain.frequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");


$('#table').append("<tr><td>" + newTrain.name + "</td><td>" + newTrain.destination + "</td><td>" + newTrain.frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

$("#submitButton").on("click", function(event) {
	event.preventDefault();

	var name = $("#trainName").val().trim();
	var destination = $("#trainDestination").val().trim();
	var first = $("#firstTrain").val().trim();
	var frequency = $("#trainFrequency").val().trim();

	database.ref().push( {
	name: name,
	destination: destination,
	firstTrain: first,
	frequency: frequency
	});
});



