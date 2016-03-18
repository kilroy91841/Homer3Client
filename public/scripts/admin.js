var TeamChanger = React.createClass({
	getInitialState: function() {
		return {};
	},
	handleTeamChange: function(e) {
		this.setState({ newTeamId: e.target.value});
	},
	handleIdChange: function(e) {
		this.setState({ playerId: e.target.value});
	},
	submit: function() {
		var data = { teamId: 1, season: 2016, playerId: this.state.playerId };
		$.post({
            url: '/player/' + this.state.playerId + '/team/' + this.state.newTeamId,
            data: data,
            dataType: 'json',
            cache: false,
            success: function(data) {
              console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
              console.error('', status, err.toString());
            }.bind(this)
          });
	},
	render: function() {
		return (
		  <div>
			<input type="text" onChange={this.handleTeamChange}/>
			<input type="text" onChange={this.handleIdChange}/>
			<input type="button" onClick={this.submit}/>
			</div>
			);
	}
});

var Admin = React.createClass({
	render: function() {
		return (
			<TeamChanger />
			);
	}
});

ReactDOM.render(
	<Admin />,
	document.getElementById('content')
);