package com.homer.util.core;

import org.joda.time.DateTime;

/**
 * Created by arigolub on 2/14/16.
 */
public interface IDated {

    DateTime getCreatedDateUTC();
    void setCreatedDateUTC(DateTime createdDateUTC);

    DateTime getUpdatedDateUTC();
    void setUpdatedDateUTC(DateTime updatedDateUTC);
}
