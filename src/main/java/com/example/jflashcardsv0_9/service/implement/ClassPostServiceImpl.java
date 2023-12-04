package com.example.jflashcardsv0_9.service.implement;

import com.example.jflashcardsv0_9.dto.ClassPostDTO;
import com.example.jflashcardsv0_9.dto.CommentDTO;
import com.example.jflashcardsv0_9.dto.IdDTO;
import com.example.jflashcardsv0_9.entities.ClassPost;
import com.example.jflashcardsv0_9.entities.Comment;
import com.example.jflashcardsv0_9.entities.User;
import com.example.jflashcardsv0_9.exception.AppException;
import com.example.jflashcardsv0_9.exception.Error;
import com.example.jflashcardsv0_9.mapper.ClassCommentMapper;
import com.example.jflashcardsv0_9.mapper.ClassPostMapper;
import com.example.jflashcardsv0_9.repository.ClassPostRepository;
import com.example.jflashcardsv0_9.repository.CommentRepository;
import com.example.jflashcardsv0_9.security.MyUserDetail;
import com.example.jflashcardsv0_9.service.ClassPostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ClassPostServiceImpl implements ClassPostService {

    @Autowired
    ClassPostRepository classPostRepository;

    @Autowired
    CommentRepository commentRepository;

    @Override
    public ClassPostDTO createClassPost(ClassPostDTO classPostDTO, MyUserDetail myUserDetail) {
        // Convert ClassPostDTO to ClassPost entity using ClassPostMapper (implementation needed)
        ClassPost classPost = ClassPostMapper.toClassPostEntity(classPostDTO);
        classPost.setUser(myUserDetail.getUser());
        classPost.setCommentList(new ArrayList<>());
        ClassPost savePost = classPostRepository.save(classPost);
        // Save the entity to the repository
        // Return the ID of the created ClassPost
        return ClassPostMapper.toClassPostDTO(savePost); // Replace with actual logic
    }

    @Override
    public List<ClassPostDTO> getClassPostsByClassroomId(Long classRoomId) {
        // Retrieve all ClassPosts from the repository and convert them to ClassPostDTOs using ClassPostMapper
        List<ClassPost> postList = classPostRepository.findAllByClassroomClassRoomIdOrderByCreatedAtDesc(classRoomId);
        // Return the list of ClassPostDTOs
        return postList.stream()
                .map(ClassPostMapper::toClassPostDTO)
                .collect(Collectors.toList()); // Replace with actual logic
    }

    @Override
    public void updateClassPost(ClassPostDTO classPostDTO, MyUserDetail myUserDetail) {
        // Retrieve the ClassPost entity by ID from the repository
        Optional<ClassPost>existPost = classPostRepository.getClassPostByClassPostId(classPostDTO.getClassPostId());
        if(existPost.isEmpty()) throw new AppException(Error.valueOf("Bài đăng không tồn tại"));
        ClassPost cachePost = existPost.get();
        cachePost.setContent(classPostDTO.getContent());
        classPostRepository.save(cachePost);
    }

    @Override
    public void deleteClassPost(long classPostId, MyUserDetail myUserDetail) {
        // Retrieve the ClassPost entity by ID from the repository
        Optional<ClassPost> classPostOptional = classPostRepository.findById(classPostId);

        if (classPostOptional.isPresent()) {
            ClassPost classPost = classPostOptional.get();

            // Check if the user has permission to delete the ClassPost
            // Add your permission check logic here, e.g., check if the user is the creator of the post or has the necessary role/privilege

            // Delete the entity from the repository
            classPostRepository.delete(classPost);
        } else {
            throw new AppException(Error.valueOf("Lỗi không xóa được class post")); // Handle the case where the ClassPost with the given ID doesn't exist
        }
    }

    @Override
    public CommentDTO createComment(CommentDTO commentDTO, MyUserDetail myUserDetail) {
        Comment comment = ClassCommentMapper.toCommentEntity(commentDTO);
        comment.setUser(myUserDetail.getUser());
        Comment saveComment = commentRepository.save(comment);
        return ClassCommentMapper.toCommentDTO(saveComment);
    }

    @Override
    public void deleteComment(long commentId, MyUserDetail myUserDetail) {
        commentRepository.delete(Comment.builder().commentId(commentId).build());
    }


}
