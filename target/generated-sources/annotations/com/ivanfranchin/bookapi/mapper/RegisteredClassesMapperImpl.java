package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.RegisteredClasses;
import com.ivanfranchin.bookapi.rest.dto.CreateRegisteredClassesRequest;
import com.ivanfranchin.bookapi.rest.dto.RegisteredClassesDto;
import java.util.Date;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-10T15:41:44-0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class RegisteredClassesMapperImpl implements RegisteredClassesMapper {

    @Override
    public RegisteredClasses toRegisteredClasses(CreateRegisteredClassesRequest createRegisteredClassesRequest) {
        if ( createRegisteredClassesRequest == null ) {
            return null;
        }

        RegisteredClasses registeredClasses = new RegisteredClasses();

        registeredClasses.setId( createRegisteredClassesRequest.getId() );
        registeredClasses.setClasses_id( createRegisteredClassesRequest.getClasses_id() );
        registeredClasses.setUser_id( createRegisteredClassesRequest.getUser_id() );
        registeredClasses.setTitle( createRegisteredClassesRequest.getTitle() );
        registeredClasses.setDescription( createRegisteredClassesRequest.getDescription() );
        registeredClasses.setImage( createRegisteredClassesRequest.getImage() );
        registeredClasses.setMonth( createRegisteredClassesRequest.getMonth() );
        registeredClasses.setStartTime( createRegisteredClassesRequest.getStartTime() );
        registeredClasses.setEndTime( createRegisteredClassesRequest.getEndTime() );
        registeredClasses.setStartDate( createRegisteredClassesRequest.getStartDate() );
        registeredClasses.setEndDate( createRegisteredClassesRequest.getEndDate() );
        registeredClasses.setIsMember( createRegisteredClassesRequest.getIsMember() );

        return registeredClasses;
    }

    @Override
    public RegisteredClassesDto toRegisteredClassesDto(RegisteredClasses registeredClasses) {
        if ( registeredClasses == null ) {
            return null;
        }

        long id = 0L;
        long classes_id = 0L;
        long user_id = 0L;
        String title = null;
        String description = null;
        String image = null;
        Long month = null;
        Boolean isMember = null;
        Date startDate = null;
        Date endDate = null;

        id = registeredClasses.getId();
        classes_id = registeredClasses.getClasses_id();
        user_id = registeredClasses.getUser_id();
        title = registeredClasses.getTitle();
        description = registeredClasses.getDescription();
        image = registeredClasses.getImage();
        month = registeredClasses.getMonth();
        isMember = registeredClasses.getIsMember();
        startDate = registeredClasses.getStartDate();
        endDate = registeredClasses.getEndDate();

        int locationId = 0;

        RegisteredClassesDto registeredClassesDto = new RegisteredClassesDto( id, classes_id, user_id, title, description, image, month, isMember, startDate, endDate, locationId );

        return registeredClassesDto;
    }
}
