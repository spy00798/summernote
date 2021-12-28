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
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardMapper boardMapper;
    private String UPLOAD_PATH = "C:\\images\\";

    public String ListPage(Model model) {
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

    public String BoardInsert(BoardDTO boardDTO, MultipartHttpServletRequest request, FileDTO fileDTO) {
        List<MultipartFile> files = request.getFiles("file");
        List ordList = new ArrayList<>();

        for (int i = 1; i <= files.size(); i++) {
            ordList.add(i);
        }

        boardMapper.insertBoard(boardDTO);




        return insertFile(files, fileDTO, boardDTO, ordList);

    }

    public void BoardDelete(BoardDTO boardDTO) {
        boardMapper.deleteFile(boardDTO);
        boardMapper.removeByIdx(boardDTO);
    }

    public String BoardUpdate(BoardDTO boardDTO, MultipartHttpServletRequest request, FileDTO fileDTO, List<Integer> ordList) {
        boardMapper.updateByIdx(boardDTO);

        List<MultipartFile> requestFiles = request.getFiles("fileList");
        if (requestFiles != null && !requestFiles.isEmpty()){
            boardMapper.deleteFile(boardDTO); //reset File
        }
        int fileindex = 0;

        List<String> filenameList = fileDTO.getFilenameList();
        List<String> filesizeList = fileDTO.getFilesizeList();
        List<String> uuidList = fileDTO.getUuidList();
        List<String> extList = fileDTO.getExtList();

        //기존파일 Update처리
        for (int i = 0; i < filenameList.size(); i++) {
            fileDTO.setFilename(filenameList.get(i));
            fileDTO.setFilesize(Long.parseLong(filesizeList.get(i)));
            fileDTO.setUuid(uuidList.get(i));
            fileDTO.setExt(extList.get(i));
            fileDTO.setPath(UPLOAD_PATH);
            fileDTO.setOrd(ordList.get(fileindex));
            fileDTO.setRefIdx(boardDTO.getIdx());
            fileDTO.setRefType("notice");
            boardMapper.insertFile(fileDTO);
            fileindex++;
        }

        //신규파일 Update처리
        return insertFile(requestFiles, fileDTO, boardDTO, ordList);
    }

    public List<FileDTO> SelectFileList(BoardDTO boardDTO) {
       return boardMapper.findFile(boardDTO);
    }

    public String insertFile(List<MultipartFile> requestFiles, FileDTO fileDTO, BoardDTO boardDTO, List<Integer> ordList) {

        String data = "";

        if (requestFiles != null && !requestFiles.isEmpty()) {
            int fileindex = 0;
            if (fileDTO.getFilenameList() != null && !fileDTO.getFilenameList().isEmpty()) { //기존 파일이 있는 지 체크
                fileindex = fileDTO.getFilenameList().size();
            }
            for (MultipartFile mf : requestFiles) {
                String orgname = mf.getOriginalFilename();
                long fileSize = mf.getSize();
                String extension = orgname.substring(orgname.lastIndexOf(".") + 1);
                UUID uuid = UUID.randomUUID();
                orgname = orgname.substring(0, orgname.indexOf("."));
                fileDTO.setFilename(orgname);
                fileDTO.setPath(UPLOAD_PATH);
                fileDTO.setFilesize(fileSize);
                fileDTO.setExt(extension);
                fileDTO.setUuid(String.valueOf(uuid));
                fileDTO.setOrd(ordList.get(fileindex));
                fileDTO.setRefIdx(boardDTO.getIdx());
                fileDTO.setRefType("notice");

                String saveFile = UPLOAD_PATH + uuid + "." + extension;

                try {
                    if (ordList.get(fileindex) > 5) {
                        break;
                    } else {
                        mf.transferTo(new File(saveFile));
                        System.out.println("----------SaveFile Info----------");
                        System.out.println("filename : " + orgname);
                        System.out.println("filesize : " + fileSize + " B");
                        System.out.println("filepath : " + UPLOAD_PATH);
                        System.out.println("fileorder : " + ordList.get(fileindex));
                        System.out.println("fileExt : " + extension);
                        System.out.println("uuid : " + uuid);
                        boardMapper.insertFile(fileDTO);
                        fileindex++;
                    }

                } catch (IllegalStateException e) {
                    data = "request error";
                } catch (IOException e) {
                    e.printStackTrace();
                    data = "File Error";
                }
            }
        }
        return data;
    }
}
