package com.example.jflashcardsv0_9.exception;

import com.example.jflashcardsv0_9.dto.FlashcardSetDTORequest;
import com.example.jflashcardsv0_9.dto.FolderSetDTO;
import com.example.jflashcardsv0_9.dto.RegisterDTO;
import com.example.jflashcardsv0_9.dto.UserDTO;
import com.example.jflashcardsv0_9.entities.*;
import com.example.jflashcardsv0_9.repository.*;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.regex.Pattern;
@Component
public class Validate {
    UserRepository userRepository;
    FlashcardSetRepository flashcardSetRepository;
    FlashcardKanjiRepository flashcardKanjiRepository;
    FlashcardVocabRepository flashcardVocabRepository;
    FlashcardGrammarRepository flashcardGrammarRepository;
    ClassMemberRepository classMemberRepository;
    @Autowired
    public Validate(FlashcardSetRepository flashcardSetRepository, UserRepository userRepository, FlashcardKanjiRepository flashcardKanjiRepository, FlashcardVocabRepository flashcardVocabRepository, FlashcardGrammarRepository flashcardGrammarRepository, ClassMemberRepository classMemberRepository) {
        this.flashcardSetRepository = flashcardSetRepository;
        this.userRepository = userRepository;
        this.flashcardKanjiRepository = flashcardKanjiRepository;
        this.flashcardVocabRepository = flashcardVocabRepository;
        this.flashcardGrammarRepository = flashcardGrammarRepository;
        this.classMemberRepository = classMemberRepository;
    }

    // Định nghĩa các biểu thức chính quy
    private static final String EMAIL_REGEX = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$";
    private static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$";
    private static final String USERNAME_REGEX = "^[a-zA-Z0-9]+$";
    private static final String TITLE_REGEX = "^[^\\s][^&@]*$";
    private static final String CLASSNAME_REGEX = "^[^\\s][^&@]*$";
    private static final String DESCRIPTION_REGEX = "^[^\\n]*$";
    private static final String TERM_REGEX = "^[^\\s][^$]*$";
    private static final String CLASSCODE_REGEX = "^[a-z0-9]*$";
    private static final String COMMENT_REGEX = "^[^\\n]*$";
    private static final String NAME_REGEX = "^[^\\s!@#$%^&*()_+{}\\[\\]:;<>,.?~\\|\\/\\-][^!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\\\|\\/\\-]*[^\\s!@#$%^&*()_+{}\\[\\]:;<>,.?~\\\\\\|\\/\\-]$";
    private static final int minLengthUsername = 4;
    private static final int minLengthName = 2;
    private static final int maxLengthUsername = 30;
    private static final int maxLength = 255;
    private static final int maxLengthTitle = 50;
    // Thêm các phương thức kiểm tra
    public void validateEmail(String email) {
        if(email == "" || email == null){
            throw new AppException(Error.EMAIL_USER_NULL);
        }
        if (!Pattern.matches(EMAIL_REGEX, email)) {
            throw new AppException(Error.EMAIL_ERROR_MESSAGE);
        }
        if (userRepository.existsByEmail(email)) {
            throw new AppException(Error.EMAIL_USER_EXIST);
        }
    }
    public void validatePassword(String password) {
        if(password == "" || password == null){
            throw new AppException(Error.PASS_USER_NULL);
        }
        if (!Pattern.matches(PASSWORD_REGEX, password)) {
            throw new AppException(Error.PASSWORD_ERROR_MESSAGE);
        }
    }
    public void validateUsername(String userName) {
        if(userName == "" || userName == null){
            throw new AppException(Error.USERNAME_USER_NULL);
        }
        if (!Pattern.matches(USERNAME_REGEX, userName)) {
            throw new AppException(Error.USERNAME_ERROR_MESSAGE);
        }
        if (userRepository.existsByUserName(userName)) {
            throw new AppException(Error.USERNAME_USER_EXIST);
        }
        if (userName.length() < minLengthUsername) {
            throw new AppException(Error.USERNAME_MIN_LENGTH);
        }
        if (userName.length() > maxLengthUsername) {
            throw new AppException(Error.USERNAME_MAX_LENGTH);
        }
    }
    public void validateName(String name) {
        if(name == "" || name == null){
            throw new AppException(Error.NAME_USER_NULL);
        }
        if (!Pattern.matches(NAME_REGEX, name)) {
            throw new AppException(Error.NAME_ERROR_MESSAGE);
        }
        if (name.length() < minLengthName) {
            throw new AppException(Error.NAME_MIN_LENGTH);
        }
        if (name.length() > maxLengthUsername) {
            throw new AppException(Error.USERNAME_MAX_LENGTH);
        }
    }

    public void validateTitle(String title){
        if(title == "" || title == null){
            throw new AppException(Error.TITLE_USER_NULL);
        }
        if (!Pattern.matches(TITLE_REGEX, title)) {
            throw new AppException(Error.TITLE_ERROR_MESSAGE);
        }
        if (title.length() < minLengthName) {
            throw new AppException(Error.TITLE_MIN_LENGTH);
        }
        if (title.length() > maxLengthTitle) {
            throw new AppException(Error.TITLE_MAX_LENGTH);
        }
    }
    public void validateDescription(String description){
        if (!Pattern.matches(DESCRIPTION_REGEX, description)) {
            throw new AppException(Error.DESCRIPTION_ERROR_MESSAGE);
        }
        if (description.length() > maxLength) {
            throw new AppException(Error.DESCRIPTION_MAX_LENGTH);
        }
    }
    public void validateTerm(String term){
        if(term == "" || term == null){
            throw new AppException(Error.TERM_NULL);
        }
        if (!Pattern.matches(TERM_REGEX, term)) {
            throw new AppException(Error.TERM_ERROR_MESSAGE);
        }
        if (term.length() > maxLengthTitle) {
            throw new AppException(Error.TERM_MAX_LENGTH);
        }
    }
    public void validateMean(String mean){
        if(mean == "" || mean == null){
            throw new AppException(Error.MEAN_USER_NULL);
        }
        if (!Pattern.matches(TERM_REGEX, mean)) {
            throw new AppException(Error.MEAN_ERROR_MESSAGE);
        }
        if (mean.length() > maxLengthTitle) {
            throw new AppException(Error.MEAN_MAX_LENGTH);
        }
    }

    public void checkRegisterDTO(RegisterDTO registerDTO) {
        validateUsername(registerDTO.getUserName());
        validateEmail(registerDTO.getEmail());
        validatePassword(registerDTO.getPassword());
        validateName(registerDTO.getFirstName());
        validateName(registerDTO.getLastName());
    }
    public void checkUserDTO(UserDTO userDTO) {
        validateUsername(userDTO.getUserName());
        validateEmail(userDTO.getEmail());
        validatePassword(userDTO.getPassword());
        validateName(userDTO.getFirstName());
        validateName(userDTO.getLastName());
        }
    public  void checkFolder(FolderSetDTO folderSetDTO)  {
        validateTitle(folderSetDTO.getTitle());
        validateDescription(folderSetDTO.getDescription());
    }
    public  void checkFlashCardSet( FlashcardSetDTORequest flashcardSetDTORequest)  {
        validateTitle(flashcardSetDTORequest.getTitle());
        validateDescription(flashcardSetDTORequest.getDescription());
    }
    public void checkAuthSetFound(User user,long setId) {
        FlashcardSet flashcardSet = flashcardSetRepository.getFlashcardSetByFlashcardSetId(setId);
        if(!flashcardSetRepository.existsFlashcardSetByFlashcardSetId(setId)){
            throw new AppException(Error.SET_NOT_FOUND);
        }
        if (!isCreatorOrManager(user, flashcardSet)) {
            throw new AppException(Error.AUTH_GI_DO);
        }
    }
    private boolean isCreatorOrManager(User user, FlashcardSet flashcardSet) {
        // Check if the user is the creator
        if (flashcardSet.getUser().getUserId() == user.getUserId()) {
            return true;
        }
        // Check if the user has a manager role
        Set<Role> userRoles = user.getRoles();
        for (Role role : userRoles) {
            if ("ROLE_MANAGER".equals(role.getName())) {
                return true;
            }
        }

        return false;
    }
    public void checkExistsSet(long setId){
        if(!flashcardSetRepository.existsFlashcardSetByFlashcardSetId(setId)){
            throw new AppException(Error.SET_NOT_FOUND);
        }
    }



    public void checkClassMember(User user, ClassRoom classRoom) {
        if(!classMemberRepository.existsClassMemberByClassroomAndUser(classRoom,user)){
            throw new AppException(Error.USER_CLASS_FOUND);
        }

    }

}
