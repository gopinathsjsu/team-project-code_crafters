package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.User;
import com.ivanfranchin.bookapi.rest.dto.UserDto;
import org.mapstruct.Mapper;
import org.springframework.context.annotation.Configuration;

@Configuration
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);
}