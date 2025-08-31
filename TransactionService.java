package com.ofss;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TransactionService {
    private final TransactionDao transactionDao;

    public TransactionService(TransactionDao transactionDao) {
        this.transactionDao = transactionDao;
    }

    public List<Transaction> getAllTransactions() {
        return transactionDao.findAll();
    }

    public Transaction getTransactionById(int id) {
        return transactionDao.findById(id);
    }

    public void addTransaction(Transaction t) {
        transactionDao.save(t);
    }

    public void updateTransaction(Transaction t) {
        transactionDao.update(t);
    }

    public boolean deleteTransaction(int id) {
        Transaction t = transactionDao.findById(id);
        if (t == null) {
            return false;
        }
        transactionDao.deleteById(id);
        return true;
        // Optionally: return transactionDao.deleteById(id) > 0;
    }

    public void partialUpdateTransaction(int id, Map<String, Object> updates) {
        transactionDao.partialUpdate(id, updates);
    }
}