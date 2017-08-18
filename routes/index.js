var express = require('express');
var router = express.Router();
var playerService = require('../services/playerService');

/* GET home page. */
router.get('/', playerService.getAllPlayers, function(req, res, next) {
  res.render('index', { 
	  	title: 'Fantasy Premier League',
	  	allPlayers: req.allPlayers
  	});
});

router.get('/players/:id', playerService.getPlayerStats, playerService.getAllTeams, function(req, res, next) {
	console.log(req.playerStats)
	res.render('playerPage', {
		title: req.playerStats.first_name + " " + req.playerStats.second_name,
		playerStats: req.playerStats
	});
});

module.exports = router;
