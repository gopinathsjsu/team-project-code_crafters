package com.ivanfranchin.bookapi.rest.dto;

import jdk.jfr.Description;

public record RegisteredClassesDto ( long id,long classes_id,long user_id,String title,String description,String image,Long month,Boolean isMember) {

}

