package com.homer.type.transaction;

import com.homer.type.BaseObject;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "draftDollarTransaction")
public class DraftDollarTransaction extends BaseTransaction {

    @Column
    private long draftDollarId;
    @Column
    private int amountTransacted;

    public long getDraftDollarId() {
        return draftDollarId;
    }

    public void setDraftDollarId(long draftDollarId) {
        this.draftDollarId = draftDollarId;
    }

    public int getAmountTransacted() {
        return amountTransacted;
    }

    public void setAmountTransacted(int amountTransacted) {
        this.amountTransacted = amountTransacted;
    }
}
