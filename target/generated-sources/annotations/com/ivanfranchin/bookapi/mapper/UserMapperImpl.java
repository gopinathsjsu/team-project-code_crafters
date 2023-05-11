package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.User;
import com.ivanfranchin.bookapi.rest.dto.UserDto;
import java.util.Date;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-10T15:41:45-0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toUserDto(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String username = null;
        String name = null;
        String email = null;
        String role = null;
        Date expiry = null;
        Long daysRemaining = null;
        Long locationId = null;
        Long membershipId = null;
        Boolean isActive = null;

        id = user.getId();
        username = user.getUsername();
        name = user.getName();
        email = user.getEmail();
        role = user.getRole();
        expiry = user.getExpiry();
        daysRemaining = user.getDaysRemaining();
        locationId = user.getLocationId();
        membershipId = user.getMembershipId();
        isActive = user.getIsActive();

        UserDto userDto = new UserDto( id, username, name, email, role, expiry, daysRemaining, locationId, membershipId, isActive );

        return userDto;
    }
}
