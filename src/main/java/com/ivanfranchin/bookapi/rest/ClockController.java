package com.ivanfranchin.bookapi.rest;

import com.ivanfranchin.bookapi.mapper.ClockMapper;
import com.ivanfranchin.bookapi.mapper.MembershipMapper;
import com.ivanfranchin.bookapi.model.Clock;
import com.ivanfranchin.bookapi.model.Membership;
import com.ivanfranchin.bookapi.model.User;
import com.ivanfranchin.bookapi.rest.dto.*;
import com.ivanfranchin.bookapi.service.ClockService;
import com.ivanfranchin.bookapi.service.MembershipService;
import com.ivanfranchin.bookapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.ivanfranchin.bookapi.config.SwaggerConfig.BASIC_AUTH_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/clock")
public class ClockController {

    private final ClockService clockService;
    private final UserService userService;
    private final ClockMapper clockMapper;
    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @GetMapping
    public List<ClockDto> getClockData(@RequestParam(value = "text", required = false) String text) {
        List<Clock> memberships = clockService.getAllData();
        return memberships.stream()
                .map(clockMapper::toClockDto)
                .map(clockDto -> {
                    Optional<User> user = userService.findById(clockDto.getUserId());
                    clockDto.setUserName(user.get().getName());
                    return clockDto;
                })
                .collect(Collectors.toList());
    }



    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ClockDto createClockInOut(@Valid @RequestBody CreateClockInOutRequest createClockInOutRequest) {

        Optional<User> user = userService.findById(createClockInOutRequest.getUserId());
        String msg;
        Clock clockData;
        if(!user.isPresent()){
            ClockDto clockDto = new ClockDto();
            msg = "User Not Found";
            clockDto.setUserId(createClockInOutRequest.getUserId());
            clockDto.setMsg(msg);
            return clockDto;
        }
        Optional<Clock> clockDataa = clockService.findByUserId(createClockInOutRequest.getUserId());

        if (clockDataa.isPresent()){
            clockData = clockDataa.get();
            clockData.setClockOut((new Date()));
            msg = "Successfully Clocked Out";
        }else{
            clockData = new Clock();
            clockData.setUserId(createClockInOutRequest.getUserId());
            clockData.setClockIn(new Date());
            clockData.setDate(LocalDate.now());
            msg = "Successfully Clocked In";
        }

        ClockDto clockDto  = clockMapper.toClockDto(clockService.saveClockDate(clockData));
        clockDto.setMsg(msg);
        return clockDto;
    }

    @Operation(security = {@SecurityRequirement(name = BASIC_AUTH_SECURITY_SCHEME)})
    @GetMapping("/visitors")
    public VisitorDto getVisitorsData(@RequestParam(value = "text", required = false) String text) {
        List<Object[]> memberships = clockService.getTotalClockInByHour();
        VisitorDto visitorDto = new VisitorDto();
        VisitorDataDto byDay = new VisitorDataDto();

        VisitorDatasetDto byDayDataset = new VisitorDatasetDto();
        List<Long> hoursCount = new ArrayList<>(Collections.nCopies(24, 0L));

        for (Object[] result : memberships) {
            int hour = (int) result[0];
            Long count = (Long) result[1];
            hoursCount.set(hour, count);
        }

        byDayDataset.setData(hoursCount);
        byDayDataset.setLabel("Number of visitors by the hour (by day)");
        byDayDataset.setFill(false);
        byDayDataset.setTension(0.1);
        byDayDataset.setBorderColor("rgb(75, 192, 192)");

        byDay.setDatasets(Arrays.asList(byDayDataset));
        byDay.setLabels(IntStream.rangeClosed(1, 24).mapToObj(String::valueOf).collect(Collectors.toCollection(ArrayList::new)));
        visitorDto.setDataByDay(byDay);
        visitorDto.setDataByWeekend(byDay);
        visitorDto.setDataByWeekday(byDay);
        return visitorDto;
    }
}
