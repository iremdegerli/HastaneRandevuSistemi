package com.example.randevu.controller;

import com.example.randevu.entity.User;
import com.example.randevu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/identity/{identityNumber}")
    public ResponseEntity<User> getUserByIdentityNumber(@PathVariable String identityNumber) {
        Optional<User> user = userService.findByIdentityNumber(identityNumber);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    // Kullanıcı güncelleme veya silme gibi işlemler eklenebilir
}
