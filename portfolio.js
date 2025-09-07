define(['../accUtils','knockout'], function(accUtils,ko) {
  function PortfolioViewModel() {
    var self = this;
      function checkAuth() {
  const userStr = sessionStorage.getItem("user");
  if (!userStr) return false;
  try {
    const user = JSON.parse(userStr);
    // Allow if userType is User or Admin
    return user && (user.custType === "User");
  } catch (e) {
    return false;
  }
}
    self.portfolio = ko.observableArray([]);

    // Sell workflow observables
    self.showSellForm = ko.observable(false);
    self.sellStockId = ko.observable('');
    self.sellStockName = ko.observable('');
    self.sellMaxQty = ko.observable(0);
    self.sellQty = ko.observable('');
    self.sellMsg = ko.observable('');
    self.sellError = ko.observable('');

    self.connected = function() {
      self.loadPortfolio();
       if (!checkAuth()) {
    // If not logged in or not allowed, redirect to login
    sessionStorage.setItem('loginMessage', 'Please login to continue');
    window.router.go({path:'login'});
    return;
  }

    };

  self.portfolioEmptyMessage = ko.observable('');
self.loadPortfolio = function() {
  self.sellError('');
  var user = JSON.parse(sessionStorage.getItem("user") || "{}");
  fetch('http://localhost:8280/api/portfolio/' + user.userId)
    .then(res => {
      if (!res.ok) {
        // If 404 or error, treat as empty
        self.portfolio([]);
        self.portfolioEmptyMessage('No stocks available');
        return [];
      }
      return res.json(); // only attempt to parse JSON when response is ok
    })
    .then(data => {
      if (Array.isArray(data) && data.length === 0) {
        self.portfolio([]);
        self.portfolioEmptyMessage('No stocks available');
      } else if (Array.isArray(data)) {
        self.portfolio(data);
        self.portfolioEmptyMessage('');
      }
      // If you got here from error, do nothing (already set)
    })
    .catch(e => {
      self.portfolio([]);
      self.portfolioEmptyMessage('No stocks available');
    });
};

    // 1. Called when "Sell" button in table is clicked
    self.sellStock = function(stock) {
      self.sellStockId(stock.stockId);
      self.sellStockName(stock.stockName);
      self.sellMaxQty(stock.netHolding); // Set the max to user's owned qty for that stock
      self.sellQty('');
      self.showSellForm(true);
      self.sellMsg('');
      self.sellError('');
    };

    // 2. Hide inline sell form (Cancel)
    self.hideSellForm = function() {
      self.showSellForm(false);
      self.sellQty('');
      self.sellStockId('');
      self.sellStockName('');
      self.sellMaxQty(0);
    };

    // 3. On Form Submit ("Confirm Sell")
    self.confirmSell = function() {
      var qtyToSell = Number(self.sellQty());
      if (!qtyToSell || qtyToSell < 1) {
        self.sellError("Enter a valid quantity.");
        return false;
      }
      if (qtyToSell > self.sellMaxQty()) {
        self.sellError("Cannot sell more than you own.");
        return false;
      }
      var user = JSON.parse(sessionStorage.getItem("user") || "{}");
      // Fetch stock's current price
      fetch('http://localhost:8280/api/stocks/' + self.sellStockId())
        .then(res => res.json())
        .then(stock => {
          var txn = {
            custId: user.userId,
            stockId: self.sellStockId(),
            txnPrice: qtyToSell * stock.listingPrice,
            txnType: "SELL",
            qty: qtyToSell,
           
          };
          
          // Save transaction
          return fetch('http://localhost:8280/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(txn)
          });
        })
        .then(res => {
          if (!res.ok) throw new Error("Sell failed");
          self.sellMsg("Stock sold successfully.");
          self.sellMsg("Stock sold successfully.");
          setTimeout(function(){ self.sellMsg(''); }, 3000); // Clear after 3 seconds
          self.hideSellForm();
          self.loadPortfolio(); // Refresh after sell
        })
        .catch(err => {
          self.sellError("Sell failed. " + (err.message || ''));
        });
      return false; // Prevent default form submission
    };

    self.txnHistoryVisible = ko.observable(false);
self.transactionHistory = ko.observableArray([]);

self.toggleTxnHistory = function() {
  var currentlyVisible = self.txnHistoryVisible();
  self.txnHistoryVisible(!currentlyVisible);
  if (!currentlyVisible) {
    // If now showing, fetch latest transactions for this customer
    var user = JSON.parse(sessionStorage.getItem("user") || "{}");
    fetch('http://localhost:8280/api/transactions/history/' + user.userId)
      .then(res => res.json())
      .then(data => self.transactionHistory(data || []));
  }
};
      
  }
  return PortfolioViewModel;
});