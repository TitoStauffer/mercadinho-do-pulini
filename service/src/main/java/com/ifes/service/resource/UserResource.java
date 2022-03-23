package com.ifes.service.resource;

import com.ifes.service.service.UserService;
import com.ifes.service.service.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserResource {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> index() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
        return  new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return  new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<UserDTO> findByCPF(@PathVariable String cpf) {
        return  new ResponseEntity<>(userService.findByCPF(cpf), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> save(@RequestBody String cpf) {
        return  new ResponseEntity<>(userService.findByCPF(cpf), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<UserDTO> save(@RequestBody UserDTO userDTO) {
        return  new ResponseEntity<>(userService.save(userDTO), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<UserDTO> update(@RequestBody UserDTO userDTO) {
        return  new ResponseEntity<>(userService.save(userDTO), HttpStatus.OK);
    }



}
