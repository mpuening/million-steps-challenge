const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
		"Friday", "Saturday" ];

var createStepsTable = function(team, divId) {
	var stepsAccumlated = 0;
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
			var stepsPerDayAsNumber = parseInt(stepsPerDay + 0);
			var cls = "normal";
			if (stepsPerDayAsNumber == 0) {
				// still normal
			}
			else if (stepsAccumlated == 0) {
				cls = "start";
			}
			else if (Math.floor((stepsAccumlated + stepsPerDayAsNumber) / 1000000) > Math.floor(stepsAccumlated / 1000000)) {
				cls = "finish";
			}
			table += "<td class=\"" + cls + "\">" + stepsPerDay.toLocaleString() + "</td>";
			stepsAccumlated += stepsPerDayAsNumber;
		});
		table += "</tr>";
	});
	table += "</table>";
	$(divId).html(table);
};

var createWalkingStatsTable = function(team, divId) {
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
	table += "<caption>" + team.name + " Walking Stats</caption>";
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

var getDistance = function(team, route) {
	var distance = team.routes[route];
	if (!distance) {
		distance = parseFloat(route + 0);
	}
	return distance;
};

var createRunningTable = function(team, divId) {
	var distanceAccumlated = 0;
	var table = "<table class='datatable'>";
	table += "<caption>" + team.name + " Running</caption>";
	table += "<tr>";
	table += "<th></th>";
	$.each(days, function(i, day) {
		table += "<th>" + day + "</th>";
	});
	table += "</tr>";
	$.each(team.distance, function(i, week) {
		table += "<tr>";
		table += "<td style='text-align: left;'>Week " + (i + 1) + "</td>";
		$.each(days, function(j, day) {
			var distancePerDay = (week[day] != undefined) ? week[day] : "";
			var distancePerDayAsNumber = getDistance(team, distancePerDay);
			var cls = "normal";
			if (distancePerDayAsNumber == 0) {
				// still normal
			}
			else if (distanceAccumlated == 0) {
				cls = "start";
			}
			else if (Math.floor((distanceAccumlated + distancePerDayAsNumber) / 100) > Math.floor(distanceAccumlated / 100)) {
				cls = "finish";
			}
			table += "<td class=\"" + cls + "\">" + distancePerDay.toLocaleString() + "</td>";
			distanceAccumlated += distancePerDayAsNumber;
		});
		table += "</tr>";
	});
	table += "</table>";
	$(divId).html(table);
};

var createRunningStatsTable = function(team, divId) {
	var daysRan = 0;
	var totalDistance = 0;
	var daysRemaining = 0;
	$.each(team.distance, function(i, week) {
		$.each(days, function(j, day) {
			var distancePerDay = week[day];
			daysRan += (distancePerDay != undefined) ? 1 : 0;
			if (distancePerDay) {
				var distancePerDayAsNumber = getDistance(team, distancePerDay);
				totalDistance += distancePerDayAsNumber;
				// Reset days remaining
				daysRemaining = 0;
			}
			else {
				daysRemaining++;
			}
		});
	});
	var distanceGoal = team.distanceGoal;
	var remainingDistance = distanceGoal - totalDistance;
	var daysInChallenge = team.daysInChallenge;
	var weeklyAvg = totalDistance / (Math.max(daysInChallenge - daysRemaining, 1)) * 7;
	var remaingWeeklyAvg = (remainingDistance > 0) ? (distanceGoal - totalDistance) / (Math.max(daysRemaining , 0.001)) * 7 : 0;
	var table = "<table class='datatable'>";
	table += "<caption>" + team.name + " Running Stats</caption>";
	table += "<tr>";
	table += "<th>Days Ran</th>";
	table += "<th>Days Remaining</th>";
	table += "<th>Total Distance</th>";
	table += "<th>Remaining Distance</th>";
	table += "<th>Weekly Avg</th>";
	table += "<th>Remaining Wkly Avg</th>";
	table += "</tr>";
	table += "<tr>";
	table += "<td>" + daysRan.toLocaleString() + "</td>";
	table += "<td>" + daysRemaining.toLocaleString() + "</td>";
	table += "<td>" + totalDistance.toLocaleString() + "</td>";
	table += "<td>" + remainingDistance.toLocaleString() + "</td>";
	table += "<td>" + weeklyAvg.toLocaleString() + "</td>";
	table += "<td>" + remaingWeeklyAvg.toLocaleString() + "</td>";
	table += "</tr>";
	table += "</table>";
	$(divId).html(table);
};
