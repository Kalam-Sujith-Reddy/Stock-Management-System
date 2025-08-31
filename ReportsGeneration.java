package com.ofss;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.Map;

@Component
public class ReportsGeneration {
    private final JdbcTemplate jdbcTemplate;

    public ReportsGeneration(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 1. List of customers, stocks details and their total assets including txn type
    public List<Map<String, Object>> customerAssetsWithTxnType() {
        String sql = """
            SELECT
                c.FIRST_NAME,
                s.STOCK_NAME,
                s.STOCK_PRICE,
                t.QTY,
                t.TXN_PRICE,
                t.TXN_TYPE,
                (T.QTY*S.STOCK_PRICE) AS ASSET_VALUE
            FROM
                TRANSACTIONS t
            JOIN
                CUSTOMERS c ON t.CUST_ID = c.CUST_ID
            JOIN
                STOCKS s ON t.STOCK_ID = s.STOCK_ID
            ORDER BY T.TXN_TYPE
        """;
        return jdbcTemplate.queryForList(sql);
    }

    // 2. List the customer whose asset value is the maximum
    public Map<String, Object> customerWithMaxAssetValue() {
        String sql = """
            SELECT c.CUST_ID, c.FIRST_NAME, c.LAST_NAME, SUM(t.QTY * s.STOCK_PRICE) AS ASSET_VALUE
            FROM TRANSACTIONS t
            JOIN CUSTOMERS c ON t.CUST_ID = c.CUST_ID
            JOIN STOCKS s ON t.STOCK_ID = s.STOCK_ID
            GROUP BY c.CUST_ID, c.FIRST_NAME, c.LAST_NAME
            ORDER BY ASSET_VALUE DESC
            FETCH FIRST 1 ROW ONLY
        """;
        return jdbcTemplate.queryForMap(sql);
    }

    // 3. List the customer whose asset value is the minimum
    public Map<String, Object> customerWithMinAssetValue() {
        String sql = """
            SELECT c.CUST_ID, c.FIRST_NAME, c.LAST_NAME, SUM(t.QTY * s.STOCK_PRICE) AS ASSET_VALUE
            FROM TRANSACTIONS t
            JOIN CUSTOMERS c ON t.CUST_ID = c.CUST_ID
            JOIN STOCKS s ON t.STOCK_ID = s.STOCK_ID
            GROUP BY c.CUST_ID, c.FIRST_NAME, c.LAST_NAME
            ORDER BY ASSET_VALUE
            FETCH FIRST 1 ROW ONLY
        """;
        return jdbcTemplate.queryForMap(sql);
    }

    // 4. Stock transacted most
    public Map<String, Object> mostTransactedStock() {
        String sql = """
            SELECT T.STOCK_ID, S.STOCK_NAME, COUNT(T.STOCK_ID) AS TRANSACTION_COUNT
            FROM TRANSACTIONS T
            JOIN STOCKS S ON T.STOCK_ID = S.STOCK_ID
            GROUP BY T.STOCK_ID, S.STOCK_NAME
            ORDER BY TRANSACTION_COUNT DESC
            FETCH FIRST 1 ROW ONLY
        """;
        return jdbcTemplate.queryForMap(sql);
    }

    // 5. Stock transacted least
    public Map<String, Object> leastTransactedStock() {
        String sql = """
            SELECT T.STOCK_ID, S.STOCK_NAME, COUNT(T.STOCK_ID) AS TRANSACTION_COUNT
            FROM TRANSACTIONS T
            JOIN STOCKS S ON T.STOCK_ID = S.STOCK_ID
            GROUP BY T.STOCK_ID, S.STOCK_NAME
            ORDER BY TRANSACTION_COUNT
            FETCH FIRST 1 ROW ONLY
        """;
        return jdbcTemplate.queryForMap(sql);
    }

    // 6. Stock never transacted
    public List<Map<String, Object>> stocksNeverTransacted() {
        String sql = """
            SELECT STOCK_ID, STOCK_NAME
            FROM STOCKS
            WHERE STOCK_ID NOT IN (SELECT STOCK_ID FROM TRANSACTIONS)
        """;
        return jdbcTemplate.queryForList(sql);
    }

    // 7. All distinct transacted stocks
    public List<Map<String, Object>> allTransactedStocks() {
        String sql = """
            SELECT DISTINCT S.STOCK_ID, S.STOCK_NAME
            FROM TRANSACTIONS T
            JOIN STOCKS S ON T.STOCK_ID = S.STOCK_ID
        """;
        return jdbcTemplate.queryForList(sql);
    }

    // 8. Stock with highest price
    public List<Map<String, Object>> highestPricedStock() {
        String sql = """
            SELECT STOCK_NAME, STOCK_PRICE
            FROM STOCKS WHERE STOCK_PRICE = (SELECT MAX(STOCK_PRICE) FROM STOCKS)
        """;
        return jdbcTemplate.queryForList(sql);
    }

    // 9. Stock with lowest price
    public List<Map<String, Object>> lowestPricedStock() {
        String sql = """
            SELECT STOCK_NAME, STOCK_PRICE
            FROM STOCKS WHERE STOCK_PRICE = (SELECT MIN(STOCK_PRICE) FROM STOCKS)
        """;
        return jdbcTemplate.queryForList(sql);
    }

    // 10. Customer(s) who bought the lowest priced stock
    public List<Map<String, Object>> customerWithLowestPricedStock() {
        String sql = """
            SELECT C.FIRST_NAME, C.LAST_NAME, S.STOCK_NAME, S.STOCK_PRICE
            FROM TRANSACTIONS T
            JOIN STOCKS S ON T.STOCK_ID = S.STOCK_ID
            JOIN CUSTOMERS C ON T.CUST_ID = C.CUST_ID
            WHERE S.STOCK_PRICE = (SELECT MIN(STOCK_PRICE) FROM STOCKS)
        """;
        return jdbcTemplate.queryForList(sql);
    }

    // 11. All customer details
    public List<Map<String, Object>> allCustomers() {
        String sql = "SELECT * FROM CUSTOMERS";
        return jdbcTemplate.queryForList(sql);
    }

    // 12. All transaction details
    public List<Map<String, Object>> allTransactions() {
        String sql = "SELECT * FROM TRANSACTIONS";
        return jdbcTemplate.queryForList(sql);
    }

    // 13. Which txn type is more (sell/buy)?
    public Map<String, Object> mostCommonTxnType() {
        String sql = """
            SELECT TXN_TYPE, COUNT(TXN_TYPE) AS TXN_COUNT
            FROM TRANSACTIONS
            GROUP BY TXN_TYPE
            ORDER BY TXN_COUNT DESC
            FETCH FIRST 1 ROW ONLY
        """;
        return jdbcTemplate.queryForMap(sql);
    }

    // 14. Total assets of all customers
    public Map<String, Object> totalAssets() {
        String sql = "SELECT SUM(TXN_PRICE) AS TOTAL_ASSETS FROM TRANSACTIONS";
        return jdbcTemplate.queryForMap(sql);
    }
}
