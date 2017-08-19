const fplapi = require('fpl-api-node');

let playerService = {
	getAllPlayers: function(req, res, next) {
		fplapi.findPlayers().then(data => {
			req.allPlayers = data.map(player => {
				return {
					first_name: player.first_name,
					second_name: player.second_name,
					web_name: player.web_name,
					id: player.id,
					team_code: player.team_code,
					team: player.team
				}
			});
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
		fplapi.findTeams().then(data => {
			req.allTeams = data;
			next();
		});
		
	}
}

module.exports = playerService;