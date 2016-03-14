package com.homer.type;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "team")
public class Team extends BaseObject {

    @Column
    private String teamName;
    @Column
    private String owner1;
    @Column
    private String owner2;

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getOwner1() {
        return owner1;
    }

    public void setOwner1(String owner1) {
        this.owner1 = owner1;
    }

    public String getOwner2() {
        return owner2;
    }

    public void setOwner2(String owner2) {
        this.owner2 = owner2;
    }
}
