package com.homer.type.transaction;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "playerTransaction")
public class PlayerTransaction extends BaseTransaction {

    @Column
    private long playerId;
}
