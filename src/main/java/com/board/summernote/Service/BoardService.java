package com.board.summernote.Service;

import com.board.summernote.database.dto.BoardDTO;
import com.board.summernote.database.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardMapper boardMapper;

    public String ListPage(BoardDTO boardDTO, Model model) {
        model.addAttribute("getList", boardMapper.findAll());
        return "list";
    }

    public String ViewPage(BoardDTO boardDTO, Model model) {
        model.addAttribute("board", boardMapper.findByIdx(boardDTO));
        return "view";
    }

    public String UpdatePage(BoardDTO boardDTO, Model model) {
        model.addAttribute("board", boardMapper.findByIdx(boardDTO));

        return "updateForm";
    }

    public String FormPage() {
        return "insertForm";
    }

    public void BoardInsert(BoardDTO boardDTO) {
        boardMapper.insertBoard(boardDTO);
    }

    public void BoardDelete(BoardDTO boardDTO) {
        boardMapper.removeByIdx(boardDTO);
    }
}
