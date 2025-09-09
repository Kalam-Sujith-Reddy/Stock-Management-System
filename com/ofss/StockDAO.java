package com.ofss;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

@Repository
public class StockDAO {

    private JdbcTemplate jdbcTemplate;

    public StockDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Stock> stockRowMapper = new RowMapper<>() {
        public Stock mapRow(ResultSet rs, int rowNum) throws SQLException {
            Stock s = new Stock();
            s.setStockId(rs.getInt("STOCK_ID"));
            s.setStockName(rs.getString("STOCK_NAME"));
            s.setStockPrice(rs.getDouble("STOCK_PRICE"));
            s.setStockVolume(rs.getInt("STOCK_VOLUME"));
            s.setListingPrice(rs.getDouble("LISTING_PRICE"));
            s.setListedDate(rs.getDate("LISTED_DATE"));
            s.setListedExchange(rs.getString("LISTED_EXCHANGE"));
            return s;
        }
    };

    public List<Stock> findAll() {
        return jdbcTemplate.query("SELECT * FROM STOCKS", stockRowMapper);
    }

    public Stock findById(int id) {
        List<Stock> stocks = jdbcTemplate.query("SELECT * FROM STOCKS WHERE STOCK_ID = ?", stockRowMapper, id);
        return stocks.isEmpty() ? null : stocks.get(0); // Avoid exception if not found
    }

    public int save(Stock s) {
        return jdbcTemplate.update(
            "INSERT INTO STOCKS (STOCK_ID, STOCK_NAME, STOCK_PRICE, STOCK_VOLUME, LISTING_PRICE, LISTED_DATE, LISTED_EXCHANGE) VALUES (?, ?, ?, ?, ?, SYSDATE, ?)",
            s.getStockId(), s.getStockName(), s.getStockPrice(), s.getStockVolume(), s.getListingPrice(),
            s.getListedExchange()
        );
    }

    public int update(Stock s) {
        return jdbcTemplate.update(
            "UPDATE STOCKS SET STOCK_NAME=?, STOCK_PRICE=?, STOCK_VOLUME=?, LISTING_PRICE=?, LISTED_DATE=?, LISTED_EXCHANGE=? WHERE STOCK_ID=?",
            s.getStockName(), s.getStockPrice(), s.getStockVolume(), s.getListingPrice(),
            new Date(s.getListedDate().getTime()), s.getListedExchange(), s.getStockId()
        );
    }

    public int deleteById(int id) {
        return jdbcTemplate.update("DELETE FROM STOCKS WHERE STOCK_ID=?", id);
    }

    // Partial update (PATCH)
    public int partialUpdate(int stockId, Map<String, Object> updates) {
        if (updates == null || updates.isEmpty())
            return 0;
        StringJoiner setClause = new StringJoiner(", ");
        for (String key : updates.keySet()) {
            setClause.add(key + "=?");
        }
        String sql = "UPDATE STOCKS SET " + setClause + " WHERE STOCK_ID=?";
        Object[] params = updates.values().toArray(new Object[updates.size() + 1]);
        params[updates.size()] = stockId;
        return jdbcTemplate.update(sql, params);
    }
}