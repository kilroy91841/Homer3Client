package com.homer.type.transaction;

import com.homer.type.BaseObject;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "minorLeaguePickTransaction")
public class MinorLeaguePickTransaction extends BaseTransaction {

    @Column
    private long minorLeaguePickId;
}
