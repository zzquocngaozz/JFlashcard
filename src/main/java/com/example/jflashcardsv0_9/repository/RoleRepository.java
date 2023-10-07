package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
    Optional<Role> findByRoleId(int roleId);

    Role findRoleByName(String name);

    public Role save(Role role);
}
