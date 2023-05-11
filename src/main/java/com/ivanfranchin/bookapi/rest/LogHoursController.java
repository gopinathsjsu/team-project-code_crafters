package com.ivanfranchin.bookapi.rest;

import com.ivanfranchin.bookapi.mapper.RegisteredClassesMapper;
import com.ivanfranchin.bookapi.model.LogHours;
import com.ivanfranchin.bookapi.model.RegisteredClasses;
import com.ivanfranchin.bookapi.repository.LogHoursRepository;
import com.ivanfranchin.bookapi.rest.dto.CreateRegisteredClassesRequest;
import com.ivanfranchin.bookapi.rest.dto.LogHoursByDTO;
import com.ivanfranchin.bookapi.rest.dto.LogHoursDTO;
import com.ivanfranchin.bookapi.rest.dto.RegisteredClassesDto;
import com.ivanfranchin.bookapi.service.RegisteredClassesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import static com.ivanfranchin.bookapi.config.SwaggerConfig.BASIC_AUTH_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/log-hours")
public class LogHoursController {

    private final LogHoursRepository logHoursRepository;


    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @GetMapping("/{id}")
    public LogHoursByDTO getLogHoursByHourly(@PathVariable Long id) {
        LocalDate currentDate = LocalDate.now();
        LocalDateTime currentDateTime = currentDate.atTime(23, 59, 59); // Set current date to 23:59:59

        LocalDate endDate = currentDate.minus(90, ChronoUnit.DAYS);

        return logHoursRepository.getLogHoursByDTOForPast90Days(endDate,currentDateTime.toLocalDate(),id);
    }

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public LogHours createLogHours(@Valid @RequestBody LogHours logHours) {
        System.out.println(logHours.toString());
        return logHoursRepository.save(logHours);
    }

//    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
//    @DeleteMapping("/{id}")
//    public String deleteBook(@PathVariable String id) {
//        registeredClassesService.deleteRegisteredClassesById(id);
//        return id;
//    }
}



