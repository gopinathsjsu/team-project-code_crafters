package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.Membership;
import com.ivanfranchin.bookapi.rest.dto.CreateMembershipRequest;
import com.ivanfranchin.bookapi.rest.dto.MembershipDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-29T18:30:46-0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.6 (Amazon.com Inc.)"
)
@Component
public class MembershipMapperImpl implements MembershipMapper {

    @Override
    public Membership toMembership(CreateMembershipRequest createMembershipRequest) {
        if ( createMembershipRequest == null ) {
            return null;
        }

        Membership membership = new Membership();

        membership.setId( createMembershipRequest.getId() );
        membership.setTitle( createMembershipRequest.getTitle() );
        membership.setDescription( createMembershipRequest.getDescription() );
        membership.setImage( createMembershipRequest.getImage() );

        return membership;
    }

    @Override
    public MembershipDto toMembershipDto(Membership membership) {
        if ( membership == null ) {
            return null;
        }

        long id = 0L;
        String title = null;
        String description = null;
        String image = null;

        id = membership.getId();
        title = membership.getTitle();
        description = membership.getDescription();
        image = membership.getImage();

        MembershipDto membershipDto = new MembershipDto( id, title, description, image );

        return membershipDto;
    }
}
