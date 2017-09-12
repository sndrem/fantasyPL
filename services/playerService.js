const fplapi = require('fpl-api-node');

let playerService = {
	getAllPlayers: function(req, res, next) {
		fplapi.getElements().then(data => {
			req.allPlayers = data;
			next();
		})
	},

	getPlayerStats: function(req, res, next) {
		const playerId = parseInt(req.params.id);
		fplapi.getElements().then(data => {
			req.playerStats = data.filter(p => p.id === playerId)[0];
			next();
		})
	},

	getAllTeams: function(req, res, next) {
		fplapi.getTeams().then(data => {
			req.allTeams = data;
			next();
		});
	},

	getAllGameWeeks: function(req, res, next) {
		fplapi.getEvents().then(data => {
			req.gameWeeks = data;
			next();
		})
	},

	getGameWeek: function(req, res, next) {
		const gameWeek = parseInt(req.params.weekId);
		fplapi.getEvents().then(data => {
			req.gameWeek = data.filter(w => w.id === gameWeek)[0];
			next();
		})
	}
}

module.exports = playerService;