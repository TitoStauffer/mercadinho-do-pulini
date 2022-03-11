package com.ifes.service.resource;

import com.ifes.service.service.UserService;
import com.ifes.service.service.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserResource {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> index() {
        return  new ResponseEntity<List<UserDTO>>(userService.findAll(), HttpStatus.OK);
    }



}
