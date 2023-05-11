package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.Clock;
import com.ivanfranchin.bookapi.rest.dto.ClockDto;
import com.ivanfranchin.bookapi.rest.dto.CreateClockInOutRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-10T15:41:44-0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class ClockMapperImpl implements ClockMapper {

    @Override
    public Clock toClock(CreateClockInOutRequest clock) {
        if ( clock == null ) {
            return null;
        }

        Clock clock1 = new Clock();

        clock1.setUserId( clock.getUserId() );
        clock1.setClockIn( clock.getClockIn() );
        clock1.setClockOut( clock.getClockOut() );

        return clock1;
    }

    @Override
    public ClockDto toClockDto(Clock clock) {
        if ( clock == null ) {
            return null;
        }

        ClockDto clockDto = new ClockDto();

        clockDto.setUserId( clock.getUserId() );
        clockDto.setId( clock.getId() );
        clockDto.setTime( clock.getDate() );
        clockDto.setClockIn( clock.getClockIn() );
        clockDto.setClockOut( clock.getClockOut() );

        return clockDto;
    }
}
