package com.ofss;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:8000/")
@RequestMapping("/api/stocks")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        List<Stock> stocks = stockService.getAllStocks();
        return ResponseEntity.ok(stocks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStockById(@PathVariable int id) {
        Stock stock = stockService.getStockById(id);
        if (stock == null) {
            return ResponseEntity.status(404).body("Stock not found");
        }
        return ResponseEntity.ok(stock);
    }

    @PostMapping
    public ResponseEntity<String> createStock(@RequestBody Stock stock) {
        stockService.addStock(stock);
        return ResponseEntity.ok("Stock created successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStock(@PathVariable int id, @RequestBody Stock stock) {
        if (stock.getStockId() != 0 && stock.getStockId() != id) {
            return ResponseEntity.badRequest().body("Stock ID (primary key) cannot be changed.");
        }
        stock.setStockId(id);
        stockService.updateStock(stock);
        return ResponseEntity.ok("Stock updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStock(@PathVariable int id) {
        boolean deleted = stockService.deleteStock(id);
        if (!deleted) {
            return ResponseEntity.status(404).body("Stock not found");
        }
        return ResponseEntity.ok("Stock deleted successfully");
    }
    @PatchMapping("/{id}")
    public ResponseEntity<String> patchStock(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        if (updates.containsKey("STOCK_ID") || updates.containsKey("stockId")) {
            return ResponseEntity.badRequest().body("Stock ID (primary key) cannot be changed.");
        }
        stockService.partialUpdateStock(id, updates);
        return ResponseEntity.ok("Stock partially updated successfully");
    }
}