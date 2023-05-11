package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.Instructor;
import com.ivanfranchin.bookapi.rest.dto.InstructorDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-10T15:41:44-0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class InstructorMapperImpl implements InstructorMapper {

    @Override
    public Instructor toMembership(InstructorDto instructorDto) {
        if ( instructorDto == null ) {
            return null;
        }

        Instructor instructor = new Instructor();

        instructor.setId( instructorDto.id() );
        instructor.setName( instructorDto.name() );
        instructor.setAge( instructorDto.age() );
        instructor.setDescription( instructorDto.description() );
        instructor.setEmail( instructorDto.email() );

        return instructor;
    }

    @Override
    public InstructorDto toInstructorDto(Instructor instructor) {
        if ( instructor == null ) {
            return null;
        }

        long id = 0L;
        String name = null;
        long age = 0L;
        String description = null;
        String email = null;

        id = instructor.getId();
        name = instructor.getName();
        age = instructor.getAge();
        description = instructor.getDescription();
        email = instructor.getEmail();

        float salary = 0.0f;

        InstructorDto instructorDto = new InstructorDto( id, name, age, description, salary, email );

        return instructorDto;
    }
}
