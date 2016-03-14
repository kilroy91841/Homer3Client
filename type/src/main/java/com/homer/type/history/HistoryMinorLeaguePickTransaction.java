package com.homer.type.history;

import com.homer.type.transaction.MinorLeaguePickTransaction;
import com.homer.util.core.IHistoryObject;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "historyMinorLeaguePickTransaction")
public class HistoryMinorLeaguePickTransaction extends MinorLeaguePickTransaction implements IHistoryObject {

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
