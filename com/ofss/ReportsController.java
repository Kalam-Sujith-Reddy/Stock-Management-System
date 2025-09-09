package com.ofss;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:8000/")
@RequestMapping("/api/reports")
public class ReportsController {

    private final ReportsService reportsService;

    public ReportsController(ReportsService reportsService) {
        this.reportsService = reportsService;
    }

    // 1
    @GetMapping("/customer-assets-details")
    public ResponseEntity<List<Map<String, Object>>> customerAssetsDetails() {
        return ResponseEntity.ok(reportsService.customerAssetsWithTxnType());
    }

    // 2
    @GetMapping("/customer-max-asset")
    public ResponseEntity<Map<String, Object>> customerMaxAsset() {
        return ResponseEntity.ok(reportsService.customerWithMaxAssetValue());
    }

    // 3
    @GetMapping("/customer-min-asset")
    public ResponseEntity<Map<String, Object>> customerMinAsset() {
        return ResponseEntity.ok(reportsService.customerWithMinAssetValue());
    }

    // 4
    @GetMapping("/stock-most-transacted")
    public ResponseEntity<Map<String, Object>> stockMostTransacted() {
        return ResponseEntity.ok(reportsService.mostTransactedStock());
    }

    // 5
    @GetMapping("/stock-least-transacted")
    public ResponseEntity<Map<String, Object>> stockLeastTransacted() {
        return ResponseEntity.ok(reportsService.leastTransactedStock());
    }

    // 6
    @GetMapping("/stocks-never-transacted")
    public ResponseEntity<List<Map<String, Object>>> stocksNeverTransacted() {
        return ResponseEntity.ok(reportsService.stocksNeverTransacted());
    }

    // 7
    @GetMapping("/stocks-transacted-all")
    public ResponseEntity<List<Map<String, Object>>> stocksTransactedAll() {
        return ResponseEntity.ok(reportsService.allTransactedStocks());
    }

    // 8
    @GetMapping("/stock-highest-price")
    public ResponseEntity<List<Map<String, Object>>> stockHighestPrice() {
        return ResponseEntity.ok(reportsService.highestPricedStock());
    }

    // 9
    @GetMapping("/stock-lowest-price")
    public ResponseEntity<List<Map<String, Object>>> stockLowestPrice() {
        return ResponseEntity.ok(reportsService.lowestPricedStock());
    }

    // 10
    @GetMapping("/customer-lowest-priced-stock")
    public ResponseEntity<List<Map<String, Object>>> customerLowestPricedStock() {
        return ResponseEntity.ok(reportsService.customerWithLowestPricedStock());
    }

    // 11
    @GetMapping("/customers")
    public ResponseEntity<List<Map<String, Object>>> allCustomers() {
        return ResponseEntity.ok(reportsService.allCustomers());
    }

    // 12
    @GetMapping("/transactions")
    public ResponseEntity<List<Map<String, Object>>> allTransactions() {
        return ResponseEntity.ok(reportsService.allTransactions());
    }

    // 13
    @GetMapping("/most-common-txn-type")
    public ResponseEntity<Map<String, Object>> mostCommonTxnType() {
        return ResponseEntity.ok(reportsService.mostCommonTxnType());
    }

    // 14
    @GetMapping("/total-assets")
    public ResponseEntity<Map<String, Object>> totalAssets() {
        return ResponseEntity.ok(reportsService.totalAssets());
    }
}