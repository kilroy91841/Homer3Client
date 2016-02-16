package com.homer.type;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "minorLeaguePick")
public class MinorLeaguePick extends BaseObject {

    @Column
    private String season;
    @Column
    private long teamId;
    @Column
    private int round;
    @Column
    private int overallPick;
    @Column
    private Long playerId;
    @Column
    private boolean isSkipped;

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public int getRound() {
        return round;
    }

    public void setRound(int round) {
        this.round = round;
    }

    public int getOverallPick() {
        return overallPick;
    }

    public void setOverallPick(int overallPick) {
        this.overallPick = overallPick;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public boolean isSkipped() {
        return isSkipped;
    }

    public void setSkipped(boolean skipped) {
        isSkipped = skipped;
    }
}
