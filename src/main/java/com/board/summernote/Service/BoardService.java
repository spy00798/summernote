package com.board.summernote.Service;

import com.board.summernote.database.dto.BoardDTO;
import com.board.summernote.database.dto.FileDTO;
import com.board.summernote.database.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardMapper boardMapper;

    public String ListPage(BoardDTO boardDTO, Model model) {
        model.addAttribute("getList", boardMapper.findAll());
        return "list";
    }

    public String ViewPage(BoardDTO boardDTO, Model model, FileDTO fileDTO) {
        model.addAttribute("board", boardMapper.findByIdx(boardDTO));
        return "view";
    }

    public String UpdatePage(BoardDTO boardDTO, Model model, FileDTO fileDTO) {
        model.addAttribute("board", boardMapper.findByIdx(boardDTO));

        return "updateForm";
    }

    public String FormPage() {
        return "insertForm";
    }

    public void BoardInsert(BoardDTO boardDTO, MultipartHttpServletRequest request, FileDTO fileDTO) {
        List<MultipartFile> files = request.getFiles("file");
        String path = "C:\\images\\";

        boardMapper.insertBoard(boardDTO);

        if (files != null && !files.isEmpty()) {
            int i = 1;
            for (MultipartFile mf : files) {
                String orgname = mf.getOriginalFilename();
                long fileSize = mf.getSize();
                String extension = orgname.substring(orgname.lastIndexOf(".") + 1);
                UUID uuid = UUID.randomUUID();
                orgname = orgname.substring(0, orgname.indexOf("."));
                fileDTO.setFilename(orgname);
                fileDTO.setPath(path);
                fileDTO.setFilesize(fileSize);
                fileDTO.setOrd(i);
                fileDTO.setExt(extension);
                fileDTO.setUuid(String.valueOf(uuid));
                fileDTO.setRefType("notice");
                String saveFile = path + uuid + "." + extension;

                try {
                    if (i > 5) {
                        i = -1;
                        break;
                    } else {
                        File file = new File(saveFile);
                        file.mkdir();
                        mf.transferTo(file);
                        System.out.println("----------SaveFile Info----------");
                        System.out.println("filename : " + orgname);
                        System.out.println("filesize : " + fileSize + " B");
                        System.out.println("filepath : " + path);
                        System.out.println("fileorder : " + i);
                        System.out.println("fileExt : " + extension);
                        System.out.println("uuid : " + uuid);
                        boardMapper.insertFile(fileDTO);
                    }
                    i++;
                } catch (IllegalStateException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public void BoardDelete(BoardDTO boardDTO) {
        boardMapper.deleteFile(boardDTO);
        boardMapper.removeByIdx(boardDTO);
    }

    public void BoardUpdate(BoardDTO boardDTO, MultipartHttpServletRequest request, FileDTO fileDTO) {

        List<MultipartFile> requestFiles = request.getFiles("file");
        String path = "C:\\images\\";
        for(MultipartFile mf : requestFiles) {
            System.out.println("----added file----");
            String orgname = mf.getOriginalFilename();
            long fileSize = mf.getSize();
            String extension = orgname.substring(orgname.lastIndexOf(".") + 1);
            UUID uuid = UUID.randomUUID();
            orgname = orgname.substring(0, orgname.indexOf("."));
            fileDTO.setFilename(orgname);
            fileDTO.setPath(path);
            fileDTO.setFilesize(fileSize);
            fileDTO.setExt(extension);
            fileDTO.setUuid(String.valueOf(uuid));
            fileDTO.setRefIdx(boardDTO.getIdx());
            fileDTO.setRefType("notice");
        }

        boardMapper.deleteFile(boardDTO);
        boardMapper.insertFile(fileDTO);
        boardMapper.updateByIdx(boardDTO);
    }

    public List<FileDTO> SelectFileList(BoardDTO boardDTO) {
       return boardMapper.findFile(boardDTO);
    }

}
