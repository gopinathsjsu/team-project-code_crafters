package com.ivanfranchin.bookapi.rest;

import com.ivanfranchin.bookapi.mapper.ClassesMapper;
import com.ivanfranchin.bookapi.mapper.MembershipMapper;
import com.ivanfranchin.bookapi.model.Book;
import com.ivanfranchin.bookapi.model.Classes;
import com.ivanfranchin.bookapi.model.Membership;
import com.ivanfranchin.bookapi.rest.dto.BookDto;
import com.ivanfranchin.bookapi.rest.dto.ClassesDto;
import com.ivanfranchin.bookapi.rest.dto.CreateMembershipRequest;
import com.ivanfranchin.bookapi.rest.dto.MembershipDto;
import com.ivanfranchin.bookapi.service.ClassesService;
import com.ivanfranchin.bookapi.service.MembershipService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.ivanfranchin.bookapi.config.SwaggerConfig.BASIC_AUTH_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/classes")
public class ClassesController {

    private final ClassesService classesService;
    private final ClassesMapper classesMapper;

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @GetMapping
    public List<ClassesDto> getMemberships(@RequestParam(value = "text", required = false) String text) {
        List<Classes> classes = classesService.getClasses();
        return classes.stream()
                .map(classesMapper::toClassesDto)
                .collect(Collectors.toList());
    }
    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @GetMapping("/by-text/{text}")
    public List<ClassesDto> getClassesByText(@PathVariable String text) {
        List<Classes> classes = classesService.getByText(text);
        return classes.stream()
                .map(classesMapper::toClassesDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ClassesDto createMembership(@Valid @RequestBody ClassesDto classesDto) {
        Classes classes = classesMapper.toClasses(classesDto);
        return classesMapper.toClassesDto(classesService.saveClass(classes));
    }

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable String id) {
        classesService.deleteClasses(id);
        return id;
    }
}
