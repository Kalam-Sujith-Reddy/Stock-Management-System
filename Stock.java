package com.ofss;

import java.util.Date;

public class Stock {
    private int stockId;
    private String stockName;
    private double stockPrice;
    private int stockVolume;
    private double listingPrice;
    private Date listedDate;
    private String listedExchange;

    // Getters and setters
    public int getStockId() { return stockId; }
    public Stock(int stockId, String stockName, double stockPrice, int stockVolume, double listingPrice,
			Date listedDate, String listedExchange) {
		super();
		this.stockId = stockId;
		this.stockName = stockName;
		this.stockPrice = stockPrice;
		this.stockVolume = stockVolume;
		this.listingPrice = listingPrice;
		this.listedDate = listedDate;
		this.listedExchange = listedExchange;
	}
    
	public Stock() {
		super();
	}
	public void setStockId(int stockId) { this.stockId = stockId; }

    public String getStockName() { return stockName; }
    public void setStockName(String stockName) { this.stockName = stockName; }

    public double getStockPrice() { return stockPrice; }
    public void setStockPrice(double stockPrice) { this.stockPrice = stockPrice; }

    public int getStockVolume() { return stockVolume; }
    public void setStockVolume(int stockVolume) { this.stockVolume = stockVolume; }

    public double getListingPrice() { return listingPrice; }
    public void setListingPrice(double listingPrice) { this.listingPrice = listingPrice; }

    public Date getListedDate() { return listedDate; }
    public void setListedDate(Date listedDate) { this.listedDate = listedDate; }

    public String getListedExchange() { return listedExchange; }
    public void setListedExchange(String listedExchange) { this.listedExchange = listedExchange; }
}
