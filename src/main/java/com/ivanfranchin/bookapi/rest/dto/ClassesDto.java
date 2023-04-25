package com.ivanfranchin.bookapi.rest.dto;

public record ClassesDto(long id, String title, String description, Boolean isForMember,Long instructorId) {
}