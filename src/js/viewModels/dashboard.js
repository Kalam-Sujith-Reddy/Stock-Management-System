 
 define(['../accUtils','knockout'],
 function(accUtils,ko) {
    function DashboardViewModel() {
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

    self.buyStockVisible = ko.observable(false);
    self.toggleBuyStock = function() {
      self.buyStockVisible(!self.buyStockVisible());
      self.buyMessage('');
      self.buyError('');
      self.buyStockId('');
      self.buyQty('');
    };

    self.buyStockId = ko.observable('');
    self.buyQty = ko.observable('');
    self.buyMessage = ko.observable('');
    self.buyError = ko.observable('');

    self.doBuyStock = function() {
      var user = JSON.parse(sessionStorage.getItem("user") || "{}");
      var stockId = self.buyStockId();
      var qty = Number(self.buyQty());

      self.buyMessage('');
      self.buyError('');

      if (!stockId || !qty) {
        self.buyError("Please enter stock ID and quantity.");
        return false;
      }

      fetch('http://localhost:8280/api/stocks/' + stockId)
        .then(res => {
           if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Stock not found");
        } else {
          throw new Error("Error retrieving stock listing price");
        }
      }
        return res.json();
        })
        .then(stock => {
          var txn = {
            custId: user.userId,
            stockId: stockId,
            txnPrice: qty * stock.stockPrice, // total transaction value
            txnType: "BUY",
            qty: qty,
            txnDate: new Date().toISOString().substring(0,10)
          };
          return fetch('http://localhost:8280/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(txn)
          });
        })
        .then(res => {
          if (!res.ok) throw new Error("Buy failed");
          self.buyMessage("Stock bought successfully.");
          self.buyError('');
        })
        .catch(err => {
          if (err.message === "Stock not found") {
            self.buyError("Stock not found.");
          } else {
            self.buyError(err.message);
          }
          self.buyMessage('');
        });
      return false;
    };
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
    return DashboardViewModel;
  }
);
