package com.board.summernote.database.dto;

import lombok.Getter;
import lombok.Setter;

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
}
