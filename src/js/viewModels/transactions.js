/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['../accUtils','knockout'],
 function(accUtils,ko) {
    function TransactionViewModel() {
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
self.showTable = ko.observable(false);
self.transactions = ko.observableArray([]);

// Toggle the transactions table and fetch if showing
self.toggleTransactions = function() {
  self.showTable(!self.showTable());
  if (self.showTable()) {
    self.listTransactions();
  }
};

// Fetch transactions from API and update the observable array
self.listTransactions = function() {
  fetch('http://localhost:8280/api/transactions', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(function(data) {
      // Assumes data is an array. Adjust if wrapped in { data: [...] }
      self.transactions(data);
    })
    .catch(function(error) {
      alert('Failed to list transactions: ' + error);
    });
};    

this.connected = () => {
   if (!checkAuth()) {
    // If not logged in or not allowed, redirect to login
    sessionStorage.setItem('loginMessage', 'Please login to continue');
    window.router.go({path:'login'});
    return;
  }
        accUtils.announce('Transaction page loaded.');
        document.title = "Transactions";
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
    return TransactionViewModel;
  }
);
