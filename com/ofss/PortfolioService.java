package com.ofss;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {
    private final PortfolioDao dao;

    public PortfolioService(PortfolioDao dao) { this.dao = dao; }

    public List<Portfolio> getCustomerPortfolio(int custId) {
        return dao.getCustomerPortfolio(custId);
    }
}