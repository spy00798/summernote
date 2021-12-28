package com.board.summernote.database.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class FileDTO {

    private long idx;
    private String filename;  // 파일 이름
    private String path;      // 파일 저장 경로
    private long filesize;    // 파일 크기
    private String uuid;      // 파일의 고유식별자
    private String ext;       // 파일 확장자
    private long ord;         // 파일 순서

    private long refIdx;      // 파일이 있는 게시판 번호
    private String refType;   // 파일이 어떤 게시판에 있는지를 구별

    private List<String> filenameList;
    private List<String> filesizeList;
    private List<String> uuidList;
    private List<String> extList;
}
