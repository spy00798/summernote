package com.board.summernote.database.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class FileDTO {

    private long idx;
    private String filename;
    private String path;
    private long filesize;
    private String uuid;
    private String ext;
    private long ord;

    private long refIdx;
    private String refType;

    private List<String> filenameList;
    private List<String> filesizeList;
    private List<String> uuidList;
    private List<String> extList;
}
