package com.ofss;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

@Repository
public class CustomerDao {

    private final JdbcTemplate jdbcTemplate;

    public CustomerDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Customer> customerRowMapper = new RowMapper<>() {
        public Customer mapRow(ResultSet rs, int rowNum) throws SQLException {
            Customer c = new Customer();
            c.setCustId(rs.getInt("CUST_ID"));
            c.setFirstName(rs.getString("FIRST_NAME"));
            c.setLastName(rs.getString("LAST_NAME"));
            c.setPhoneNumber(rs.getLong("PHONE_NUMBER"));
            c.setCity(rs.getString("CITY"));
            c.setEmailId(rs.getString("EMAIL_ID"));
            return c;
        }
    };

    public List<Customer> findAll() {
        return jdbcTemplate.query("SELECT * FROM CUSTOMERS", customerRowMapper);
    }

    public Customer findById(int id) {
        List<Customer> customers = jdbcTemplate.query(
                "SELECT * FROM CUSTOMERS WHERE CUST_ID = ?",
                customerRowMapper, id);
        return customers.isEmpty() ? null : customers.get(0);
    }

    public int save(Customer c) {
    	int custseqid=jdbcTemplate.queryForObject("SELECT user_customer_seq.NEXTVAL FROM DUAL", Integer.class);
    	c.setCustId(custseqid);
        int cu= jdbcTemplate.update(
            "INSERT INTO CUSTOMERS (CUST_ID, FIRST_NAME, LAST_NAME, PHONE_NUMBER, CITY, EMAIL_ID) VALUES (?, ?, ?, ?, ?, ?)",
            c.getCustId(), c.getFirstName(), c.getLastName(),
            c.getPhoneNumber(), c.getCity(), c.getEmailId()
        );
        if (c.getUser() != null) {
            User user = c.getUser();
            user.setUserId(custseqid);  // set the same id as customer
            jdbcTemplate.update(
                "INSERT INTO USERS (USER_ID, USERNAME, PASSWORD, CUST_TYPE) VALUES (?, ?, ?, ?)",
                user.getUserId(), user.getUsername(), user.getPassword(), user.getCustType()
            );
        }
        return cu;
    }

    public int update(Customer c) {
        return jdbcTemplate.update(
            "UPDATE CUSTOMERS SET FIRST_NAME=?, LAST_NAME=?, PHONE_NUMBER=?, CITY=?, EMAIL_ID=? WHERE CUST_ID=?",
            c.getFirstName(), c.getLastName(), c.getPhoneNumber(),
            c.getCity(), c.getEmailId(), c.getCustId()
        );
    }

    public int deleteById(int id) {
        return jdbcTemplate.update("DELETE FROM CUSTOMERS WHERE CUST_ID = ?", id);
    }

    public int partialUpdate(int custId, Map<String, Object> updates) {
        if (updates == null || updates.isEmpty())
            return 0;

        StringJoiner setClause = new StringJoiner(", ");
        for (String key : updates.keySet()) {
            setClause.add(key + "=?");
        }
        String sql = "UPDATE CUSTOMERS SET " + setClause + " WHERE CUST_ID=?";
        Object[] params = updates.values().toArray(new Object[updates.size() + 1]);
        params[updates.size()] = custId;
        return jdbcTemplate.update(sql, params);
    }
    
    @SuppressWarnings("deprecation")
	public User authenticateUser(String username, String password, String custType) {
        String sql = "SELECT USER_ID, USERNAME, CUST_TYPE FROM USERS WHERE USERNAME = ? AND PASSWORD = ? AND CUST_TYPE = ?";
        List<User> users = jdbcTemplate.query(
            sql,
            new Object[]{username, password, custType},
            (rs, rowNum) -> {
                User u = new User();
                u.setUserId(rs.getInt("USER_ID"));
                u.setUsername(rs.getString("USERNAME"));
                u.setCustType(rs.getString("CUST_TYPE"));
                return u;
            }
        );
        return users.isEmpty() ? null : users.get(0);
    }
}