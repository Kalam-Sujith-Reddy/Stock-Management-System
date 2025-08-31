package com.ofss;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CustomerService {
    private final CustomerDao customerDao;

    public CustomerService(CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    public List<Customer> getAllCustomers() {
        return customerDao.findAll();
    }

    public Customer getCustomerById(int id) {
        return customerDao.findById(id);
    }

    public void addCustomer(Customer c) {
        customerDao.save(c);
    }

    public void updateCustomer(Customer c) {
        customerDao.update(c);
    }

    public boolean deleteCustomer(int id) {
        // Option 1: Check for existence
        Customer customer = customerDao.findById(id);
        if (customer == null) {
            return false;
        }
        customerDao.deleteById(id);
        return true;
        // Option 2: Just use affected rows
        // return customerDao.deleteById(id) > 0;
    }

    public void partialUpdateCustomer(int id, Map<String, Object> updates) {
        customerDao.partialUpdate(id, updates);
    }
}
