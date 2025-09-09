package com.ofss;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:8000/")
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAll() {
        return ResponseEntity.ok(service.getAllTransactions());
    }
    
    @GetMapping("/history/{cid}")
    public ResponseEntity<?> history(@PathVariable int cid){
    	return ResponseEntity.ok(service.transhistory(cid));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Transaction transaction = service.getTransactionById(id);
        return transaction != null ? ResponseEntity.ok(transaction) : ResponseEntity.status(404).body("Transaction not found");
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody Transaction t) {
        service.addTransaction(t);
        return ResponseEntity.ok("Transaction created successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable int id, @RequestBody Transaction t) {
        if (t.getTxnId() != 0 && t.getTxnId() != id) {
            return ResponseEntity.badRequest().body("Transaction ID (primary key) cannot be changed.");
        }
        t.setTxnId(id);
        service.updateTransaction(t);
        return ResponseEntity.ok("Transaction updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        boolean deleted = service.deleteTransaction(id);
        if (!deleted) {
            return ResponseEntity.status(404).body("Transaction not found");
        }
        return ResponseEntity.ok("Transaction deleted successfully");
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> partialUpdate(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        if (updates.containsKey("TXN_ID") || updates.containsKey("txnId")) {
            return ResponseEntity.badRequest().body("Transaction ID (primary key) cannot be changed.");
        }
        service.partialUpdateTransaction(id, updates);
        return ResponseEntity.ok("Transaction partially updated successfully");
    }
}