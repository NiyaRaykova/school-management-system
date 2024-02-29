package com.example.schoolmanagementsystem.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

//@RequiredArgsConstructor
//public enum Role {
//
//    ADMIN,
//    STUDENT,
//    TEACHER
//
//}

@RequiredArgsConstructor
public enum Role {

    ADMIN("admin_permission"),
    STUDENT("admin_permission"),
    PARENT("admin_permission"),

    ;

    @Getter
    private final String permission;
}