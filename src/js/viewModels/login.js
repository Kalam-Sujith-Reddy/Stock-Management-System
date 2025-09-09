define(['knockout', 'ojs/ojcore', 'ojs/ojrouter','appController'], function(ko, oj, Router,ac) {
  function LoginViewModel() {
    var self = this;

    // Observables for Login
    self.loginUsername = ko.observable('');
    self.loginPassword = ko.observable('');
    self.loginCustType = ko.observable('User');
    self.loginError = ko.observable('');
    self.loginSuccess=ko.observable('');

    // Observables for Signup
    self.signupFirstName = ko.observable('');
    self.signupLastName = ko.observable('');
    self.signupPhoneNumber = ko.observable('');
    self.signupCity = ko.observable('');
    self.signupEmailId = ko.observable('');
    self.signupUsername = ko.observable('');
    self.signupPassword = ko.observable('');
    self.signupCustType = ko.observable('User');
    self.signupError = ko.observable('');
    self.signupSuccess=ko.observable('');

    self.showLogin = ko.observable(true);

    self.showSignupForm = function() {
      self.showLogin(false);
      self.signupError('');
      self.signupSuccess('');
    };
    self.showLoginForm = function() {
      self.showLogin(true);
      self.loginError('');
    };

    // Login handler
    self.doLogin = function() {
      self.loginError('');
      var data = {
        username: self.loginUsername(),
        password: self.loginPassword(),
        custType: self.loginCustType()
      };
      fetch('http://localhost:8280/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        if (!res.ok) throw new Error("Invalid Username/Password/Role");
        return res.json();
      })
      .then(user => {
        sessionStorage.setItem("user", JSON.stringify(user));
        self.loginSuccess("Successfully logged in!");
     require(['appController'], function(appController) {
  appController.setNavForRole(user.custType); // "Admin" or "User"
  appController.userLogin(user.username);
});
        ac.userLogin(user.username);
        // Route based on role
        if (user.custType === "Admin") {
           window.router.go({path:'stocks'})
        } else {
          window.router.go({path:'dashboard'});
        }
       
      })
      .catch(err => {
        self.loginError(err.message);
        self.loginSuccess('');
      });
      return false;
    };

    // Signup handler
    self.doSignup = function() {
      self.signupError('');
      var data = {
        firstName: self.signupFirstName(),
        lastName: self.signupLastName(),
        phoneNumber: self.signupPhoneNumber(),
        city: self.signupCity(),
        emailId: self.signupEmailId(),
        user: {
          username: self.signupUsername(),
          password: self.signupPassword(),
          custType: self.signupCustType()
        }
      };
      fetch('http://localhost:8280/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => {
        if (!res.ok) throw new Error("Signup failed");
        self.showLoginForm();
      })
       .then(msg => {
    self.signupSuccess("Sign up successful! Please log in.");
    self.showLoginForm();
  })
      .catch(err => {
        self.signupError(err.message);
         self.signupSuccess("");
      });
      return false;
    };
self.loginMsg=ko.observable('');
    self.connected = function() {
  // Check for login message every time the login page is connected (navigated to)
  var msg = sessionStorage.getItem('loginMessage');
  if (msg) {
    self.loginMsg(msg);
    sessionStorage.removeItem('loginMessage');
  } else {
    self.loginMsg(''); // clear if not set
  }
};
    
  }
  return new LoginViewModel();
});