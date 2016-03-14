package com.homer.type.history;

import com.homer.type.MinorLeaguePick;
import com.homer.util.core.IHistoryObject;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "historyMinorLeaguePick")
public class HistoryMinorLeaguePick extends MinorLeaguePick implements IHistoryObject {

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
