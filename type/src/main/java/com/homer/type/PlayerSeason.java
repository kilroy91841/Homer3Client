package com.homer.type;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "playerSeason")
public class PlayerSeason extends BaseObject {

    @Column
    private int season;
    @Column
    private long playerId;
    @Column
    private long teamId;
    @Column
    private String position;
    @Column
    private int keeperSeason;
    @Column
    private int salary;
    @Column
    private boolean isMinorLeaguer;

    public int getSeason() {
        return season;
    }

    public void setSeason(int season) {
        this.season = season;
    }

    public long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(long playerId) {
        this.playerId = playerId;
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public int getKeeperSeason() {
        return keeperSeason;
    }

    public void setKeeperSeason(int keeperSeason) {
        this.keeperSeason = keeperSeason;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public boolean isMinorLeaguer() {
        return isMinorLeaguer;
    }

    public void setMinorLeaguer(boolean minorLeaguer) {
        isMinorLeaguer = minorLeaguer;
    }
}
