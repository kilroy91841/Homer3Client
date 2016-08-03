import React from 'react';
import { get, put, post } from 'api/axios';
import { LineChart } from 'react-d3-basic';

const StandingsPage = React.createClass({
	getChartSeries: function() {
		return [
	      {
	        field: 'place',
	        name: 'Place',
	        color: '#ff7f0e',
	        style: {
	          "stroke-width": 2,
	          "stroke-opacity": .2,
	          "fill-opacity": .2
	        }
	      },
	      {
	      	field: 'ari',
	        name: 'Ari',
	        color: '#ff7f0e',
	        style: {
	          "stroke-width": 2,
	          "stroke-opacity": .2,
	          "fill-opacity": .2
	        }
	      }
	    ];
	},
	getInitialState: function() {
		return {data: [{teamId:1, place:4, ari:10},{teamId:2, place:7, ari:5}]};
	},
	// componentDidMount: function() {
	// 	get('/api/standings/latest', function(response) {
	// 		this.setState({data : response.data});
	// 	}, function(err) {

	// 	});
	// },
	render: function() {
		return (
			<div>
				<LineChart width= {600} height= {300} data= {this.state.data} chartSeries= {this.getChartSeries()} x= {
					function(d) {
				      return d.teamId;
				    }
				} />
			</div>
		);
	},
});

export default StandingsPage;