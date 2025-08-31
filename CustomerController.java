package com.ofss;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Customer>> getAll() {
        return ResponseEntity.ok(service.getAllCustomers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        Customer customer = service.getCustomerById(id);
        return customer != null ? ResponseEntity.ok(customer) : ResponseEntity.status(404).body("Customer not found");
    }

    @PostMapping
    public ResponseEntity<String> create(@RequestBody Customer c) {
        service.addCustomer(c);
        return ResponseEntity.ok("Customer created successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable int id, @RequestBody Customer c) {
        if (c.getCustId() != 0 && c.getCustId() != id) {
            return ResponseEntity.badRequest().body("Customer ID (primary key) cannot be changed.");
        }
        c.setCustId(id);
        service.updateCustomer(c);
        return ResponseEntity.ok("Customer updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        boolean deleted = service.deleteCustomer(id);
        if (!deleted) {
            return ResponseEntity.status(404).body("Customer not found");
        }
        return ResponseEntity.ok("Customer deleted successfully");
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> partialUpdate(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        if (updates.containsKey("CUST_ID") || updates.containsKey("custId")) {
            return ResponseEntity.badRequest().body("Customer ID (primary key) cannot be changed.");
        }
        service.partialUpdateCustomer(id, updates);
        return ResponseEntity.ok("Customer partially updated successfully");
    }
}