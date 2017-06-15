import React from 'react';
import Numeral from 'numeral';
import TeamLink from 'ui/team-link';
import PlayerRow from 'ui/player-row';

const Row = React.createClass({
	render: function() {
		var me = this;
		return (
			<tr>
				<td style={{"textAlign":"left"}}>
					<span>
						<strong>
							<TeamLink team={this.props.data.currentSeason.team} />
						</strong>
					</span>
				</td>
                <td>
                    <PlayerRow player={this.props.data}>
                        {this.props.data.name}
                    </PlayerRow>
                </td>
                <td>
                    <span>
                        {this.props.data.position.name}
                    </span>
                </td>
				{
					this.props.columns.map(function(column) {
						return (
							<td key={column.label} 
								style={{
									"textAlign":"right",
									"background": column.dataProp == me.props.sortColumn ? "khaki" : ""
								}}>
									<span>
										<strong>{column.dataFunc(me.props.data)}</strong>
									</span>
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
				defaultSort = column.dataProp;
			}
		});
		return {
			data: [],
			sortColumn: defaultSort,
            reverseCoefficient: 1
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
        let reverseCoefficient = this.state.reverseCoefficient;
        if (this.state.sortColumn == column.dataProp)
        {
            reverseCoefficient *= -1;
        }
        else
        {
            reverseCoefficient = 1;
        }
		var theData = this.sortImpl(this.state.data, column, reverseCoefficient);
		this.setState({data : theData, sortColumn: column.dataProp, reverseCoefficient: reverseCoefficient});
	},
	sortImpl: function(data, column, reverseCoefficient) {
		data.sort(function(a, b) {
			if (column.dataFunc(a) < column.dataFunc(b)) {
				return 1 * reverseCoefficient;
			}
			if (column.dataFunc(a) > column.dataFunc(b)) {
				return -1 * reverseCoefficient;
			}
            if (a.name < b.name) {
                return 1 * reverseCoefficient;
            }
            if (a.name > b.name) {
                return -1 * reverseCoefficient;
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
                    <th key={"playerName"} style={{"textAlign":"left", "background":"beige"}}>
						Player
					</th>
                    <th key={"position"} style={{"textAlign":"left", "background":"beige"}}>
						Position
					</th>
					{
						columns.map(function(column) {
							return (
								<th key={column.label} 
									onClick={() => me.sort(column)} 
									style={{	
											"textAlign":"",
											"cursor":"pointer", 
											"background": column.dataProp == me.state.sortColumn ? "khaki" : "beige"}}>
									
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
								<Row key={data.id} data={data} columns={columns} sortColumn={me.state.sortColumn}/>
							)
						})
					}
				</tbody>
			</table>
		);
	}
});

export default Table;