package com.homer.type;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "player")
public class Player extends BaseObject {

    @Column
    private String name;
    @Column
    private String mlbTeam;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMlbTeam() {
        return mlbTeam;
    }

    public void setMlbTeam(String mlbTeam) {
        this.mlbTeam = mlbTeam;
    }
}
