package com.homer.util.data;

import javax.persistence.Column;
import javax.persistence.Table;

/**
 * Created by arigolub on 2/14/16.
 */
@Table(name = "test")
public class ChildObject extends BaseObject {

    @Column(name = "longObject")
    private Long longObject;
    @Column(name = "count")
    private int count;
    @Column(name = "name")
    private String name;
    @Column(name = "myBool")
    private boolean myBool;

    public Long getLongObject() {
        return longObject;
    }

    public void setLongObject(Long longObject) {
        this.longObject = longObject;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isMyBool() {
        return myBool;
    }

    public void setMyBool(boolean myBool) {
        this.myBool = myBool;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ChildObject that = (ChildObject) o;

        if (count != that.count) return false;
        if (myBool != that.myBool) return false;
        if (longObject != null ? !longObject.equals(that.longObject) : that.longObject != null) return false;
        return name.equals(that.name);

    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (longObject != null ? longObject.hashCode() : 0);
        result = 31 * result + count;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (myBool ? 1 : 0);
        return result;
    }

    @Override
    public String toString() {
        return "ChildObject{" +
                "longObject=" + longObject +
                ", count=" + count +
                ", myBool=" + myBool +
                ", name='" + name + '\'' +
                '}';
    }
}