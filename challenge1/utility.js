class Team {

	constructor(team) {
		this.team = team;
		this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	}

	applyStepsTableToDiv(divId) {
		const days = this.days;
		var stepsAccumlated = 0;
		var table = "<table class='datatable'>";
		table += "<caption>" + this.team.name + " Steps</caption>";
		table += "<tr>";
		table += "<th></th>";
		$.each(days, function(d, day) {
			table += "<th>" + day + "</th>";
		});
		table += "</tr>";
		$.each(this.team.steps, function(w, week) {
			table += "<tr>";
			table += "<td style='text-align: left;'>Week " + (w + 1) + "</td>";
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
		return this;
	}

	applyStatsTableToDiv(divId) {
		const days = this.days;
		var daysWalked = 0;
		var totalSteps = 0;
		var remainingSteps = this.team.stepsGoal;
		var dailyAvg = 0;
		var remainingAvg = 0;
		$.each(this.team.steps, function(w, week) {
			$.each(days, function(d, day) {
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
		table += "<caption>" + this.team.name + " Stats</caption>";
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

	applyStepsGraphToDiv(divId) {
		// labels: day numbers
		const labels = [...Array(this.team.daysInChallenge).keys()].map(i => i + 1);

		const stepGoalSeries = [...Array(this.team.daysInChallenge).keys()].map(i => this.team.stepsGoal);
		const stepSeries = [];

		const days = this.days;
		var totalSteps = 0;
		$.each(this.team.steps, function(w, week) {
			$.each(days, function(d, day) {
				var stepsPerDay = week[day];
				if (stepsPerDay) {
					totalSteps += stepsPerDay || 0;
					stepSeries.push(totalSteps);
				}
			});
		});
		
		new Chartist.Line(divId, {
			labels: labels,
			series: [
				stepGoalSeries, stepSeries 
			]
		}, {
			fullWidth: false,
			chartPadding: {
				left: 10,
				right: 100
			}
		});
		return this;
	}

	applyAverageGraphToDiv(divId) {
		// labels: day numbers
		var labels = [...Array(this.team.daysInChallenge).keys()].map(i => i + 1);

		var dailyRemainingAvg = [];

		const days = this.days;
		const stepsGoal = this.team.stepsGoal;
		const daysInChallenge = this.team.daysInChallenge;
		var totalSteps = 0;
		var daysWalked = 0;
		$.each(this.team.steps, function(w, week) {
			$.each(days, function(d, day) {
				var stepsPerDay = week[day];
				daysWalked += (stepsPerDay != undefined) ? 1 : 0;
				if (stepsPerDay) {
					totalSteps += stepsPerDay || 0;
					var remaining = stepsGoal - totalSteps;
					if (remaining > 0) {
						dailyRemainingAvg.push(remaining / (daysInChallenge - daysWalked));
					}
					else {
						dailyRemainingAvg.push(0);
					}
				}
			});
		});
		
		new Chartist.Line(divId, {
			labels: labels,
			series: [
				dailyRemainingAvg
			]
		}, {
			fullWidth: false,
			chartPadding: {
				left: 10,
				right: 100
			}
		});
		return this;
	}
}
