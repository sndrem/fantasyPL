$(function() {


	

	google.charts.load('current', {packages: ['corechart', 'line']});
	google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {
		$.ajax({
			url: '/gameweeks/weeksPlayed',
			type: 'GET',
			dataType: 'json'
		})
		.done(function(data) {
			populateAveragePointsChart(data);
			populateHighestScoringEntry(data);
		})
		.fail(function() {
			console.error("Could not fetch gameweeks");
		})
		.always(function() {
		}); 
    }

function populateAveragePointsChart(response) {
	console.log(response);
	if(!response && response.length <= 0) {
		return;
	}

	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Runde');
	data.addColumn('number', 'Gj.Poeng');

	let rows = [];
	response.map(r => {
		rows.push([r.id, r.average_entry_score]);
	});


	data.addRows(rows);

	var options = {
	hAxis: {
	  title: 'Runde'
	},
	vAxis: {
	  title: 'Poeng'
	},
	title: "Gjennomsnittspoeng Fantasy Premier League",
	legend: { position: 'bottom' }
	};

	var chart = new google.visualization.LineChart(document.getElementById('gameWeekChart'));

	chart.draw(data, options);
}

function populateHighestScoringEntry(response) {
	if(!response && response.length <= 0) {
		return;
	}
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Runde');
	data.addColumn('number', 'Gj.Poeng');

	let rows = [];
	response.map(r => {
		rows.push([r.id, r.highest_score]);
	});

	data.addRows(rows);

	var options = {
	hAxis: {
	  title: 'Runde'
	},
	vAxis: {
	  title: 'Poeng'
	},
	title: "Høyest poeng per runde i Fantasy Premier League",
	legend: { position: 'bottom' }
	};

	var chart = new google.visualization.LineChart(document.getElementById('gameWeekTopPointsChart'));

	chart.draw(data, options);
}


});