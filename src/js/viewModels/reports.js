define([
  '../accUtils',
  'ojs/ojcore',
  'knockout',
  'jquery',
  'ojs/ojarraydataprovider'
], function(accUtils, oj, ko, $, ArrayDataProvider) {
  function ReportsViewModel() {
    var self = this;

    // Core observables
    self.maxAssetCustomer = ko.observable('');
    self.minAssetCustomer = ko.observable('');
    self.mostTransactedStock = ko.observable('');
    self.leastTransactedStock = ko.observable('');
    self.neverTransactedStocks = ko.observableArray([]);
    self.neverTransactedStocksDP = new ArrayDataProvider(self.neverTransactedStocks, {keyAttributes: 'STOCK_ID'});

    // Toggle observables for each section
    self.showMaxAsset = ko.observable(true);
    self.showMinAsset = ko.observable(true);
    self.showMostTransacted = ko.observable(true);
    self.showLeastTransacted = ko.observable(true);
    self.showNeverTransacted = ko.observable(true);

    // Toggle section methods
    self.toggleShowMaxAsset = function() { self.showMaxAsset(!self.showMaxAsset()); };
    self.toggleShowMinAsset = function() { self.showMinAsset(!self.showMinAsset()); };
    self.toggleShowMostTransacted = function() { self.showMostTransacted(!self.showMostTransacted()); };
    self.toggleShowLeastTransacted = function() { self.showLeastTransacted(!self.showLeastTransacted()); };
    self.toggleShowNeverTransacted = function() { self.showNeverTransacted(!self.showNeverTransacted()); };

    // Report fetching methods
    self.getMaxAssetCustomer = function() {
      $.getJSON('http://localhost:8280/api/reports/customer-max-asset', function(data) {
        if (data) {
          self.maxAssetCustomer(data.FIRST_NAME + ' ' + data.LAST_NAME + ' (Value: ' + data.ASSET_VALUE + ')');
        }
      });
    };
    self.getMinAssetCustomer = function() {
      $.getJSON('http://localhost:8280/api/reports/customer-min-asset', function(data) {
        if (data) {
          self.minAssetCustomer(data.FIRST_NAME + ' ' + data.LAST_NAME + ' (Value: ' + data.ASSET_VALUE + ')');
        }
      });
    };
    self.getMostTransactedStock = function() {
      $.getJSON('http://localhost:8280/api/reports/stock-most-transacted', function(data) {
        if (data) {
          self.mostTransactedStock(data.STOCK_NAME + ' (Count: ' + data.TRANSACTION_COUNT + ')');
        }
      });
    };
    self.getLeastTransactedStock = function() {
      $.getJSON('http://localhost:8280/api/reports/stock-least-transacted', function(data) {
        if (data) {
          self.leastTransactedStock(data.STOCK_NAME + ' (Count: ' + data.TRANSACTION_COUNT + ')');
        }
      });
    };
    self.getNeverTransactedStocks = function() {
      $.getJSON('http://localhost:8280/api/reports/stocks-never-transacted', function(data) {
        if (data) {
          self.neverTransactedStocks(data);
        }
      });
    };

    // Auth check (for completeness)
    function checkAuth() {
      const userStr = sessionStorage.getItem("user");
      if (!userStr) return false;
      try {
        const user = JSON.parse(userStr);
        return user && (user.custType === "Admin");
      } catch (e) {
        return false;
      }
    }

    // Life-cycle hooks
    this.connected = () => {
      if (!checkAuth()) {
        sessionStorage.setItem('loginMessage', 'Please login to continue');
        window.router.go({path:'login'});
        return;
      }
      accUtils.announce('Reports page loaded.');
      document.title = "Reports";
    };
    this.disconnected = () => {};
    this.transitionCompleted = () => {};
  }

  return ReportsViewModel;
});