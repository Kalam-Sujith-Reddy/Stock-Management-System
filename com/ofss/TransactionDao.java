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
public class TransactionDao {

    private final JdbcTemplate jdbcTemplate;

    public TransactionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Transaction> transactionRowMapper = new RowMapper<>() {
        public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {
            Transaction t = new Transaction();
            t.setTxnId(rs.getInt("TXN_ID"));
            t.setCustId(rs.getInt("CUST_ID"));
            t.setStockId(rs.getInt("STOCK_ID"));
            t.setTxnPrice(rs.getDouble("TXN_PRICE"));
            t.setTxnType(rs.getString("TXN_TYPE"));
            t.setQty(rs.getInt("QTY"));
            t.setTxnDate(rs.getDate("TXN_DATE"));
            return t;
        }
    };

    public List<Transaction> findAll() {
        return jdbcTemplate.query("SELECT * FROM TRANSACTIONS", transactionRowMapper);
    }

    public List<Transaction> findByCustomerId(int custId) {
        String sql = "SELECT * FROM TRANSACTIONS WHERE CUST_ID = ? ORDER BY TXN_DATE DESC";
        return jdbcTemplate.query(sql, transactionRowMapper, custId);
    }
    public Transaction findById(int id) {
        List<Transaction> transactions = jdbcTemplate.query(
                "SELECT * FROM TRANSACTIONS WHERE TXN_ID = ?",
                transactionRowMapper, id);
        return transactions.isEmpty() ? null : transactions.get(0);
    }

    public int save(Transaction t) {
    	int tranid=jdbcTemplate.queryForObject("SELECT transaction_seq.NEXTVAL FROM DUAL", Integer.class);
    	t.setTxnId(tranid);
        return jdbcTemplate.update(
            "INSERT INTO TRANSACTIONS (TXN_ID, CUST_ID, STOCK_ID, TXN_PRICE, TXN_TYPE, QTY, TXN_DATE) VALUES (?, ?, ?, ?, ?, ?, SYSDATE)",
            t.getTxnId(), t.getCustId(), t.getStockId(), t.getTxnPrice(),
            t.getTxnType(), t.getQty()
        );
    }

    public int update(Transaction t) {
        return jdbcTemplate.update(
            "UPDATE TRANSACTIONS SET CUST_ID=?, STOCK_ID=?, TXN_PRICE=?, TXN_TYPE=?, QTY=?, TXN_DATE=? WHERE TXN_ID=?",
            t.getCustId(), t.getStockId(), t.getTxnPrice(), t.getTxnType(),
            t.getQty(), new Date(t.getTxnDate().getTime()), t.getTxnId()
        );
    }

    public int deleteById(int id) {
        return jdbcTemplate.update("DELETE FROM TRANSACTIONS WHERE TXN_ID = ?", id);
    }

    public int partialUpdate(int txnId, Map<String, Object> updates) {
        if (updates == null || updates.isEmpty())
            return 0;
        StringJoiner setClause = new StringJoiner(", ");
        for (String key : updates.keySet()) {
            setClause.add(key + "=?");
        }
        String sql = "UPDATE TRANSACTIONS SET " + setClause + " WHERE TXN_ID=?";
        Object[] params = updates.values().toArray(new Object[updates.size() + 1]);
        params[updates.size()] = txnId;
        return jdbcTemplate.update(sql, params);
    }
}