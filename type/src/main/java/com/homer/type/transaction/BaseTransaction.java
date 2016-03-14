package com.homer.type.transaction;

import com.homer.type.BaseObject;

/**
 * Created by arigolub on 2/14/16.
 */
public class BaseTransaction extends BaseObject {

    private long inboundTeamId;
    private long outboundTeamId;

    public long getInboundTeamId() {
        return inboundTeamId;
    }

    public void setInboundTeamId(long inboundTeamId) {
        this.inboundTeamId = inboundTeamId;
    }

    public long getOutboundTeamId() {
        return outboundTeamId;
    }

    public void setOutboundTeamId(long outboundTeamId) {
        this.outboundTeamId = outboundTeamId;
    }
}
