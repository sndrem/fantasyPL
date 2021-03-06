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
	req.allPlayers = req.allPlayers.sort((a,b) => {
		return b.total_points - a.total_points;
	})
	res.render('favourites', {
		title: 'Stats',
		allPlayers: req.allPlayers
	})
});

router.get('/players/:id', playerService.getPlayerStats, playerService.getAllPlayers, function(req, res, next) {
  const teamMates = req.allPlayers.filter(t => t.team === req.playerStats.team);
  res.render('playerPage', {
		title: req.playerStats.first_name + " " + req.playerStats.second_name,
		playerStats: req.playerStats,
    teamMates
	});
});

router.get("/gameweeks", playerService.getAllGameWeeks, function(req, res, next) {
  res.render('gameWeeksPage', {
      title: 'Game weeks',
      gameWeeks: req.gameWeeks.filter(g => g.finished),
      lastWeek: req.gameWeeks.filter(g => g.is_current)[0]
  });

router.get("/gameweeks/week/:weekId", playerService.getGameWeek, function(req, res, next) {
  res.render('individualGameWeekPage', {
    title: req.gameWeek.name
  });
});

router.get("/gameweeks/weeksPlayed", playerService.getAllGameWeeks, function(req, res, next) {
    let gameWeeksForResponse = req.gameWeeks.filter(g => g.finished);
    res.json(gameWeeksForResponse);    
  });
});

module.exports = router;
