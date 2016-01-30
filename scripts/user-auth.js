var ref = new Firebase("https://glowing-inferno-9193.firebaseio.com/");

function setSignInStatus() {
    if (ref.getAuth() !== null) {
        $("#signInButton").after("<button type=\"button\" class=\"btn btn-default navbar-btn navbar-right pull-right\"  id=\"signOutButton\" onclick=\"doLogout()\">Sign Out</button>");
        $("#signInButton").remove();
    } else {
        $("#signOutButton").after("<button type=\"button\" class=\"btn btn-default navbar-btn navbar-right pull-right\" data-toggle=\"modal\" data-target=\"#loginModal\" id=\"signInButton\">Sign in</button>");
        $("#signOutButton").remove();
    }
}

setSignInStatus();

// replace errors with DOM messages
function doLogin(address, pass) {
    ref.authWithPassword({
        email: address, 
        password: pass}, function(error, authData) {
            if (error) {
                switch (error.code) {
                  case "INVALID_EMAIL":
                    alert("The specified user account email is invalid.");
                    break;
                  case "INVALID_PASSWORD":
                    alert("The specified user account password is incorrect.");
                    break;
                  case "INVALID_USER":
                    alert("The specified user account does not exist.");
                    break;
                  default:
                    alert("Error logging user in:", error);
                }
            } else {
                alert("Authenticated successfully with payload:", authData);
                $("#loginModal").modal("hide");
                setSignInStatus();
            }
    });
}

function doLogout() {
    ref.unauth();
    alert("You signed out successfully");
    setSignInStatus();
}

function createUser(address, pass) {
    ref.createUser({
        email: address, 
        password: pass}, function (err) {
        if (error) {
            alert("Error registering!");
        } else {
            doLogin(address, pass);
        }
    });
}

$("#loginButton").click(function(){
    doLogin($("#loginEmail").val(), $("#loginPassword").val());
});

$("#regButton").click(function(){
    createUser($("#regEmail").val(), $("#regPassword").val());
});