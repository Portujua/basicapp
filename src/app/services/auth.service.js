;(() => {

class Auth {
  constructor(lock, authManager, $window, $timeout, $state) {
    this.lock = lock;
    this.authManager = authManager;
    this.$window = $window;
    this.$timeout = $timeout;
    this.$state = $state;
    var self = this;

    console.log(authManager)

    this.lock.on('authenticated', function (authResult) {
      self.$window.localStorage.setItem("authResult", authResult);
      self.authResult = authResult;
      console.log(self.authResult)
      self.goHome();
    });

    if (this.checkSession())
      this.loadUser()
  }

  loadUser(){
    console.log(this.$window.localStorage.getItem("authResult"))
  }

  goLogin() {
    this.lock.show();
  }

  goHome() {
    this.$timeout(() => {
      this.$state.go('root.test');
    });
  }

  checkSession() {
    return this.$window.localStorage.getItem("authResult") || false;
  }
};

angular.module('app')
  .service('Auth', Auth);

})();
