package com.homer.type.history;

import com.homer.type.PlayerSeason;
import com.homer.util.core.IHistoryObject;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "historyPlayerSeason")
public class HistoryPlayerSeason extends PlayerSeason implements IHistoryObject {

    @Column
    private long objectId;

    @Override
    public long getObjectId() {
        return objectId;
    }

    @Override
    public void setObjectId(long objectId) {
        this.objectId = objectId;
    }
}
