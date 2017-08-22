var express = require('express');
var router = express.Router();
var playerService = require('../services/playerService');

/* GET home page. */
router.get('/', playerService.getAllPlayers, playerService.getAllTeams, function(req, res, next) {
  let teamList = req.allTeams.map(team => {
  	return {
  		teamName: team.name,
  		teamId: team.id,
  		url: team.link_url,
  		players: [],
  		win: team.win,
  		loss: team.loss,
  		draw: team.draw
  	}
  });
  
  req.allPlayers.forEach(player => {
  		teamList.forEach(team => {
  			if(team.teamId === player.team) {
	  			team.players.push({
	  				player
	  			})
  			}	
  		})
  		
  });
  res.render('index', { 
	  	title: 'Fantasy Premier League',
	  	allPlayers: req.allPlayers,
	  	teamList
  	});
});

router.get('/stats', playerService.getAllPlayers, function(req, res, next) {
	// res.json(req.allPlayers);
	req.allPlayers = req.allPlayers.sort((a,b) => {
		return b.total_points - a.total_points;
	})
	res.render('favourites', {
		title: 'Stats',
		allPlayers: req.allPlayers
	})
});

router.get('/players/:id', playerService.getPlayerStats, function(req, res, next) {
	res.render('playerPage', {
		title: req.playerStats.first_name + " " + req.playerStats.second_name,
		playerStats: req.playerStats
	});
});

module.exports = router;
