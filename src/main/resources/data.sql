-- Insert data for the 'role' table
INSERT INTO `db_jflashcards`.`role` (`role_id`, `role_name`)
VALUES
    (1, 'ROLE_LEARNER'),
    (2, 'ROLE_TEACHER'),
    (3,'ROLE_ADMIN');
-- Add more role data entries here...
-- Insert data for the 'users' table
INSERT INTO `db_jflashcards`.`users` (`birth`, `email`, `first_name`, `islooked`, `isverify`, `last_name`, `password`, `user_name`)
VALUES
    ('1990-01-01', 'user1@example.com', 'John', 0, 0, 'Doe', 'Qwer1234', 'john_doe'),
    ('1995-02-15', 'user2@example.com', 'Jane', 0, 0, 'Smith', 'Qwer1234', 'jane_smith');
-- Add more user data entries here...
-- typu 1 == kạnji , 2 = tu vung , 3 =  ngu phap
-- Insert data for the 'flashcardset' table
INSERT INTO `db_jflashcards`.`flashcardset` (`created_at`, `description`, `isprivate`, `title`, `type`, `user`)
VALUES
    ('2023-01-10', 'Flashcard set for beginners', 0, 'kanji Flashcards', 1, 1),
    ('2023-01-10', 'Flashcard set for beginners', 0, 'grammar Flashcards', 3, 1),
    ('2023-02-20', 'Advanced flashcard set', 1, 'vocab Flashcards', 2, 2);
-- Add more flashcard set data entries here...
-- Insert data for the 'flashcard_grammar' table
INSERT INTO `db_jflashcards`.`flashcard_grammar` (`combination`, `example`, `example_mean`, `img_url`, `mean`, `note`, `term`, `flashcard_set_id`)
VALUES
    ('Noun + Verb', 'I eat', 'Tôi ăn', NULL, 'Eat', NULL, 'Eat', 2),
    ('Adjective + Noun', 'The red apple', 'Quả táo đỏ', 'https://example.com/apple.jpg', 'Red apple', 'This is a juicy red apple.', 'Red apple', 2);
-- Add more flashcard_grammar data entries here...

-- Insert data for the 'flashcard_kanji' table
INSERT INTO `db_jflashcards`.`flashcard_kanji` (`chinese_sound`, `example`, `example_mean`, `img_url`, `kun_sound`, `mean`, `on_sound`, `term`, `trick`, `flashcard_set_id`)
VALUES
    ('音', '音楽', 'Music', NULL, 'おん', 'Music', 'Ongaku', 'Music', 'Remember the "音" for music.', 1),
    ('走', '走る', 'To run', 'https://example.com/run.jpg', 'はしる', 'Run', 'Hashiru', 'Run', 'Run fast!', 1);
-- Add more flashcard_kanji data entries here...

-- Insert data for the 'flashcard_vocab' table
INSERT INTO `db_jflashcards`.`flashcard_vocab` (`example`, `example_mean`, `img_url`, `mean`, `term`, `flashcard_set_id`)
VALUES
    ('Hello', 'Xin chào', NULL, 'Greeting', 'Hello', 3),
    ('Goodbye', 'Tạm biệt', 'https://example.com/goodbye.jpg', 'Parting', 'Goodbye', 3);
-- Add more flashcard_vocab data entries here...
-- Insert data for the 'book_mark_card' table
INSERT INTO `db_jflashcards`.`book_mark_card` (`card_id`, `flashcard_set_id`, `user_id`)
VALUES
    (1, 1, 1),
    (2, 1, 2);
-- Add more book_mark_card data entries here...

-- Insert data for the 'book_mark_set' table
INSERT INTO `db_jflashcards`.`book_mark_set` (`flashcard_set_id`, `user_id`)
VALUES
    (1, 1),
    (2, 2);
-- Add more book_mark_set data entries here...

-- Insert data for the 'classroom' table
INSERT INTO `db_jflashcards`.`classroom` (`class_room_code`, `class_room_name`, `created_at`, `description`, `teacher_id`)
VALUES
    ('class101', 'Classroom 101', '2023-03-01', 'Introduction to Programming', 1),
    ('class102', 'Classroom 102', '2023-03-15', 'Advanced Mathematics', 2);
-- Add more classroom data entries here...

-- Insert data for the 'chatmessage' table
INSERT INTO `db_jflashcards`.`chatmessage` (`content`, `is_read`, `timestamp`, `class_id`, `teacher_id`, `user_id`)
VALUES
    ('Hello, class!', 1, '2023-03-01 08:00:00', 1, 1, 1),
    ('Good morning!', 0, '2023-03-02 09:15:00', 1, 1, 2);
-- Add more chatmessage data entries here...

-- Insert data for the 'classmember' table
INSERT INTO `db_jflashcards`.`classmember` (`class_id`, `user_id`)
VALUES
    (1, 1),
    (1, 2);
-- Add more classmember data entries here...

-- Insert data for the 'classpost' table
INSERT INTO `db_jflashcards`.`classpost` (`content`, `created_at`, `download_url`, `class_id`, `creator_id`)
VALUES
    ('Welcome to the class!', '2023-03-01 10:00:00', NULL, 1, 1),
    ('Check out the lecture slides.', '2023-03-02 11:30:00', 'https://example.com/slides.pdf', 1, 2);
-- Add more classpost data entries here...

-- Insert data for the 'classset' table
INSERT INTO `db_jflashcards`.`classset` (`created_at`, `due_at`, `class_id`, `set_id`)
VALUES
    ('2023-03-01 14:00:00', '2023-03-10 23:59:59', 1, 1),
    ('2023-03-15 13:30:00', '2023-03-25 23:59:59', 2, 2);
-- Add more classset data entries here...

-- Insert data for the 'comment' table
INSERT INTO `db_jflashcards`.`comment` (`content`, `created_at`, `post_id`, `user_id`)
VALUES
    ('I have a question.', '2023-03-01 12:00:00', 1, 1),
    ('I can help with that.', '2023-03-02 13:00:00', 1, 2);
-- Add more comment data entries here...


-- Insert data for the 'folderset' table
INSERT INTO `db_jflashcards`.`folderset` (`created_at`, `description`, `title`, `user_id`)
VALUES
    ('2023-03-01', 'My vocabulary collection', 'My Vocabulary', 1),
    ('2023-03-15', 'Japanese phrases', 'Japanese Phrases', 2);
-- Add more folderset data entries here...

-- Insert data for the 'folderset_flashcard_sets' table
INSERT INTO `db_jflashcards`.`folderset_flashcard_sets` (`folder_set_folder_id`, `flashcard_sets_flashcard_set_id`)
VALUES
    (1, 1),
    (2, 2);
-- Add more folderset_flashcard_sets data entries here...

-- Insert data for the 'opened_flashcard_set' table
INSERT INTO `db_jflashcards`.`opened_flashcard_set` (`opened_at`, `flashcard_set_id`, `user_id`)
VALUES
    ('2023-03-02 10:00:00', 1, 1),
    ('2023-03-03 11:00:00', 2, 2);
-- Add more opened_flashcard_set data entries here...


-- Insert data for the 'users_roles' table
INSERT INTO `db_jflashcards`.`users_roles` (`user_user_id`, `roles_role_id`)
VALUES
    (1, 1),
    (2, 2);
-- Add more users_roles data entries here...

-- Insert data for the 'vote_point' table
INSERT INTO `db_jflashcards`.`vote_point` (`point`, `flashcard_set_id`, `user_id`)
VALUES
    (5, 1, 1),
    (4, 2, 2);
-- Add more vote_point data entries here...

-- Insert data for the 'tracking_progress' table
INSERT INTO `db_jflashcards`.`tracking_progress` (`card_id`, `created_at`, `last_learn`, `flashcard_set_id`, `user_id`)
VALUES
    (1, '2023-03-01 16:00:00', '2023-03-02 14:00:00', 1, 1),
    (2, '2023-03-02 17:00:00', '2023-03-03 15:00:00', 2, 2);
-- Add more tracking_progress data entries here...

-- Insert data for the 'userlog' table
INSERT INTO `db_jflashcards`.`userlog` (`created_at`, `description`, `log_at`, `user_id`)
VALUES
    (2023-03-01, 'User login', '2023-03-01 18:00:00', 1),
    (2023-03-02, 'User registration', '2023-03-02 19:00:00', 2);
-- Add more userlog data entries here...

-- Insert data for the 'userrequest' table
INSERT INTO `db_jflashcards`.`userrequest` (`create_at`, `expire_at`, `request_type`, `token`, `user_id`)
VALUES
    ('2023-03-01 20:00:00', '2023-03-10 20:00:00', 1, 'request_token_1', 1),
    ('2023-03-02 21:00:00', '2023-03-11 21:00:00', 2, 'request_token_2', 2);
-- Add more userrequest data entries here...
