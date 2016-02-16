package com.homer.service;

import com.google.common.collect.Maps;
import com.homer.type.Player;
import com.homer.type.PlayerSeason;
import com.homer.util.data.Connector;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by arigolub on 2/15/16.
 */
public class PlayerService {

    public List<Player> getPlayersByName(String name) {
        Map<String, Object> map = Maps.newHashMap();
        map.put("name", name);
        return getPlayers(map);
    }

    public List<Player> getPlayersById(List<Long> ids) {
        Map<String, Object> map = Maps.newHashMap();
        map.put("id", ids);
        return getPlayers(map);
    }

    public List<Player> getPlayersByTeam(long teamId) {
        return getPlayersByTeam(teamId, null);
    }

    public List<Player> getPlayersByTeam(long teamId, Integer season) {
        Map<String, Object> map = Maps.newHashMap();
        map.put("teamId", teamId);
        if(season == null) {
            season = 2016;
        }
        map.put("season", season);
        List<PlayerSeason> playerSeasons = Connector.get(PlayerSeason.class, map);
        List<Long> playerIds = playerSeasons.stream().map(PlayerSeason::getPlayerId).collect(Collectors.toList());
        map.clear();
        map.put("id", playerIds);
        return getPlayers(map);
    }

    private List<Player> getPlayers(Map<String, Object> filters) {
        return Connector.get(Player.class, filters);
    }

}
