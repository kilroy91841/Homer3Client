import React from 'react';
import Numeral from 'numeral';
import TeamLink from 'ui/team-link';

const Row = React.createClass({
	render: function() {
		var me = this;
		return (
			<tr>
				<td style={{"textAlign":"left"}}>
					<span>
						<strong>
							<TeamLink team={this.props.data.team} />
						</strong>
					</span>
				</td>
				{
					this.props.columns.map(function(column) {
						return (
							<td key={column.label} 
								style={{
									"textAlign":"right",
									"background": column.points == me.props.sortColumn ? "khaki" : ""
								}}>
									<span>
										<strong>{me.props.data[column.points]}</strong>
									</span>
									&nbsp;
									{ column.total ? 
										<span>
											(
											{
												column.format ? 
												Numeral(me.props.data[column.total]).format(column.format) :
												me.props.data[column.total]
											}
											)
										</span>
										:
										null
									}
							</td>
						);
					})
				}
			</tr>
		)
	}
});

const Table = React.createClass({
	getInitialState: function() {
		var defaultSort = null;
		this.props.columns.forEach(function(column) {
			if (column.defaultSort) {
				defaultSort = column.points;
			}
		});
		return {
			data: [],
			sortColumn: defaultSort
		};
	},
	componentWillReceiveProps: function(props) {
		if (this.state.sortColumn) {
			var sortedData = this.sortImpl(props.data, this.state.sortColumn);
			this.setState({data : sortedData})
		} else {
			this.setState({data : props.data})
		}
	},
	sort: function(column) {
		var theData = this.sortImpl(this.state.data, column);
		this.setState({data : theData, sortColumn: column});
	},
	sortImpl: function(data, column) {
		data.sort(function(a, b) {
			if (a[column] < b[column]) {
				return 1;
			}
			if (a[column] > b[column]) {
				return -1;
			}
			return 0;
		});
		return data;
	},
	render: function() {
		var me = this;
		var columns = this.props.columns;
		return (
			<table className="table table-bordered">
				<thead>
					<tr>
					<th key={"teamName"} style={{"textAlign":"left", "background":"beige"}}>
						Team
					</th>
					{
						columns.map(function(column) {
							return (
								<th key={column.label} 
									onClick={() => me.sort(column.points)} 
									style={{	
											"textAlign":"",
											"cursor":"pointer", 
											"background": column.points == me.state.sortColumn ? "khaki" : "beige"}}>
									
											{column.label}
								</th>
							)
						})
					}
					</tr>
				</thead>
				<tbody>
					{
						this.state.data.map(function(data) {
							return (
								<Row key={data.teamId} data={data} columns={columns} sortColumn={me.state.sortColumn}/>
							)
						})
					}
				</tbody>
			</table>
		);
	}
});

export default Table;