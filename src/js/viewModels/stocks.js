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
self.busy = ko.observable(false); // Add this if not defined already

self.submitDeleteStock = function () {
  var id = self.stockIdToDelete();
  if (!id) {
    alert("Please enter a Stock ID to delete.");
    return;
  }
  id = Number(id);
  if (Number.isNaN(id)) {
    alert("Stock ID must be a number.");
    return;
  }
  if (!confirm("Delete stock with ID " + id + "?")) return;

  self.busy(true);

  fetch('http://localhost:8280/api/stocks/' + id, {
    method: 'DELETE'
  })
    .then(function (res) {
      if (!res.ok) {
        if (res.status === 404) throw new Error('Stock not found');
        throw new Error('HTTP ' + res.status);
      }
      return res.text();
    })
    .then(function () {
      if (self.stocks && typeof self.stocks.remove === 'function') {
        self.stocks.remove(function(s) {
          return Number(s.stockId) === id;
        });
      }
      self.stockIdToDelete('');
      alert('Stock deleted successfully.');
      // Optionally: refresh list
      if (typeof self.listStocks === 'function') self.listStocks();
    })
    .catch(function (err) {
      alert('Failed to delete: ' + err.message);
    })
    .finally(function () {
      self.busy(false);
    });
};

function formatDateToDDMMYYYY(dateStr) {
  // Expects dateStr in "yyyy-mm-dd"
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
}
// UPDATE form observables
self.updateStockId = ko.observable('');
self.updateStockName = ko.observable('');
self.updateStockPrice = ko.observable('');
self.updateStockVolume = ko.observable('');
self.updateStockDate=ko.observable('');
self.updateListingPrice = ko.observable('');
self.updateListedExchange = ko.observable('');
self.updateErrorMessage = ko.observable('');
let updateErrorTimeout = null;
    self.updateStock = function () {
  var id = self.updateStockId();

  if (updateErrorTimeout) {
    clearTimeout(updateErrorTimeout);
    updateErrorTimeout = null;
  }

  if (!id) {
    alert("Please enter Stock ID to update.");
    return;
  }

  // Build stockData object with only non-empty fields
  let stockData = {};
  if (self.updateStockName())      stockData.stock_Name = self.updateStockName();
  if (self.updateStockPrice())     stockData.stock_Price = self.updateStockPrice();
  if (self.updateStockVolume())    stockData.stock_Volume = self.updateStockVolume();
  if (self.updateListingPrice())   stockData.listing_Price = self.updateListingPrice();
  if (self.updateStockDate())       stockData.listed_Date = formatDateToDDMMYYYY(self.updateStockDate());
  if (self.updateListedExchange()) stockData.listed_Exchange = self.updateListedExchange();

  // Don't send if nothing to update
  if (Object.keys(stockData).length === 0) {
    self.updateErrorMessage("Please enter at least one field to update.");
    updateErrorTimeout = setTimeout(function () {
      self.updateErrorMessage('');
      updateErrorTimeout = null;
    }, 3000);
    return;
  }

  fetch('http://localhost:8280/api/stocks/' + id, {
    method: 'PATCH', // <--- Use PATCH
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stockData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Update failed');
      }
      return response.text();
    })
    .then(data => {
      alert('Stock updated: ' + data);
      self.updateStockId('');
      self.updateStockName('');
      self.updateStockPrice('');
      self.updateStockVolume('');
      self.updateListingPrice('');
      self.updateListedExchange('');
      self.updateErrorMessage('');
      // Optionally refresh stock list here
    })
    .catch(error => {
      self.updateErrorMessage('Update failed');
      updateErrorTimeout = setTimeout(function () {
        self.updateErrorMessage('');
        updateErrorTimeout = null;
      }, 3000);
    });
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
