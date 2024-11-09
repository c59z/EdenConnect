package com.yuki.common.service;

import com.yuki.common.domain.ResponseResult;
import com.yuki.common.domain.entity.Dto.UserDto;
import com.yuki.common.domain.entity.Dto.UserRegisterDto;
import com.yuki.common.domain.entity.User;

public interface AuthService {
    ResponseResult login(User user);

    ResponseResult logout();

    ResponseResult register(UserRegisterDto user);
}
