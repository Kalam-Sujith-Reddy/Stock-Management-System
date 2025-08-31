package com.ofss;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class ReportsService {
    private final ReportsGeneration reportsGeneration;

    public ReportsService(ReportsGeneration reportsGeneration) {
        this.reportsGeneration = reportsGeneration;
    }

    public List<Map<String, Object>> customerAssetsWithTxnType() {
        return reportsGeneration.customerAssetsWithTxnType();
    }

    public Map<String, Object> customerWithMaxAssetValue() {
        return reportsGeneration.customerWithMaxAssetValue();
    }

    public Map<String, Object> customerWithMinAssetValue() {
        return reportsGeneration.customerWithMinAssetValue();
    }

    public Map<String, Object> mostTransactedStock() {
        return reportsGeneration.mostTransactedStock();
    }

    public Map<String, Object> leastTransactedStock() {
        return reportsGeneration.leastTransactedStock();
    }

    public List<Map<String, Object>> stocksNeverTransacted() {
        return reportsGeneration.stocksNeverTransacted();
    }

    public List<Map<String, Object>> allTransactedStocks() {
        return reportsGeneration.allTransactedStocks();
    }

    public List<Map<String, Object>> highestPricedStock() {
        return reportsGeneration.highestPricedStock();
    }

    public List<Map<String, Object>> lowestPricedStock() {
        return reportsGeneration.lowestPricedStock();
    }

    public List<Map<String, Object>> customerWithLowestPricedStock() {
        return reportsGeneration.customerWithLowestPricedStock();
    }

    public List<Map<String, Object>> allCustomers() {
        return reportsGeneration.allCustomers();
    }

    public List<Map<String, Object>> allTransactions() {
        return reportsGeneration.allTransactions();
    }

    public Map<String, Object> mostCommonTxnType() {
        return reportsGeneration.mostCommonTxnType();
    }

    public Map<String, Object> totalAssets() {
        return reportsGeneration.totalAssets();
    }
}