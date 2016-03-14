package com.homer.type.view;

import com.homer.type.Player;
import com.homer.type.Team;

import java.util.List;

/**
 * Created by arigolub on 2/15/16.
 */
public class TeamView {

    private Team team;
    private List<Player> players;

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }
}
