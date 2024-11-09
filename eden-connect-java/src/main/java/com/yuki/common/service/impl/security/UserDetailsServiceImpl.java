package com.yuki.common.service.impl.security;

import com.yuki.common.domain.entity.LoginUser;
import com.yuki.common.domain.entity.User;
import com.yuki.common.mapper.UserMapper;
import com.yuki.common.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 根据邮箱查询用户信息
        User user = userRepository.GetUserByEmail(email);
        if(ObjectUtils.isEmpty(user)){
            throw new RuntimeException("用户名或密码错误");
        }
        // 根据用户查询权限信息 添加到LoginUser中
        List<String> list = userRepository.getUserPermissionsById(user.getId());
        //封装成UserDetails对象返回 
        return new LoginUser(user,list);
    }
}