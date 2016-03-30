  var PlayerList = React.createClass({
    render: function() {
      var me = this;
      var mapFunction = function(players) {
        if (players) {
          return players.map(function(p) {
            return (<Player key={p.id} textStyle="full" onPlayerClick={me.props.onPlayerClick} data={p} />);
          });
        } else {
          return;
        }
      };
      var catcher = mapFunction(this.props.catcher);
      var firstBase = mapFunction(this.props.firstBase);
      var secondBase = mapFunction(this.props.secondBase);
      var thirdBase = mapFunction(this.props.thirdBase);
      var shortstop = mapFunction(this.props.shortstop);
      var middleInfield = mapFunction(this.props.middleInfield);
      var cornerInfield = mapFunction(this.props.cornerInfield);
      var outfield = mapFunction(this.props.outfield);
      var utility = mapFunction(this.props.utility);
      var pitcher = mapFunction(this.props.pitcher);
      var disabledList = mapFunction(this.props.disabledList);
      var header = (
        <div className="row">
          <div className="col-md-3">
            <p><i>Pos</i></p>
          </div>
          <div className="col-md-7">
            <p><i>Name</i></p>
          </div>
          <div className="col-md-2">
            <p><i>Salary</i></p>
          </div>
        </div>
      );
      return (
        <div>
            <div className="row">
              <div className="col-md-12">
                <p className="header1">{this.props.title}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <p className="header2">Batters</p>
                  </div>
                </div>
                {header}
                {catcher}
                {firstBase}
                {secondBase}
                {thirdBase}
                {shortstop}
                {middleInfield}
                {cornerInfield}
                {outfield}
                {utility}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <p className="header2">Pitchers</p>
                  </div>
                </div>
                {header}
                {pitcher}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <p className="header2">Disabled List</p>
                  </div>
                </div>
                {header}
                {disabledList}
              </div>
            </div>
        </div>
      );
    }
  });

  var MinorsList = React.createClass({
    render: function() {
      var me = this;
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <p className="header1">{me.props.title}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <p><i>Pos</i></p>
            </div>
            <div className="col-md-7">
              <p><i>Name</i></p>
            </div>
            <div className="col-md-2">
              <p><i>Salary</i></p>
            </div>
          </div>
              {
                this.props.data.map(function(p) { 
                  return ( <Player key={p.id} data={p} onPlayerClick={me.props.onPlayerClick} />  ); 
                })
              }
        </div>
        );
    }
  });

  var DollarsAndPicksList = React.createClass({
    render: function() {
      var me = this;
      var pickFunction = function(pick) {
        var round = pick.round;
        var season = pick.season;

        var noteFunction = function(header, text) {
          return (
            <div>
              <div className="row">
                <div className="col-md-12 col-md-offset-2">
                  <p><i>{header}</i></p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-md-offset-4">
                  <p>{text}</p>
                </div>
              </div>
            </div>
          );
        }

        var swap = (<div/>);
        if(pick.swapTeam) {
          swap = noteFunction('Swap Team:', pick.swapTeam.name);
        }
        var original = (<div/>);
        if(pick.owningTeam.id != pick.originalTeam.id) {
          original = noteFunction('Original Team:', pick.originalTeam.name);
        }
        var note = (<div/>);
        if(pick.note != undefined) {
          note = noteFunction('Notes:', pick.note);
        }
        
        return ( 
          <div key={pick.id}>
            <div className="row">
              <div className="col-md-4">
                <p>{round}</p>
              </div>
              <div className="col-md-6">
                <p>{season}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {swap}
                {original}
                {note}
              </div>
            </div>
          </div>
        );
      };
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <p className="header1">Finances</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <p><i>Season</i></p>
            </div>
            <div className="col-md-6">
              <p><i>Type</i></p>
            </div>
            <div className="col-md-3">
              <p><i>Amount</i></p>
            </div>
          </div>
              {
                this.props.dollars.map(function(p) {
                  return ( 
                    <div className="row" key={p.id}>
                      <div className="col-md-3">
                        <p>{p.season}</p>
                      </div>
                      <div className="col-md-6">
                        <p>{p.draftDollarType.displayText}</p>
                      </div>
                      <div className="col-md-3">
                        <p>{p.amount}</p>
                      </div>
                    </div>
                  );
                })
              }
          <div className="row">
            <div className="col-md-12">
              <p className="header1">Picks</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p><i>Round</i></p>
            </div>
            <div className="col-md-6">
              <p><i>Season</i></p>
            </div>
          </div>
              {
                this.props.picks.map(function(k) {
                  return pickFunction(k);
                })
              }
        </div>
      );
    }
  });

  var Player = React.createClass({
    handlePlayerClick: function(e) {
      this.props.onPlayerClick(this.props.data);
    },
    render: function() {
      var playerName = this.props.data.name;
      var salary = this.props.data.currentSeason.salary;
      var fantasyPosition = '';
      if (this.props.data.currentSeason.fantasyPosition != undefined) {
        fantasyPosition = this.props.data.currentSeason.fantasyPosition.name;
      }
      var position = this.props.data.position.name;
      if (this.props.textStyle != 'full') {
        fantasyPosition = position;
      }
      var player = (
        <div className="row" onClick={this.handlePlayerClick}>
          <div className="col-md-3">
            <p>{fantasyPosition}</p>
          </div>
          <div className="col-md-7">
            <p className="clickable">{playerName}</p>
          </div>
          <div className="col-md-2">
            <p>{salary}</p>
          </div>
        </div>
      );
      return player;
    }
  });

  var Team = React.createClass({
    render: function() {
      if (this.props.team.name) {
        return (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h2>{this.props.team.name}</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p className="header2">Salary: {this.props.team.salary} <small>/ 400 
                    <a style={{'padding-left':'10px'}} target="_blank" 
                      href={"http://games.espn.go.com/flb/clubhouse?leagueId=216011&teamId=" + this.props.team.id + "&seasonId=2016"}>ESPN</a>
                    </small>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 playersLists">
                    <div className="row">
                      <div className="col-md-6 majors">
                        <PlayerList title="Major Leaguers" 
                                    onPlayerClick={this.props.onPlayerClick}
                                    catcher={this.props.team.catcher}
                                    firstBase={this.props.team.firstBase}
                                    secondBase={this.props.team.secondBase}
                                    thirdBase={this.props.team.thirdBase}
                                    shortstop={this.props.team.shortstop}
                                    middleInfield={this.props.team.middleInfield}
                                    cornerInfield={this.props.team.cornerInfield}
                                    outfield={this.props.team.outfield}
                                    utility={this.props.team.utility}
                                    pitcher={this.props.team.pitcher}
                                    disabledList={this.props.team.disabledList} />
                      </div>
                      <div className="col-md-6 minors">
                        <MinorsList title="Minor Leaguers" onPlayerClick={this.props.onPlayerClick} data={this.props.team.minorLeaguers} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 extrasLists">
                    <div className="row">
                      <div className="col-md-12">
                        <DollarsAndPicksList dollars={this.props.team.draftDollars} picks={this.props.team.minorLeaguePicks}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          );
      } else {
        return (
            <div />
          );
      }
    }
  });
  var TeamLink = React.createClass({
      linkClicked: function() {
        this.props.onTeamChange(this.props.teamId);
      },
      render: function() {
        return (
            <div className="row">
              <div className="col-md-12">
                <p className="clickable" onClick={this.linkClicked}>{this.props.name}</p>
              </div>
            </div>
          );
      }
  });
  var Search = React.createClass({
      getInitialState: function() {
        return { players: [] };
      },
      textChanged: function(e) {
        if(e.target.value.length == 0) {
          this.setState({players : [] });
        } else {
          $.ajax({
            url: '/player/search?name=' + e.target.value,
            dataType: 'json',
            cache: false,
            success: function(data) {
              this.setState({players: data});
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
          });
        }
      },
      render: function() {
        var me = this;
        return (
            <div>
              <h2>Player Search</h2>
              <input type="text" onKeyUp={this.textChanged} />
              {this.state.players.map(
                function(p) {
                  return ( <Player key={p.id} onPlayerClick={me.props.onPlayerClick} data={p} /> );
                }
              )}
            </div>
          );
      }
  });

  var PlayerPanel = React.createClass({
    getHeader: function(object, property, header) {
      if (object !== null && object !== undefined && object[property] !== undefined) {
        return (
          <div className="row">
            <div className="col-md-6">
              <p>{header}</p>
            </div>
            <div className="col-md-6">
              <p>{object[property]}</p>
            </div>
          </div>
        );
          return header + ': ';
      } else {
        return (<div/>);
      }
    },
    render: function() {
      var team = this.getHeader(this.props.data.currentSeason.team, 'name', 'Team');
      var salary = this.getHeader(this.props.data.currentSeason, 'salary', 'Salary');
      var keeperSeason = this.getHeader(this.props.data.currentSeason, 'keeperSeason', 'Keeper Season');
      var position = this.getHeader(this.props.data.position, 'name', 'Position');
      var fantasyPosition = this.getHeader(this.props.data.currentSeason.fantasyPosition, 'name', 'Fantasy Position');
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <h2>Player</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="header1">{this.props.data.name}</p>
            </div>
          </div>
              {team}
            
              {salary}
            
              {keeperSeason}
            
              {position}
            
              {fantasyPosition}
        </div>
        )
    }
  });
  var Controls = React.createClass({
      getInitialState: function() {
        return { 
          teams : [], 
          team: { }, 
          player: {
            player: {},
            currentSeason: {},
            position: {}
          } 
        }
      },
      componentDidMount: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({teams: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },
      handleTeamClick: function(teamId) {
        $.ajax({
          url: '/team/' + teamId,
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({team:data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },
      handlePlayerClick: function(player) {
        this.setState({player: player});
      },
      render: function() {
        var me = this;
        return (
            <div className="row">
              <div className="col-md-2">
                <div className="row">
                  <div className="col-md-12">
                    <h2>Teams</h2>
                  </div>
                </div>
              {this.state.teams.map(function(team) {
                return (
                  <TeamLink key={team.id} teamId={team.id} name={team.name} onTeamChange={me.handleTeamClick} />
                  );
              })}
              </div>
              <div className="col-md-6">
                <Team team={this.state.team} onPlayerClick={me.handlePlayerClick}/>
              </div>
              <div className="col-md-2">
                <PlayerPanel data={this.state.player}/>
              </div>
              <div className="col-md-2">
                <Search onPlayerClick={me.handlePlayerClick}/>
              </div>
            </div>
          );
      }
  });
  ReactDOM.render(
    <Controls url="/team"/>,
    document.getElementById('content')
  );