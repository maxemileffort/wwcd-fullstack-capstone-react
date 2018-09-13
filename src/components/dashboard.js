import React from 'react';
import { BrowserRouter as Router,
	Route, 
	Link, 
	Redirect,
	withRouter 
} from "react-router-dom";

export default function Dashboard(){
	return (
		<main className="dashboard__format">
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
			
			
			
		
		</main>
		
		)}