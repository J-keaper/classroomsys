package com.keaper.classroom.modal.filter;

public abstract class CommonFilter {
    private int pageSize;

    private int pageCount;

    public CommonFilter( int pageCount,int pageSize) {
        this.pageSize = pageSize;
        this.pageCount = pageCount;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }
}
