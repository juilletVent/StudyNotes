package cn.nanami52.testmybatis.SqlProvider;

import cn.nanami52.testmybatis.entity.User;
import org.apache.ibatis.jdbc.SQL;

public class UserProvider {
    private final static String TABLE_USERS = "users";

    public String generateSql(User user) {
        SQL sql = new SQL().SELECT("*").FROM(TABLE_USERS);
        if (null != user.getId()) {
            sql.WHERE("id = #{id}");
        }
        return sql.toString();
    }

}
