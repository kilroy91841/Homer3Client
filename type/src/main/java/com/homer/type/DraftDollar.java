package com.homer.type;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "draftDollar")
public class DraftDollar extends BaseObject {

    @Column
    private long teamId;
    @Column
    private String season;
    @Column
    private String draftType;
    @Column
    private int amount;

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getDraftType() {
        return draftType;
    }

    public void setDraftType(String draftType) {
        this.draftType = draftType;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
