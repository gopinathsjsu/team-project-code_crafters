package com.ivanfranchin.bookapi.mapper;

import com.ivanfranchin.bookapi.model.Book;
import com.ivanfranchin.bookapi.rest.dto.BookDto;
import com.ivanfranchin.bookapi.rest.dto.CreateBookRequest;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-03T16:48:24-0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class BookMapperImpl implements BookMapper {

    @Override
    public Book toBook(CreateBookRequest createBookRequest) {
        if ( createBookRequest == null ) {
            return null;
        }

        Book book = new Book();

        book.setIsbn( createBookRequest.getIsbn() );
        book.setTitle( createBookRequest.getTitle() );

        return book;
    }

    @Override
    public BookDto toBookDto(Book book) {
        if ( book == null ) {
            return null;
        }

        String isbn = null;
        String title = null;

        isbn = book.getIsbn();
        title = book.getTitle();

        BookDto bookDto = new BookDto( isbn, title );

        return bookDto;
    }
}
