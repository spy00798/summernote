package com.board.summernote.database.mapper;

import com.board.summernote.database.dto.BoardDTO;
import com.board.summernote.database.dto.FileDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    List<BoardDTO> findAll();
    BoardDTO findByIdx(BoardDTO boardDTO);
    void updateByIdx(BoardDTO boardDTO);
    void removeByIdx(BoardDTO boardDTO);
    void insertBoard(BoardDTO boardDTO);
    void insertFile(FileDTO fileDTO);
    void deleteFile(BoardDTO boardDTO);
    List<FileDTO> findFile(BoardDTO boardDTO);
    int countFile(BoardDTO boardDTO);
}
