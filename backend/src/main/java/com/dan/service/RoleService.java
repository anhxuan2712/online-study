package com.dan.service;

import com.dan.model.Role;
import com.dan.model.RoleName;

import java.util.Optional;

public interface RoleService {
    public Optional<Role> findByName(RoleName name);
}
