const team_a = {
	name : "Team A",
	stepsGoal : 1022837,
	distanceGoal : 300,
	daysInChallenge : 16*7,
	steps : [{
		"Sunday" : 5719,
		"Monday" : 8862,
		"Tuesday" : 13347,
		"Wednesday" : 2237,
		"Thursday" : 9562,
		"Friday" : 7186,
		"Saturday" : 19102
	}, {
		"Sunday" : 3039,
		"Monday" : 11966,
		"Tuesday" : 13401,
		"Wednesday" : 9281,
		"Thursday" : 10371,
		"Friday" : 4640,
		"Saturday" : 20908
	}, {
		"Sunday" : 6470,
		"Monday" : 1782,
		"Tuesday" : 10133,
		"Wednesday" : 15816,
		"Thursday" : 8739,
		"Friday" : 3877,
		"Saturday" : 21188
	}, {
		"Sunday" : 1595,
		"Monday" : 11812,
		"Tuesday" : 12253,
		"Wednesday" : 12251,
		"Thursday" : 11611,
		"Friday" : 4048,
		"Saturday" : 24840
	}, {
		"Sunday" : 3546,
		"Monday" : 13760,
		"Tuesday" : 14749,
		"Wednesday" : 2122,
		"Thursday" : 3612,
		"Friday" : 3599,
		"Saturday" : 19877
	}, {
		"Sunday" : 7799,
		"Monday" : 13529,
		"Tuesday" : 10162,
		"Wednesday" : 10485,
		"Thursday" : 12679,
		"Friday" : 6954,
		"Saturday" : 20214
	}, {
		"Sunday" : 2924,
		"Monday" : 10299,
		"Tuesday" : 17165,
		"Wednesday" : 12281,
		"Thursday" : 2508,
		"Friday" : 6816,
		"Saturday" : 23559
	}, {
		"Sunday" : 2210,
		"Monday" : 12465,
		"Tuesday" : 9201,
		"Wednesday" : 14613,
		"Thursday" : 3071,
		"Friday" : 7368,
		"Saturday" : 24274
	},{
		"Sunday" : 8121,
		"Monday" : 13374,
		"Tuesday" : 8109,
		"Wednesday" : 15235,
		"Thursday" : 10189,
		"Friday" : 8053,
		"Saturday" : 27967
	},{
		"Sunday" : 1860,
		"Monday" : 8216,
		"Tuesday" : 2169,
		"Wednesday" : 8085,
		"Thursday" : 10100,
		"Friday" : 2192,
		"Saturday" : 15000
	},{
		"Sunday" : 24414,
		"Monday" : 1323,
		"Tuesday" : 10226,
		"Wednesday" : 7379,
		"Thursday" : 7723,
		"Friday" : 2879,
		"Saturday" : 5672
	},{
		"Sunday" : 10706,
		"Monday" : 6318,
		"Tuesday" : 9972,
		"Wednesday" : 7776,
		"Thursday" : 7874,
		"Friday" : 2366,
		"Saturday" : 1662
	},{
		"Sunday" : 9568,
		"Monday" : 8211,
		"Tuesday" : 11423,
		"Wednesday" : 11552,
		"Thursday" : 2565,
		"Friday" : 8154,
		"Saturday" : 11006
	},{
		"Sunday" : 19078,
		"Monday" : 8247,
		"Tuesday" : 2053,
		"Wednesday" : 10363,
		"Thursday" : 2081,
		"Friday" : 1867,
		"Saturday" : 10058
	},{
		"Sunday" : 17761,
		"Monday" : 2530,
		"Tuesday" : 8873,
		"Wednesday" : 13555,
		"Thursday" : 8456,
		"Friday" : 13400,
		"Saturday" : 23719
	},{
		"Sunday" : undefined,
		"Monday" : undefined,
		"Tuesday" : undefined,
		"Wednesday" : undefined,
		"Thursday" : undefined,
		"Friday" : undefined,
		"Saturday" : undefined
	}],
	// ============================================================================================
	routes : {
		"O" : 1.2,
		"H" : 2.0,
		"S" : 2.0,
		"F" : 2.0,
		"J" : 2.05,
		"B" : 2.0,
		"M" : 2.0,
		"V2" : 2.5,
		"E3" : 3.1,
		"F3" : 3.1,
		"L3" : 3.1,
		"J3" : 3.2,
		"J4" : 4.1,
		"M4" : 4.2,
		"J5" : 5.0,
		"E4" : 4.2,
		"F4" : 4.2,
		"E6" : 6.2,
		"L6" : 6.4,
		"J7" : 7.2
	},
	distance : [{
		"Sunday" : undefined,
		"Monday" : "M+F",
		"Tuesday" : "M+J+F",
		"Wednesday" : undefined,
		"Thursday" : "M+F",
		"Friday" : undefined,
		"Saturday" : "J7"
	}, {
		"Sunday" : undefined,
		"Monday" : "F+J",
		"Tuesday" : "F+J+M",
		"Wednesday" : "J+F",
		"Thursday" : "M+F",
		"Friday" : undefined,
		"Saturday" : "F+J+M+F"
	}, {
		"Sunday" : undefined,
		"Monday" : undefined,
		"Tuesday" : "H+H",
		"Wednesday" : "J+F+M",
		"Thursday" : "F4",
		"Friday" : undefined,
		"Saturday" : "E4+E4"
	}, {
		"Sunday" : undefined,
		"Monday" : "F+M",
		"Tuesday" : "E6",
		"Wednesday" : "E6",
		"Thursday" : "F+M",
		"Friday" : undefined,
		"Saturday" : "9"
	}, {
		"Sunday" : undefined,
		"Monday" : "F+J+M",
		"Tuesday" : "F+J3+M",
		"Wednesday" : undefined,
		"Thursday" : undefined,
		"Friday" : undefined,
		"Saturday" : 11
	}, {
		"Sunday" : undefined,
		"Monday" : 6.2,
		"Tuesday" : 4,
		"Wednesday" : undefined,
		"Thursday" : 6,
		"Friday" : undefined,
		"Saturday" : 12
	}, {
		"Sunday" : undefined,
		"Monday" : undefined,
		"Tuesday" : 6,
		"Wednesday" : "E6",
		"Thursday" : undefined,
		"Friday" : undefined,
		"Saturday" : 13
	}, {
		"Sunday" : undefined,
		"Monday" : "E6",
		"Tuesday" : undefined,
		"Wednesday" : "F+M+H",
		"Thursday" : undefined,
		"Friday" : undefined,
		"Saturday" : "F+E6+E6"
	},{
		"Sunday" : undefined,
		"Monday" : "E6",
		"Tuesday" : undefined,
		"Wednesday" : "E6",
		"Thursday" : undefined,
		"Friday" : undefined,
		"Saturday" : "F+E6+E6"
	},{
		"Sunday" : undefined,
		"Monday" : undefined,
		"Tuesday" : undefined,
		"Wednesday" : 3,
		"Thursday" : 4,
		"Friday" : undefined,
		"Saturday" : undefined
	},{
		"Sunday" : 13.1,
		"Monday" : undefined,
		"Tuesday" : undefined,
		"Wednesday" : undefined,
		"Thursday" : undefined,
		"Friday" : undefined,
		"Saturday" : undefined
	},{
		"Sunday" : 2,
		"Monday" : undefined,
		"Tuesday" : undefined,
		"Wednesday" : undefined,
		"Thursday" : undefined,
		"Friday" : undefined,
		"Saturday" : undefined
	},{
		"Sunday" : 1,
		"Monday" : 4,
		"Tuesday" : undefined,
		"Wednesday" : undefined,
		"Thursday" : undefined,
		"Friday" : 2,
		"Saturday" : 4
	},{
		"Sunday" : 2,
		"Monday" : undefined,
		"Tuesday" : undefined,
		"Wednesday" : 4,
		"Thursday" : undefined,
		"Friday" : undefined,
		"Saturday" : 3.1
	},{
		"Sunday" : 2,
		"Monday" : undefined,
		"Tuesday" : 4,
		"Wednesday" : undefined,
		"Thursday" : 4,
		"Friday" : undefined,
		"Saturday" : "J+M"
	},{
		"Sunday" : undefined,
		"Monday" : undefined,
		"Tuesday" : undefined,
		"Wednesday" : undefined,
		"Thursday" : undefined,
		"Friday" : undefined,
		"Saturday" : undefined
	}]
};