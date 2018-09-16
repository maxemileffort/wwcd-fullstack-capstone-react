import React, { Component } from 'react'
import { Link } from "react-router-dom";


// // user is in dashboard, checking out different positions
// $('.dashboard-select').on("change", function(e){
//     let period = {};
//     e.preventDefault();
//     e.stopPropagation();
//     // get value
//     let query = $('#dashboard-position-select').val();
//     let season = $('#dashboard-season-select').val();
//     let week = $('#dashboard-week-select').val();
//     let average = $('#dashboard-average-select').val();
//     // validate (make sure it's not first option)
//     if (query === "select" || season === "select" || week === "select" || average === "select"){
//         return false;
//     }
//     // send to ajax call functions
//     else {
//         period = {
//             season: Number(season),
//             week: Number(week)
//         }
//         console.log(period)
//         position = query.toString();
//         avg = average.toString();
//         //functions run in sequence as callbacks, starting with this one:
//         getProjections(period);
//     }
// })

// // user is switching between tabs in the dashboard
// $('.single-tab').on('click', function(e){
//     e.preventDefault();
//     $('.single-tab').removeClass('active');
//     let query = e.currentTarget.className.split(' ').pop();
//     $(`a.${query}`).addClass('active');
//     $(`div.top-5`).addClass('hidden');
//     $(`div.${query}`).removeClass('hidden');
// })



export default class Rundown extends Component{
	constructor(props){
		super(props)
		this.setState = {
			season: 'select',
			week: 'select',
			position: 'select',
			avg: 'select',
			projections: null,
			salaries: null
		}
	}
	

	// watches all the selects and passes payload when they are all chosen
	handleSelects(){
	}

	// user is switching between tabs in the dashboard
	handleTabSwitch(){}

	sendStatsToDb(season, week){
		let period = {
			season,
			week
		};
		
		$.ajax({
			type: 'POST',
			url: 'https://dfs-analytics-react-capstone.herokuapp.com/send-stats-to-db',
			dataType: 'json',
			data: JSON.stringify(period),
			contentType: 'application/json',
			beforeSend: function(){
				$('.results').html(`<p>Retrieving projections...</p>`)
			}
		})
		//if call succeeds
		.done(function (result) {
			console.log(result);
			$('.results').html(`<p>Finished updating DB.</p><p>${result.msg}</p>`)
		})
		//if the call fails
		.fail(function (jqXHR, error, errorThrown) {
			console.log(jqXHR);
			console.log(error);
			console.log(errorThrown);
			$('.results').html(`
			<p>${jqXHR}</p>
			<p>${error}</p>
			<p>${errorThrown}</p>
			`)
		});
	}

	sendSalariesToDb(file){
		$.ajax({
			url: 'https://dfs-analytics-react-capstone.herokuapp.com/send-salaries-to-db/',
			type: "POST",
			data: file,
			processData: false,
			contentType: false
		})
		//if call succeeds
		.done(function (result) {
			console.log(result);
			$('.results').html(`<p>Finished updating DB.</p><p>${result.msg}</p>`)
		})
		//if the call fails
		.fail(function (jqXHR, error, errorThrown) {
			console.log(jqXHR);
			console.log(error);
			console.log(errorThrown);
			$('.results').html(`
			<p>${jqXHR}</p>
			<p>${error}</p>
			<p>${errorThrown}</p>
			`)
		});
	}

	getProjections(period){
		console.log(period)
		$.ajax({
			type: 'GET',
			url: `https://dfs-analytics-react-capstone.herokuapp.com/get-projections/${period.season}/${period.week}`,
			dataType: 'json',
			contentType: 'application/json'
		})
		//if call succeeds
		.done(function (result) {
			projections = result; // set global variable equal to returned result to access in other functions
			console.log(projections)
			// this function was a bottle neck, 
			// so changed it to where data flow continues here
			getSalaries(period);
		})
		//if the call fails
		.fail(function (jqXHR, error, errorThrown) {
			console.log(jqXHR);
			console.log(error);
			console.log(errorThrown);
		});
	}

	getSalaries(period){
		console.log(period)
		$.ajax({
			type: 'GET',
			url: `https://dfs-analytics-react-capstone.herokuapp.com/get-salaries/${period.season}/${period.week}`,
			dataType: 'json',
			contentType: 'application/json'
		})
		//if call succeeds
		.done(function (result) {
			salaries = result; // set global variable equal to returned result to access in other functions
			console.log(salaries)
			// placed here since it needs to fire after the calls to the db
			renderDashboardPlayerList(position)
		})
		//if the call fails
		.fail(function (jqXHR, error, errorThrown) {
			console.log(jqXHR);
			console.log(error);
			console.log(errorThrown);
		});
	}

	getPlayerList(renderArr){
		// renders the initial player list, sorted by tier
		let tierArr = renderArr.sort(function(a, b){
			return a.tier - b.tier;
		})
		// for adding click handlers:
		let idArr = []
		
		// construct html from the tier array as the whole list
		let tierOutput = '';
		tierOutput += "<ul>"
		tierArr.forEach(el=>{
			tierOutput += `<li class='player player-${el.id}'>
			<a class="player-report" href="https://www.google.com/search?q=${el.name.split(' ').join('+')}" target="_blank">
			Name: ${el.name} - Salary: $${el.salary} -  
			Points: ${el.points} pts - Avg Type: ${el.avg_type} -
			Floor: ${el.floor} pts - Ceiling: ${el.ceiling} pts - Tier: ${el.tier} -
			Position Rank: ${el.pos_rank} - Team: ${el.team} - Game: ${el.game}
			</a>
			</li>`
			tierOutput += "<hr>"
			idArr.push(el.id) // adding el.id to this arr in order to add click handlers in the next block
		})
		tierOutput += "</ul>"
		// render tier list
		$("#dashboard-player-list").html(tierOutput);
		// will be used for the lineup feature
		// idArr.forEach(el=>{ // elements of this array are already id's
		//     $(`.player-${el}`).on('click', event=>{
		//         handlePlayerClick(event)
		//         console.log(event)
		//         // event.stopPropagation();
		//     })
		// })
	}

	getTopFivePoints(renderArr){
		// renders the top 5 players for projected points
		let pointsArr = renderArr.sort(function(a, b){
			return b.points - a.points;
		}).slice(0, 5)
		let pointsOutput = '';
		pointsOutput += "<ul>"
		pointsArr.forEach(el=>{
			pointsOutput += `<li class='player player-${el.id}'>Name: ${el.name} - Salary: $${el.salary} -  
			Points: ${el.points} pts - Avg Type: ${el.avg_type} -
			Floor: ${el.floor} pts - Ceiling: ${el.ceiling} pts - Tier: ${el.tier} -
			Position Rank: ${el.pos_rank} - Team: ${el.team} - Game: ${el.game}</li>`
			pointsOutput += "<hr>"
		})
		pointsOutput += "</ul>"
		// render points list
		$("#top-5-points").html(pointsOutput);
	}

	getTopFiveFloor(renderArr){
		// renders the top 5 players with the best floor
		let floorArr = renderArr.sort(function(a, b){
			return b.floor - a.floor;
		}).slice(0, 5)
		let floorOutput = '';
		floorOutput += "<ul>"
		floorArr.forEach(el=>{
			floorOutput += `<li class='player player-${el.id}'>Name: ${el.name} - Salary: $${el.salary} -  
			Points: ${el.points} pts - Avg Type: ${el.avg_type} -
			Floor: ${el.floor} pts - Ceiling: ${el.ceiling} pts - Tier: ${el.tier} -
			Position Rank: ${el.pos_rank} - Team: ${el.team} - Game: ${el.game}</li>`
			floorOutput += "<hr>"
		})
		floorOutput += "</ul>"
		// render floor list
		$("#top-5-floor").html(floorOutput);
	}

	getTopFiveCeiling(renderArr){
		// renders top 5 players with highest ceiling
		let ceilingArr = renderArr.sort(function(a, b){
			return b.ceiling - a.ceiling;
		}).slice(0, 5)
		let ceilingOutput = '';
		ceilingOutput += "<ul>"
		ceilingArr.forEach(el=>{
			ceilingOutput += `<li class='player player-${el.id}'>Name: ${el.name} - Salary: $${el.salary} -  
			Points: ${el.points} pts - Avg Type: ${el.avg_type} -
			Floor: ${el.floor} pts - Ceiling: ${el.ceiling} pts - Tier: ${el.tier} -
			Position Rank: ${el.pos_rank} - Team: ${el.team} - Game: ${el.game}</li>`
			ceilingOutput += "<hr>"
		})
		ceilingOutput += "</ul>"
		// render ceiling list
		$("#top-5-ceiling").html(ceilingOutput);
	}

	getTopFiveValue(renderArr){
		// renders top 5 players based on points / salary
		let valArr = renderArr.sort(function(a, b){
			let aVal = a.points / (a.salary / 1000)
			let bVal = b.points / (b.salary / 1000)
			return bVal - aVal;
		}).slice(0, 5)
		let valOutput = '';
		valOutput += "<ul>"
		valArr.forEach(el=>{
			valOutput += `<li class='player player-${el.id}'>Name: ${el.name} - Salary: $${el.salary} -  
			Points: ${el.points} pts - Avg Type: ${el.avg_type} -
			Floor: ${el.floor} pts - Ceiling: ${el.ceiling} pts - Tier: ${el.tier} -
			Position Rank: ${el.pos_rank} - Team: ${el.team} - Game: ${el.game}</li>`
			valOutput += "<hr>"
		})
		valOutput += "</ul>"
		// render val list
		$("#top-5-value").html(valOutput);
	}

	getTopFiveInsight(renderArr){
		// rating based on a way that relates players' points averages to their salary, rank, and tier
		let insightArr = renderArr.sort(function(a, b){
			if (a.points === 0 || a.ceiling === 0 || a.floor === 0
				 || b.points === 0 || b.ceiling === 0 || b.floor === 0){
				return false
			}
			else {
				// the reasoning behind this is: 
				// the points values are averaged, in an effort to manage player production expectations. Sort of a weak correction for wide ranges.
				// in order for the insight value to stay high (which is good), salary has to decrease, while rank and tier should increase.
				// when their(salary=>rank/tier) values converge, then we start to see a player whose performance may be underpriced (another good thing)
				// the value is that this player will be low on the radar of others, due to low rank, tier, and salary, but still projected to due well,
				// possibly due to match ups or maybe he's projected as a sleeper or filling in for an injury
				let aInsight = (a.points+a.floor+a.ceiling)/3 / (a.salary/1000 * a.rank / a.tier) 
				let bInsight = (b.points+b.floor+b.ceiling)/3 / (b.salary/1000 * b.rank / b.tier) 
				let insight = aInsight - bInsight;
				return insight;
			}
		}).slice(0, 6)
		insightArr.splice(0, 1);
		let insightOutput = '';
		insightOutput += "<ul>"
		insightArr.forEach(el=>{
			insightOutput += `<li class='player player-${el.id}'>Name: ${el.name} - Salary: $${el.salary} -  
			Points: ${el.points} pts - Avg Type: ${el.avg_type} -
			Floor: ${el.floor} pts - Ceiling: ${el.ceiling} pts - Tier: ${el.tier} -
			Position Rank: ${el.pos_rank} - Team: ${el.team} - Game: ${el.game}</li>`
			insightOutput += "<hr>"
		})
		insightOutput += "</ul>"
		// render insight list
		$("#top-5-insight").html(insightOutput);
	}

	renderDashboardPlayerList(position){
		// console.log(position)     
		// console.log(projections)     
		// console.log(salaries)     
		let filterProjections;
		let filterSalaries;
		if (position !== 'FLEX'){
			filterProjections = projections.filter(obj=>{
				return (obj.pos === position && obj.avg_type === avg);
			});
			
			filterSalaries = salaries.filter(obj=>{
				return obj.Position === position;
			});
		} else {
			filterProjections = projections.filter(obj=>{
				return (obj.pos === 'TE' && obj.avg_type === avg || obj.pos === 'WR' && obj.avg_type === avg || 
				obj.pos === 'RB' && obj.avg_type === avg);
			});
			
			filterSalaries = salaries.filter(obj=>{
				return (obj.Position === 'TE' || obj.Position === 'RB' || obj.Position === 'WR');
			});
		}
	
		// create and clear render array every time function is called
		let renderArr = [];
		//combine the objects from the arrays; may move this to server side
		filterProjections.forEach(player=>{
			let name = `${player.first_name} ${player.last_name}`
			// console.log(name)
			for (let el in filterSalaries){
				// console.log(filterSalaries[el].Name)
				if (name === filterSalaries[el].Name){
					let points = Math.round(player.points);
					let team = filterSalaries[el].TeamAbbrev;
					let floor = Math.round(player.floor);
					let ceiling = Math.round(player.ceiling);
					let pos_rank = player.pos_rank;
					let id = player.id;
					let tier = player.tier;
					let avg_type = player.avg_type;
					let salary = filterSalaries[el].Salary; 
					let game = filterSalaries[el]['Game Info']; 
					let obj = {
						name,
						points,
						salary,
						avg_type, 
						floor, 
						ceiling, 
						tier, 
						pos_rank, 
						team, 
						game,
						id
					}
					
					renderArr.push(obj) 
					
					// console.log(str)
				}
			}
		})
		// console.log(renderArr);
		
		
		// clear out html outputs
		$("#dashboard-player-list").html('');
		$("#top-5-points").html('');
		$("#top-5-floor").html('');
		$("#top-5-ceiling").html('');
		$("#top-5-value").html('');
		$("#top-5-insight").html('');
		
		getPlayerList(renderArr)
		getTopFivePoints(renderArr)
		getTopFiveFloor(renderArr)
		getTopFiveCeiling(renderArr)
		getTopFiveValue(renderArr)
		getTopFiveInsight(renderArr)
	}

	render(){
		return(
			<div className="dashboard__format">
				<h2>Dashboard</h2>
				<div className="test">
				<section className="lineup">
					<label htmlFor="dashboard-season-select">Season:
						<select name="dashboard-season-select" className="dashboard-select" id="dashboard-season-select">
							<option value="2018">2018</option>
							<option value="select">Select</option>
						</select>
					</label>
					<label htmlFor="dashboard-week-select">Week:
						<select name="dashboard-week-select" className="dashboard-select" id="dashboard-week-select">
							<option value="select">Select</option>
							<option value="0">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
					</label>
					<label htmlFor="dashboard-position-select">Position:
						<select name="dashboard-position-select" className="dashboard-select" id="dashboard-position-select">
							<option value="select">Select</option>
							<option value="QB">QB</option>
							<option value="RB">RB</option>
							<option value="WR">WR</option>
							<option value="TE">TE</option>
							<option value="DST">DST</option>
							<option value="FLEX">FLEX</option>
						</select>
					</label>
					<label htmlFor="dashboard-average-select">Average Type:
						<select name="dashboard-average-select" className="dashboard-select" id="dashboard-average-select">
							<option value="select">Select</option>
							<option value="average">Normal</option>
							<option value="weighted">Weighted</option>
							<option value="robust">Robust</option>
						</select>
					</label>
					
					<div id='dashboard-player-list'>
						<p>Rendered players based on select option and maybe some checkboxes for stats</p>
					</div>
				</section>
				
				<section className="lineup optimals">
					<div className="tabs">
						<Link to="#" className="single-tab points active">Points</Link>
						<Link to="#" className="single-tab floor">Floor</Link>
						<Link to="#" className="single-tab ceiling">Ceiling</Link>
						<Link to="#" className="single-tab value">Value</Link>
						<Link to="#" className="single-tab insight">Insight</Link>
					</div>
					<div id='top-5-points' className="top-5 points">
						<p>Please make a selection</p>
					</div>
					<div id='top-5-floor' className=' top-5 hidden floor'>
						<p>Please make a selection</p>
					</div>
					<div id='top-5-ceiling' className='top-5 hidden ceiling'>
						<p>Please make a selection</p>
					</div>
					<div id='top-5-value' className='top-5 hidden value'>
						<p>Please make a selection</p>
					</div>
					<div id='top-5-insight' className='top-5 hidden insight'>
						<p>Please make a selection</p>
					</div>
				
				</section>
				</div>
			</div>
		)
	}
    
}



