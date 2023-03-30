package com.ivanfranchin.bookapi.service;

import com.ivanfranchin.bookapi.model.Book;
import com.ivanfranchin.bookapi.model.Membership;

import java.util.List;

public interface MembershipService {

    List<Membership> getMemberships();

    List<Membership> getMembershipContainingText(String txt);

    Membership saveMembership(Membership membership);


}
