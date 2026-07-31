package com.dan.util;

import com.dan.model.Role;
import com.dan.model.RoleName;
import com.dan.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class RoleInsert {
    @Bean
    public CommandLineRunner demo(RoleRepository roleRepository) {
        return (args) -> {
            if (roleRepository.findByName(RoleName.ADMIN) == null) {
                Role role = new Role();
                role.setName(RoleName.ADMIN);
                roleRepository.save(role);
            }

            if (roleRepository.findByName(RoleName.TEACHER) == null) {
                Role role = new Role();
                role.setName(RoleName.TEACHER);
                roleRepository.save(role);
            }


            if (roleRepository.findByName(RoleName.STUDENT) == null) {
                Role role = new Role();
                role.setName(RoleName.STUDENT);
                roleRepository.save(role);
            }
        };
    }
}
