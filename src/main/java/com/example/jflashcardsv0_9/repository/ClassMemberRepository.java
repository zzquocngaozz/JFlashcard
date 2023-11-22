package com.example.jflashcardsv0_9.repository;

import com.example.jflashcardsv0_9.entities.ClassMember;
import com.example.jflashcardsv0_9.entities.ClassRoom;
import com.example.jflashcardsv0_9.entities.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ClassMemberRepository extends JpaRepository<ClassMember,Long> {
    List<ClassMember> findAllByClassroom(ClassRoom classRoom);
    long countClassMembersByClassroom(ClassRoom classRoom);
    List<ClassMember> findAllByUser(User user);
    ClassMember save(ClassMember classMember);
    ClassMember getClassMemberByClassroomAndUser(ClassRoom room, User user);

    List<ClassMember> getAllByClassroom(ClassRoom room);

    boolean existsClassMemberByClassroomAndUser(ClassRoom room, User user);

    @Query("SELECT cm.classroom " +
            "FROM ClassMember cm " +
            "INNER JOIN cm.classroom cr " +
            "WHERE cm.user = :user " +
            "ORDER BY cr.createdAt DESC")
    List<ClassRoom> findTop3NewestClassroomsByUser(@Param("user") User user, Pageable pageable);
    @Query("SELECT cm.classroom " +
            "FROM ClassMember cm " +
            "GROUP BY cm.classroom " +
            "ORDER BY COUNT(cm.user) DESC")
    List<ClassRoom> getClassRoomWithMaxUsers(Pageable pageable);
    Long countDistinctByUser(User user);
    Long countDistinctByClassroomInAndUserNot(List<ClassRoom> classRooms,User user);
}
