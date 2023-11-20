package com.example.jflashcardsv0_9.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class TeacherDashboardDTO {
    long countClass;
    long countMember;
    LearnDashboardDTO.DataType setType;
    LearnDashboardDTO.Data dataSet;
    LearnDashboardDTO.DataType cardType;
    LearnDashboardDTO.Data dataCard;

}
