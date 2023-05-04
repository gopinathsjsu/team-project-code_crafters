package com.ivanfranchin.bookapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "RegisteredClasses")
public class RegisteredClasses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "classes_id")
    private long classes_id;
    @Column(name = "user_id")
    private long user_id;
    private String title;
    private String description;
    private String image;
    private Long month;

    @Column(name = "is_member")
    public Boolean isMember;
}
