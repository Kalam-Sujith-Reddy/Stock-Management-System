package com.ofss;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class StockService {

    private final StockDAO stockDao;

    public StockService(StockDAO stockDao) {
        this.stockDao = stockDao;
    }

    public List<Stock> getAllStocks() {
        return stockDao.findAll();
    }

    public Stock getStockById(int id) {
        return stockDao.findById(id);
    }

    public void addStock(Stock stock) {
        stockDao.save(stock);
    }

    public void updateStock(Stock stock) {
        stockDao.update(stock);
    }

    public boolean deleteStock(int id) {
        // Option 1: Check existence first
        Stock stock = stockDao.findById(id);
        if(stock == null) {
            return false;
        }
        stockDao.deleteById(id);
        return true;

        // Option 2 (alternatively): Just rely on affected rows:
        // return stockDao.deleteById(id) > 0;
    }

    public void partialUpdateStock(int id, Map<String, Object> updates) {
        stockDao.partialUpdate(id, updates);
    }
}