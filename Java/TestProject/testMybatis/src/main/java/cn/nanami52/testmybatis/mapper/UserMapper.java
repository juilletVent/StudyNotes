package cn.nanami52.testmybatis.mapper;

import cn.nanami52.testmybatis.SqlProvider.UserProvider;
import cn.nanami52.testmybatis.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface UserMapper {
    // 使用查询注解定义查询语句
    @Select("select * from users where id = #{user.id}")
    // 使用Results进行字段映射
    @Results({
            @Result(id = true, column = "id", property = "id"),
            @Result(column = "username", property = "name"),
            @Result(column = "real_name", property = "nickname"),
    })
    List<User> getUsers(@Param("user") User user);

    // 使用Provider进行动态sql拼接生成
    @SelectProvider(type = UserProvider.class, method = "generateSql")
    List<User> getUsersEx(User user);
}
