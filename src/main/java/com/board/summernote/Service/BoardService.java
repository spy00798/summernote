package com.board.summernote.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {

    public String FormPage() {
        return "form";
    }
}
