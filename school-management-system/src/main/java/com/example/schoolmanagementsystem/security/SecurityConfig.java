package com.example.schoolmanagementsystem.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Other security configuration beans or methods

//    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//        httpSecurity.formLogin(Customizer.withDefaults());
//        httpSecurity.csrf().disable();
//        httpSecurity.headers().frameOptions().disable();
//        httpSecurity
//                .authorizeRequests()
//                .antMatchers("/test").hasAuthority("ADMIN")
//                .antMatchers("/h2-console/**").permitAll()
//                .anyRequest().authenticated();
//        return httpSecurity.build();
//    }

}