const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday", "Saturday" ];

var createStepsTable = function(team, divId) {
	var table = "<table class='datatable'>";
	table += "<caption>" + team.name + " Steps</caption>";
	table += "<tr>";
	table += "<th></th>";
	$.each(days, function(i, day) {
		table += "<th>" + day + "</th>";
	});
	table += "</tr>";
	$.each(team.steps, function(i, week) {
		table += "<tr>";
		table += "<td style='text-align: left;'>Week " + (i + 1) + "</td>";
		$.each(days, function(j, day) {
			var stepsPerDay = (week[day] != undefined) ? week[day] : "";
			table += "<td>" + stepsPerDay.toLocaleString() + "</td>";
		});
		table += "</tr>";
	});
	table += "</table>";
	$(divId).html(table);
};

var createStatsTable = function(team, divId) {
	var daysWalked = 0;
	var totalSteps = 0;
	var remainingSteps = team.stepsGoal;
	var dailyAvg = 0;
	var remainingAvg = 0;
	$.each(team.steps, function(i, week) {
		$.each(days, function(j, day) {
			var stepsPerDay = week[day];
			daysWalked += (stepsPerDay != undefined) ? 1 : 0;
			totalSteps += stepsPerDay || 0;
		});
	});
	daysRemaining = team.daysInChallenge - daysWalked;
	remainingSteps = team.stepsGoal - totalSteps;
	dailyAvg = daysWalked ? Math.round(totalSteps / daysWalked) : 0;
	remainingAvg = (daysWalked < team.daysInChallenge) ? Math.round((remainingSteps) / (daysRemaining)) : 0;
	var table = "<table class='datatable'>";
	table += "<caption>" + team.name + " Stats</caption>";
	table += "<tr>";
	table += "<th>Days Walked</th>";
	table += "<th>Days Remaining</th>";
	table += "<th>Total Steps</th>";
	table += "<th>Remaining Steps</th>";
	table += "<th>Daily Avg</th>";
	table += "<th>Remaining Daily Avg</th>";
	table += "</tr>";
	table += "<tr>";
	table += "<td>" + daysWalked.toLocaleString() + "</td>";
	table += "<td>" + daysRemaining.toLocaleString() + "</td>";
	table += "<td>" + totalSteps.toLocaleString() + "</td>";
	table += "<td>" + remainingSteps.toLocaleString() + "</td>";
	table += "<td>" + dailyAvg.toLocaleString() + "</td>";
	table += "<td>" + remainingAvg.toLocaleString() + "</td>";
	table += "</tr>";
	table += "</table>";
	$(divId).html(table);
};