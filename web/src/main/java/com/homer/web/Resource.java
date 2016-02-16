package com.homer.web;

import com.google.common.collect.Lists;
import com.homer.service.PlayerService;
import com.homer.type.Player;
import com.homer.type.view.TeamView;
import com.homer.util.data.Connector;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by arigolub on 2/14/16.
 */
@Path("/")
public class Resource {

    private PlayerService playerService;

    public Resource() {
        playerService = new PlayerService();
    }

    @Path("player/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public List<Player> getPlayers(@PathParam(value = "id") long id) {
        return playerService.getPlayersById(Lists.newArrayList(id));
    }

    @Path("team/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public TeamView getTeam(@PathParam(value = "id") long id,
                            @QueryParam(value = "season") Integer season) {
        TeamView teamView = new TeamView();
        teamView.setPlayers(playerService.getPlayersByTeam(id, season));
        return teamView;
    }
}
