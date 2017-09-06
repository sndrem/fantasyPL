const fplapi = require('fpl-api-node');

let playerService = {
	getAllPlayers: function(req, res, next) {
		fplapi.getAllPlayers().then(data => {
			req.allPlayers = data;
			next();
		})
	},

	getPlayerStats: function(req, res, next) {
		const playerId = parseInt(req.params.id);
		fplapi.findPlayer(playerId).then(data => {
			req.playerStats = data;
			next();
		})
	},

	getAllTeams: function(req, res, next) {
		fplapi.getAllTeams().then(data => {
			req.allTeams = data;
			next();
		});
	},

	getAllGameWeeks: function(req, res, next) {
		fplapi.getAllGameweeks().then(data => {
			req.gameWeeks = data;
			next();
		})
	},

	getGameWeek: function(req, res, next) {
		fplapi.findGameweek(parseInt(req.params.weekId)).then(data => {
			req.gameWeek = data;
			next();
		})
	}
}

module.exports = playerService;