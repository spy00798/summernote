package com.board.summernote.Controller;

import com.board.summernote.Service.BoardService;
import com.board.summernote.database.dto.BoardDTO;
import com.board.summernote.database.dto.FileDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

@Controller
@RequestMapping(value = "/")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @RequestMapping(value = "/")
    public String ListPage(Model model) {
        return boardService.ListPage(model);
    }

    @RequestMapping(value = "/form")
    public String FormPage() {
        return boardService.FormPage();
    }

    @RequestMapping(value = "/view")
    public String ViewPage(BoardDTO boardDTO, Model model, FileDTO fileDTO) {
        return boardService.ViewPage(boardDTO, model, fileDTO);
    }

    @RequestMapping(value = "/update")
    public String UpdatePage(BoardDTO boardDTO, Model model, FileDTO fileDTO) {
        return boardService.UpdatePage(boardDTO, model, fileDTO);
    }

    @ResponseBody
    @RequestMapping(value = "/update.do")
    public String BoardUpdate(BoardDTO boardDTO, MultipartHttpServletRequest request, FileDTO fileDTO, @RequestParam(value = "ordList", required = false) List<Integer> ordlist) {
        return boardService.BoardUpdate(boardDTO, request, fileDTO, ordlist);
    }

    @ResponseBody
    @RequestMapping(value = "/insert.do", method = RequestMethod.POST)
    public String BoardInsert(BoardDTO boardDTO, MultipartHttpServletRequest request, FileDTO fileDTO) {
        return boardService.BoardInsert(boardDTO, request, fileDTO);
    }

    @ResponseBody
    @RequestMapping(value = "delete.do" ,method = RequestMethod.POST)
    public void BoardDelete(BoardDTO boardDTO) {
        boardService.BoardDelete(boardDTO);
    }

    @ResponseBody
    @RequestMapping(value = "selectfile.do", method = RequestMethod.POST)
    public List<FileDTO> SelectFileList(BoardDTO boardDTO) {
        return boardService.SelectFileList(boardDTO);
    }
}
