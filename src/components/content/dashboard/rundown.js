import React, { Component } from 'react'
import axios from 'axios';

export default class Rundown extends Component{
	constructor(props){
		super(props)
		this.state = {
			season: 'select',
			week: 'select',
			position: 'select',
			avg: 'select',
			projections: null,
			salaries: null
		}
	}

	// watches all the selects and passes payload when they are all chosen
	handleSelects = () => { //this method has the bug
		let season = this.state.season;
		let week = this.state.week;
		let position = this.state.position;
		let avg = this.state.avg;
		if(position === "select" || season === "select" || week === "select" || avg === "select"){
			return false
		} else {
			season = Number(season);
			week = Number(week);
			//functions run in sequence as callbacks, starting with this one:
			this.getProjections(season, week);
		}
	}

	// user is switching between tabs in the dashboard
	handleTabSwitch = (event) => {
		event.preventDefault();
		event.persist(); // for debugging
		for(let i = 1; i <= 5; i++){
			document.querySelector(`.st${i}`).classList.remove('active')
		}
		event.target.classList.add('active')
		let arr = [...event.target.classList]
		console.log(arr[2])
		for(let j = 1; j <= 5; j++){
			document.querySelector(`.t5-${j}`).classList.add('hidden')
		}
		document.querySelector(`div.${arr[2]}`).classList.remove('hidden');
	}

	getProjections = (season, week) => {
		console.log("Getting projections")
		let url = `https://dfs-analytics-react-capstone.herokuapp.com/get-projections/${season}/${week}` 
		axios.get(url)
		.then(response=>{
			console.log(response)
			this.setState({
				projections: response.data
			})
			this.getSalaries(season, week)
        })
        .catch(err=>{
            console.log(err)
        })
	}

	getSalaries = (season, week) => {
		console.log("Getting salaries")
		let url = `https://dfs-analytics-react-capstone.herokuapp.com/get-salaries/${season}/${week}` 
		axios.get(url)
		.then(response=>{
			console.log(response)
			this.setState({
				salaries: response.data
			})
			this.renderDashboardPlayerList(this.state.position)
        })
        .catch(err=>{
            console.log(err)
        })
	}

	getPlayerList = (renderArr) => {
		console.log("Getting player list")
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
		document.querySelector("#dashboard-player-list").innerHTML = tierOutput;
		// will be used for the lineup feature
		// idArr.forEach(el=>{ // elements of this array are already id's
		//     $(`.player-${el}`).on('click', event=>{
		//         handlePlayerClick(event)
		//         console.log(event)
		//         // event.stopPropagation();
		//     })
		// })
	}

	getTopFivePoints = (renderArr) => {
		console.log("Getting top 5 points")
		// renders the top 5 players for projected points
		let pointsArr = renderArr.sort(function(a, b){
			return b.points - a.points;
		}).slice(0, 5)
		let pointsOutput = '';
		pointsOutput += "<p>Top 5 Players - Points</p>"
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
		document.querySelector("#top-5-points").innerHTML = pointsOutput;
	}

	getTopFiveFloor = (renderArr) => {
		console.log("Getting top 5 floor")
		// renders the top 5 players with the best floor
		let floorArr = renderArr.sort(function(a, b){
			return b.floor - a.floor;
		}).slice(0, 5)
		let floorOutput = '';
		floorOutput += "<p>Top 5 Players - Floor</p>"
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
		document.querySelector("#top-5-floor").innerHTML = floorOutput;
	}

	getTopFiveCeiling = (renderArr) => {
		console.log("Getting top 5 ceiling")
		// renders top 5 players with highest ceiling
		let ceilingArr = renderArr.sort(function(a, b){
			return b.ceiling - a.ceiling;
		}).slice(0, 5)
		let ceilingOutput = '';
		ceilingOutput += "<p>Top 5 Players - Ceiling</p>"
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
		document.querySelector("#top-5-ceiling").innerHTML = ceilingOutput;
	}

	getTopFiveValue = (renderArr) => {
		console.log("Getting top 5 value")
		// renders top 5 players based on points / salary
		let valArr = renderArr.sort(function(a, b){
			let aVal = a.points / (a.salary / 1000)
			let bVal = b.points / (b.salary / 1000)
			return bVal - aVal;
		}).slice(0, 5)
		let valOutput = '';
		valOutput += "<p>Top 5 Players - Value</p>"
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
		document.querySelector("#top-5-value").innerHTML = valOutput;
	}

	getTopFiveInsight = (renderArr) => {
		console.log("Getting top 5 insight")
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
		insightOutput += "<p>Top 5 Players - Insight</p>"
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
		document.querySelector("#top-5-insight").innerHTML = insightOutput;
	}

	renderDashboardPlayerList = (position) => {
		console.log("rendering player list")
		let filterProjections;
		let filterSalaries;
		let avg = this.state.avg;
		if (position !== 'FLEX'){
			filterProjections = this.state.projections.filter(obj=>{
				return (obj.pos === position && obj.avg_type === avg);
			});
			
			filterSalaries = this.state.salaries.filter(obj=>{
				return obj.Position === position;
			});
		} else {
			filterProjections = this.state.projections.filter(obj=>{
				return (obj.pos === 'TE' && obj.avg_type === avg || obj.pos === 'WR' && obj.avg_type === avg || 
				obj.pos === 'RB' && obj.avg_type === avg);
			});
			
			filterSalaries = this.state.salaries.filter(obj=>{
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
				}
			}
		})
		
		// clear out html outputs
		document.querySelector("#dashboard-player-list").innerHTML = '';
		document.querySelector("#top-5-points").innerHTML = '';
		document.querySelector("#top-5-floor").innerHTML = '';
		document.querySelector("#top-5-ceiling").innerHTML = '';
		document.querySelector("#top-5-value").innerHTML = '';
		document.querySelector("#top-5-insight").innerHTML = '';
		
		this.getPlayerList(renderArr);
		this.getTopFivePoints(renderArr);
		this.getTopFiveFloor(renderArr);
		this.getTopFiveCeiling(renderArr);
		this.getTopFiveValue(renderArr);
		this.getTopFiveInsight(renderArr);
	}

	render(){
		return(
			<div className="dashboard__format">
				<section className="lineup">
					<label htmlFor="dashboard-season-select">Season:</label>
					<select name="dashboard-season-select" className="dashboard-select" id="dashboard-season-select"
						onChange={(event)=>{
							this.setState({season: event.target.value});
						}}
					>
						<option value="select">Select</option>
						<option value="2018">2018</option>
					</select>
					<label htmlFor="dashboard-week-select">Week:</label>
					<select name="dashboard-week-select" className="dashboard-select" id="dashboard-week-select"
						onChange={(event)=>{
							this.setState({week: event.target.value});
						}}
					>
						<option value="select">Select</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
					</select>
					<label htmlFor="dashboard-position-select">Position:</label>
					<select name="dashboard-position-select" className="dashboard-select" id="dashboard-position-select"
						onChange={(event)=>{
							this.setState({position: event.target.value});
						}}
					>
						<option value="select">Select</option>
						<option value="QB">QB</option>
						<option value="RB">RB</option>
						<option value="WR">WR</option>
						<option value="TE">TE</option>
						<option value="DST">DST</option>
						<option value="FLEX">FLEX</option>
					</select>
					<label htmlFor="dashboard-average-select">Average Type:</label>
					<select name="dashboard-average-select" className="dashboard-select" id="dashboard-average-select"
						onChange={(event)=>{
							this.setState({avg: event.target.value});
						}}
					>
						<option value="select">Select</option>
						<option value="average">Normal</option>
						<option value="weighted">Weighted</option>
						<option value="robust">Robust</option>
					</select>
					<button className="btn"
						onClick={()=>{
							this.handleSelects();
						}}
					>Get Players</button>
					<div id='dashboard-player-list'>
						<p>Rendered players based on select option and maybe some checkboxes for stats</p>
					</div>
				</section>
				<section className="lineup optimals">
					<div className="tabs"
						onClick={(event)=>{
							this.handleTabSwitch(event);
						}}
					>
						<h3>Key Performance Indicators</h3>
						<a href="#" className="single-tab st1 points active">Points</a>
						<a href="#" className="single-tab st2 floor">Floor</a>
						<a href="#" className="single-tab st3 ceiling">Ceiling</a>
						<a href="#" className="single-tab st4 value">Value</a>
						<a href="#" className="single-tab st5 insight">Insight</a>
					</div>
					<div id='top-5-points' className="t5-1 top-5 points">
						<p>Please make a selection</p>
					</div>
					<div id='top-5-floor' className='t5-2 top-5 hidden floor'>
						<p>Please make a selection</p>
					</div>
					<div id='top-5-ceiling' className='t5-3 top-5 hidden ceiling'>
						<p>Please make a selection</p>
					</div>
					<div id='top-5-value' className='t5-4 top-5 hidden value'>
						<p>Please make a selection</p>
					</div>
					<div id='top-5-insight' className='t5-5 top-5 hidden insight'>
						<p>Please make a selection</p>
					</div>
				</section>
			</div>
		)
	}
}



