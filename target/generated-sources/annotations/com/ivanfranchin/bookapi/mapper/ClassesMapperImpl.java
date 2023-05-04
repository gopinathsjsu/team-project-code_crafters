package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.Classes;
import com.ivanfranchin.bookapi.rest.dto.ClassesDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-03T16:48:24-0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class ClassesMapperImpl implements ClassesMapper {

    @Override
    public Classes toClasses(ClassesDto classesDto) {
        if ( classesDto == null ) {
            return null;
        }

        Classes classes = new Classes();

        classes.setId( classesDto.id() );
        classes.setTitle( classesDto.title() );
        classes.setDescription( classesDto.description() );
        classes.setIsForMember( classesDto.isForMember() );
        if ( classesDto.instructorId() != null ) {
            classes.setInstructorId( classesDto.instructorId() );
        }

        return classes;
    }

    @Override
    public ClassesDto toClassesDto(Classes classes) {
        if ( classes == null ) {
            return null;
        }

        long id = 0L;
        String title = null;
        String description = null;
        Boolean isForMember = null;
        Long instructorId = null;

        id = classes.getId();
        title = classes.getTitle();
        description = classes.getDescription();
        isForMember = classes.getIsForMember();
        instructorId = classes.getInstructorId();

        ClassesDto classesDto = new ClassesDto( id, title, description, isForMember, instructorId );

        return classesDto;
    }
}
