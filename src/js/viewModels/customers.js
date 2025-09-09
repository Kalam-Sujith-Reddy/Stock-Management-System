/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define(['../accUtils','knockout'],
 function(accUtils,ko) {
    function CustomerViewModel() {
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

  var self = this;

  self.showTable = ko.observable(false);

  self.toggleCustomers = function() {
    self.showTable(!self.showTable());
    // Optionally call listCustomers() when showing the table
    if (self.showTable()) {
      self.listCustomers();
    }
  

  self.listCustomers = function() {
    // Your AJAX fetch logic to populate table goes here
  };
}
      this.customers=ko.observableArray([]);
      
           this.listCustomers = function () {
        // alert("It's a joke!")
        fetch('http://localhost:8280/api/customers', {
          method: 'GET'
        })
          .then(response => response.json())
          .then(data => {
            // alert('Customers: ' + JSON.stringify(data.data));
            console.log(data);
            this.customers(data);
            // In a real application, you'd update the view/model with this data
          })
          .catch(error => {
            alert('Failed to list customers: ' + error);
          });
      }

      self.showDeleteForm = ko.observable(false);
      self.toggleDeleteForm = function() {
  self.showDeleteForm(!self.showDeleteForm());
};
self.stockIdToDelete = ko.observable('');

self.busy = ko.observable(false); // if not already defined

self.submitDeleteCustomer = function() {
    var id = self.stockIdToDelete();
    if (!id) {
        alert('Please enter a Customer ID.');
        return;
    }
    id = Number(id);
    if (Number.isNaN(id)) {
        alert('Customer ID must be a number.');
        return;
    }
    if (!confirm('Delete customer with ID ' + id + '?')) return;
    self.busy(true);

    fetch('http://localhost:8280/api/customers/' + id, {
            method: 'DELETE'
        })
        .then(function(res) {
            if (!res.ok) {
                if (res.status === 404) throw new Error('Customer not found');
                throw new Error('HTTP ' + res.status);
            }
            return res.text();
        })
        .then(function() {
            self.customers.remove(function(c) {
                return Number(c.custId) === id;
            });
            self.stockIdToDelete(null);
            alert('Customer deleted successfully.');
            // Optionally: refresh list
            self.listCustomers && self.listCustomers();
        })
        .catch(function(err) {
            alert('Failed to delete: ' + err.message);
        })
        .finally(function() {
            self.busy(false);
        });
};
 
      fetch
      this.connected = () => {
          if (!checkAuth()) {
    // If not logged in or not allowed, redirect to login
    sessionStorage.setItem('loginMessage', 'Please login to continue');
    window.router.go({path:'login'});
    return;
  }

  accUtils.announce('Customers page loaded.');
  document.title = "Customers";
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

      // Check if there's a login message set by redirect

    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return CustomerViewModel;
  }
);
