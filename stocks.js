/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(['../accUtils','knockout'],
 function(accUtils,ko) {
    function StockViewModel() {

            function checkAuth() {
  const userStr = sessionStorage.getItem("user");
  if (!userStr) return false;
  try {
    const user = JSON.parse(userStr);
    // Allow if userType is User or Admin
    return user && (user.custType === "Admin");
  } catch (e) {
    return false;
  }
}
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */

  
     var self = this;

// TOGGLES for forms
self.showDeleteForm = ko.observable(false);
self.showUpdateForm = ko.observable(false);

// TOGGLE functions
self.toggleDeleteForm = function() {
  self.showDeleteForm(!self.showDeleteForm());
};
self.toggleUpdateForm = function() {
  self.showUpdateForm(!self.showUpdateForm());
};

// Delete form observable
self.stockIdToDelete = ko.observable('');

// DELETE logic
self.deleteStock = function () {
  var id = self.stockIdToDelete();
  if(!id) {
    alert("Please enter a Stock ID to delete.");
    return;
  }
  fetch('http://localhost:8280/api/stocks/' + id, {
    method: 'DELETE'
  })
    .then(response => response.text())
    .then(data => {
      alert('Stock deleted: ' + data);
      self.stockIdToDelete('');
      // Optionally refresh stock list here
    })
    .catch(error => { alert('Failed to delete stock: ' + error); });
};

// UPDATE form observables
self.updateStockId = ko.observable('');
self.updateStockName = ko.observable('');
self.updateStockPrice = ko.observable('');
self.updateStockVolume = ko.observable('');
self.updateStockDate=ko.observable('');
self.updateListingPrice = ko.observable('');
self.updateListedExchange = ko.observable('');
     self.updateStock = function () {
  var id = self.updateStockId();
  if(!id) {
    alert("Please enter Stock ID to update.");
    return;
  }
  const stockData = {
    stockName: self.updateStockName(),
    stockPrice: self.updateStockPrice(),
    stockVolume: self.updateStockVolume(),
    listingPrice: self.updateListingPrice(),
    listedDate:self.updateStockDate(),
    listedExchange: self.updateListedExchange()
  };
  fetch('http://localhost:8280/api/stocks/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stockData)
  })
    .then(response => response.text())
    .then(data => {
      alert('Stock updated: ' + data);
      // Clear form after updating
      self.updateStockId('');
      self.updateStockName('');
      self.updateStockPrice('');
      self.updateStockVolume('');
      self.updateListingPrice('');
      self.updateListedExchange('');
      // Optionally refresh stock list here
    })
    .catch(error => { alert('Failed to update stock: ' + error); });
};

self.showForm = ko.observable(false);
self.toggleForm = function() {
  self.showForm(!self.showForm());
};

  // Observables for form fields
  self.newStockId=ko.observable('');
  self.newStockName = ko.observable('');
  self.newStockPrice = ko.observable('');
  self.newStockVolume = ko.observable('');
  self.newListingPrice = ko.observable('');
  self.newListedExchange = ko.observable('');

  self.stockData = ko.observableArray([]);


  // Add Stock logic
  self.addstock = function() {
    const stockData = {
      stockId: self.newStockId(),
      stockName: self.newStockName(),
      stockPrice: self.newStockPrice(),
      stockVolume: self.newStockVolume(),
      listingPrice: self.newListingPrice(),
      listedExchange: self.newListedExchange()
    };

    fetch('http://localhost:8280/api/stocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stockData)
    })
   .then(response => response.text())
          .then(data => {
            alert('Response : ' + JSON.stringify(data));
          })
          .catch(error => {
            alert('Failed to add a stock: ' + error);
          });
  };

  // ...other existing code (like deletestock, updatestock, listStocks, etc.)

   
        var self = this;

  self.showTable = ko.observable(false);

  self.toggleStocks = function() {
    self.showTable(!self.showTable());
    // Optionally call listCustomers() when showing the table
    if (self.showTable()) {
      self.listStocks();
    }
  

  self.listStocks = function() {
    // Your AJAX fetch logic to populate table goes here
  };
}
      this.Stockss=ko.observableArray([]);
      
           this.listStocks = function () {
        // alert("It's a joke!")
        fetch('http://localhost:8280/api/stocks', {
          method: 'GET'
        })
          .then(response => response.json())
          .then(data => {
            // alert('Customers: ' + JSON.stringify(data.data));
            console.log(data);
            this.Stockss(data);
            // In a real application, you'd update the view/model with this data
          })
          .catch(error => {
            alert('Failed to list customers: ' + error);
          });
      }
      this.connected = () => {
            if (!checkAuth()) {
    // If not logged in or not allowed, redirect to login
    sessionStorage.setItem('loginMessage', 'Please login to continue');
    window.router.go({path:'login'});
    return;
  }
        accUtils.announce('Stock page loaded.');
        document.title = "Stocks";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return StockViewModel;
  }
);
