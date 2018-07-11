/*login.js*/
module.exports = class Login{

    constructor(credentials){
    
        if(credentials.userName.length < 10 && credentials.password.length < 10){
            this.userName = credentials.userName;
            this.password = credentials.password;
        }
        
    }
    
}