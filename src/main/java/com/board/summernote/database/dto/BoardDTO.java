package com.board.summernote.database.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter @Setter
public class BoardDTO {

    private int idx;
    private String title;
    private String content;
    private Date bdDate;
}
