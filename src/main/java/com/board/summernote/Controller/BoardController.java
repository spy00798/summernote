package com.board.summernote.Controller;

import com.board.summernote.Service.BoardService;
import com.board.summernote.database.dto.BoardDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping(value = "/")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @RequestMapping(value = "/")
    public String ListPage(BoardDTO boardDTO, Model model) {
        return boardService.ListPage(boardDTO, model);
    }

    @RequestMapping(value = "/form")
    public String FormPage() {
        return boardService.FormPage();
    }

    @RequestMapping(value = "/view")
    public String ViewPage(BoardDTO boardDTO, Model model) {
        return boardService.ViewPage(boardDTO, model);
    }

    @RequestMapping(value = "/update")
    public String UpdatePage(BoardDTO boardDTO, Model model) {
        return boardService.UpdatePage(boardDTO, model);
    }

    @ResponseBody
    @RequestMapping(value = "/update.do")
    public void BoardUpdate(BoardDTO boardDTO) {
        boardService.BoardUpdate(boardDTO);
    }

    @ResponseBody
    @RequestMapping(value = "/insert.do", method = RequestMethod.POST)
    public void BoardInsert(BoardDTO boardDTO, MultipartFile[] files) {
         boardService.BoardInsert(boardDTO, files);
    }

    @ResponseBody
    @RequestMapping(value = "delete.do" ,method = RequestMethod.POST)
    public void BoardDelete(BoardDTO boardDTO) {
        boardService.BoardDelete(boardDTO);
    }
}
