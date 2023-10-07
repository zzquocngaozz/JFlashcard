package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.entities.Role;
import com.example.jflashcardsv0_9.repository.RoleRepository;
import com.example.jflashcardsv0_9.repository.UserRepository;
import com.example.jflashcardsv0_9.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepository roleRepository;
    @Override
    public Integer getRoleIdByRoleName(String roleName) {
        Role role = roleRepository.findByName(roleName).get();
        if (role != null) {
            return role.getRoleId();
        }
        return null; // Trả về null nếu không tìm thấy roleName
    }
}
