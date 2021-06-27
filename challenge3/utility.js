function Team(team) {
	this.team = team;
	this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
}

Team.prototype.applyStepsTableToDiv = function(divId) {
	var days = this.days;
	var stepsAccumlated = 0;
	var table = "<table class='datatable'>";
	table += "<caption>" + this.team.name + " Steps</caption>";
	table += "<tr>";
	table += "<th></th>";
	$.each(days, function(_, day) {
		table += "<th>" + day + "</th>";
	});
	table += "</tr>";
	$.each(this.team.steps, function(w, week) {
		table += "<tr>";
		table += "<td style='text-align: left;'>Week " + (w + 1) + "</td>";
		$.each(days, function(_, day) {
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
	return this;
}

Team.prototype.applyWalkingStatsTableToDiv = function(divId) {
	var days = this.days;
	var daysWalked = 0;
	var totalSteps = 0;
	var remainingSteps = this.team.stepsGoal;
	var dailyAvg = 0;
	var remainingAvg = 0;
	$.each(this.team.steps, function(_, week) {
		$.each(days, function(_, day) {
			var stepsPerDay = week[day];
			daysWalked += (stepsPerDay != undefined) ? 1 : 0;
			totalSteps += stepsPerDay || 0;
		});
	});
	var daysRemaining = this.team.daysInChallenge - daysWalked;
	remainingSteps = this.team.stepsGoal - totalSteps;
	dailyAvg = daysWalked ? Math.round(totalSteps / daysWalked) : 0;
	remainingAvg = (daysWalked < this.team.daysInChallenge) ? Math.round((remainingSteps) / (daysRemaining)) : 0;
	var table = "<table class='datatable'>";
	table += "<caption>" + this.team.name + " Walking Stats</caption>";
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
	return this;
}

Team.prototype.applyStepsGraphToDiv = function(divId) {
	// labels: week numbers
	//var labels = [...Array(this.team.daysInChallenge/7).keys()].map(i => i + 1);
	var labels = Array.apply(null, Array(this.team.daysInChallenge/7)).map(function (_, i) {return i + 1;});

	//var stepGoalSeries = [...Array(this.team.daysInChallenge/7).keys()].map(i => this.team.stepsGoal);
	var stepsGoal = this.team.stepsGoal;
	var stepGoalSeries = Array.apply(null, Array(this.team.daysInChallenge/7)).map(function (_, _) {return stepsGoal;});
	var stepSeries = [];

	var days = this.days;
	var totalSteps = 0;
	$.each(this.team.steps, function(_, week) {
		var hasDataForWeek = false;
		$.each(days, function(_, day) {
			var stepsPerDay = week[day];
			if (stepsPerDay) {
				totalSteps += stepsPerDay || 0;
				hasDataForWeek = true;
			}
		});
		if (hasDataForWeek) {
			stepSeries.push(totalSteps);
		}
	});
	
	new Chartist.Line(divId, {
		labels: labels,
		series: [
			stepGoalSeries, stepSeries 
		]
	}, {
		fullWidth: false,
		chartPadding: {
			left: 20,
			right: 100
		}
	});
	return this;
}

Team.prototype.applyWalkingAverageGraphToDiv = function(divId) {
	// labels: week numbers
	//var labels = [...Array(this.team.daysInChallenge/7).keys()].map(i => i + 1);
	var labels = Array.apply(null, Array(this.team.daysInChallenge/7)).map(function (_, i) {return i + 1;});

	//var avgGoalSeries = [...Array(this.team.daysInChallenge/7).keys()].map(i => 0);
	var avgGoalSeries = Array.apply(null, Array(this.team.daysInChallenge/7)).map(function (_, _) {return 0;});
	var dailyRemainingAvgSeries = [];

	var days = this.days;
	var stepsGoal = this.team.stepsGoal;
	var daysInChallenge = this.team.daysInChallenge;
	var totalSteps = 0;
	var daysWalked = 0;
	$.each(this.team.steps, function(_, week) {
		var hasDataForWeek = false;
		$.each(days, function(_, day) {
			var stepsPerDay = week[day];
			daysWalked += (stepsPerDay != undefined) ? 1 : 0;
			if (stepsPerDay) {
				totalSteps += stepsPerDay || 0;
				hasDataForWeek = true;
			}
		});
		var remaining = stepsGoal - totalSteps;
		if (hasDataForWeek && remaining > 0) {
			dailyRemainingAvgSeries.push(remaining / (daysInChallenge - daysWalked));
		}
	});
	
	new Chartist.Line(divId, {
		labels: labels,
		series: [
			avgGoalSeries, dailyRemainingAvgSeries
		]
	}, {
		fullWidth: false,
		chartPadding: {
			left: 20,
			right: 100
		}
	});
	return this;
}

Team.prototype.getDistance = function(delimitedRoutes) {
	var self = this;
	var routes = (delimitedRoutes + '').split('+');
	var totalDistance = 0.0;
	routes.forEach(function (route) {
		var distance = self.team.routes[route];
		if (!distance) {
			distance = parseFloat(route);
	    }
		totalDistance += distance;
	});
	if (isNaN(totalDistance)) {
		totalDistance = 0;
	}
	return totalDistance;
};

Team.prototype.applyRunningTableToDiv = function(divId) {
	var self = this;
	var days = this.days;
	var distanceAccumlated = 0;
	var table = "<table class='datatable'>";
	table += "<caption>" + this.team.name + " Running</caption>";
	table += "<tr>";
	table += "<th></th>";
	$.each(days, function(_, day) {
		table += "<th>" + day + "</th>";
	});
	table += "</tr>";
	$.each(this.team.distance, function(w, week) {
		table += "<tr>";
		table += "<td style='text-align: left;'>Week " + (w + 1) + "</td>";
		$.each(days, function(_, day) {
			var distancePerDay = (week[day] != undefined) ? week[day] : "";
			var distancePerDayAsNumber = self.getDistance.call(self, distancePerDay);
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
	return this;
};
	
Team.prototype.applyRunningStatsTableToDiv = function(divId) {
	var self = this;
	var days = this.days;
	var daysRan = 0;
	var totalDistance = 0;
	var daysRemaining = 0;
	$.each(this.team.distance, function(_, week) {
		$.each(days, function(_, day) {
			var distancePerDay = week[day];
			daysRan += (distancePerDay != undefined) ? 1 : 0;
			if (distancePerDay) {
				var distancePerDayAsNumber = self.getDistance.call(self, distancePerDay);
				totalDistance += distancePerDayAsNumber;
				// Reset days remaining
				daysRemaining = 0;
			}
			else {
				daysRemaining++;
			}
		});
	});
	var distanceGoal = this.team.distanceGoal;
	var remainingDistance = distanceGoal - totalDistance;
	var daysInChallenge = this.team.daysInChallenge;
	var weeklyAvg = totalDistance / (Math.max(daysInChallenge - daysRemaining, 1)) * 7;
	var remainingWeeklyAvg = (remainingDistance > 0) ? (distanceGoal - totalDistance) / (Math.max(daysRemaining , 0.001)) * 7 : 0;
	var table = "<table class='datatable'>";
	table += "<caption>" + this.team.name + " Running Stats</caption>";
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
	table += "<td>" + remainingWeeklyAvg.toLocaleString() + "</td>";
	table += "</tr>";
	table += "</table>";
	$(divId).html(table);
	return this;
};

Team.prototype.applyRunningGraphToDiv = function(divId) {
	// labels: week numbers
	//var labels = [...Array(this.team.daysInChallenge/7).keys()].map(i => i + 1);
	var labels = Array.apply(null, Array(this.team.daysInChallenge/7)).map(function (_, i) {return i + 1;});

	//var runningGoalSeries = [...Array(this.team.daysInChallenge/7).keys()].map(i => this.team.distanceGoal);
	var distanceGoal = this.team.distanceGoal;
	var runningGoalSeries = Array.apply(null, Array(this.team.daysInChallenge/7)).map(function (_, _) {return distanceGoal;});
	var runningSeries = [];

	var self = this;
	var days = this.days;
	var totalDistance = 0;
	$.each(this.team.distance, function(_, week) {
		var hasDataForWeek = false;
		$.each(days, function(_, day) {
			var distancePerDay = (week[day] != undefined) ? week[day] : "";
			var distancePerDayAsNumber = self.getDistance.call(self, distancePerDay);
			if (distancePerDayAsNumber > 0) {
				totalDistance += distancePerDayAsNumber || 0;
				hasDataForWeek = true;
			}
		});
		if (hasDataForWeek) {
			runningSeries.push(totalDistance);
		}
	});
	
	new Chartist.Line(divId, {
		labels: labels,
		series: [
			runningGoalSeries, runningSeries 
		]
	}, {
		fullWidth: false,
		chartPadding: {
			left: 0,
			right: 100
		}
	});
	return this;
}

Team.prototype.applyRunningAverageGraphToDiv = function(divId) {
	// labels: week numbers
	//var labels = [...Array(this.team.daysInChallenge/7).keys()].map(i => i + 1);
	var labels = Array.apply(null, Array(this.team.daysInChallenge/7)).map(function (_, i) {return i + 1;});

	//var avgGoalSeries = [...Array(this.team.daysInChallenge/7).keys()].map(i => 0);
	var avgGoalSeries = Array.apply(null, Array(this.team.daysInChallenge/7)).map(function (_, _) {return 0;});
	var weeklyRemainingAvgSeries = [];

	var self = this;
	var days = this.days;
	var totalDistance = 0;
	$.each(this.team.distance, function(w, week) {
		var hasDataForWeek = false;
		$.each(days, function(_, day) {
			var distancePerDay = week[day];
			if (distancePerDay) {
				var distancePerDayAsNumber = self.getDistance.call(self, distancePerDay);
				totalDistance += distancePerDayAsNumber;
				hasDataForWeek = true;
			}
		});
		var distanceGoal = self.team.distanceGoal;
		var remainingDistance = distanceGoal - totalDistance;
		var daysRemaining = self.team.daysInChallenge - ((w+1)*7);
		var remainingWeeklyAvg = (remainingDistance > 0) ? (distanceGoal - totalDistance) / (Math.max(daysRemaining , 0.001)) * 7 : 0;
		if (hasDataForWeek && remainingWeeklyAvg > 0) {
			weeklyRemainingAvgSeries.push(remainingWeeklyAvg);
		}
	});

	new Chartist.Line(divId, {
		labels: labels,
		series: [
			avgGoalSeries, weeklyRemainingAvgSeries
		]
	}, {
		fullWidth: false,
		chartPadding: {
			left: 0,
			right: 100
		}
	});
	return this;
}
