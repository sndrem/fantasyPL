$(function() {
	const table = $("#statsTable");
	table.tablesorter({
		fixedWidth: true
	});

	function highlightTeam(e) {
		const srcElement = e.srcElement;
		var targetElement = document.querySelector(srcElement.hash);
		targetElement.classList.add("highlight");

		setTimeout(() => {
			targetElement.classList.remove("highlight");
		}, 3000);

	}

	const teamListNavigationNames = Array.from(document.querySelectorAll(".team-navigation-list li a"));
	teamListNavigationNames.forEach(team => team.addEventListener('click', highlightTeam))

});
