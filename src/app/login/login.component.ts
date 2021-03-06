
import {timer as observableTimer} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbTalkerService } from './../db-talker.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginPopOut = false;

  public loginSubmitting = false;

  public tokenNotPresent = false;
  public loggedIn = false;
  public loginError = false;

  public loginMessage: string;
  public milliSecondsLeft: number;
  public timeLeft = {minutes: '00', seconds: '00'};

  constructor(fb: FormBuilder, private dbTalker: DbTalkerService) {
    this.loginForm = fb.group({
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    // call token verify on startup
    this.tokenCheck(localStorage.getItem('token'));
  }

  loginClick() {
    this.loginPopOut = !this.loginPopOut;
  }

  // Login Verification
  loginSubmit(x: FormGroup): void {
    const loginData = JSON.parse(JSON.stringify(x));
    this.loginSubmitting = true;  // login submit notifier

    this.dbTalker.loginSubmit(loginData)
      .then(results => {
        if ( results === 'Username and/or password not found') {
          this.loginMessage = results;
          console.log(this.loginMessage);
          this.loginError = true;
          this.loggedIn = false;
          this.loginSubmitting = false;
          this.tokenNotPresent = false;
        }else {
          this.tokenCheck(results);
        }
      })
      .catch(error => console.log('loginSubmit() error' + JSON.stringify(error)));
  }

  // Used to check both locally stored on startup and when submiting login
  tokenCheck(token): void {
    if (token !== null) {
            this.tokenNotPresent = false;
            this.dbTalker.tokenVerify(token)
              .then(results => {
                if (results.answer === 'yes') {
                      this.loginSubmitting = false;
                      localStorage.setItem('token', token);
                      this.loginMessage = 'Access Granted';
                      this.loginError = false;
                      this.loggedIn = true;
                      console.log(this.loginMessage);
                      this.milliSecondsLeft = -results.timeLeft;
                     // this.loginPopOut = !this.loginPopOut;
                      this.countdown();
                    }else {
                      this.loginSubmitting = false;
                      localStorage.removeItem('token');
                      this.loginMessage = 'Login failed or time expired!';
                      this.loginError = true;
                      this.loggedIn = false;
                      console.log(this.loginMessage);
                      this.milliSecondsLeft = results.timeLeft;
                    }
              })
              .catch(error => console.log(error));
    }else {
      this.tokenNotPresent = true;
      this.loginMessage = 'Log in for access';
      console.log(this.loginMessage);
    }
  }

  countdown(): void {

      const timer = observableTimer(1000, 1000).subscribe(
        count => {

          this.timeLeft.minutes = Math.floor(this.milliSecondsLeft / 60000).toString();
          if (this.timeLeft.minutes.length === 1) {
            this.timeLeft.minutes = '0' + this.timeLeft.minutes;
          }

          this.timeLeft.seconds = Math.round((this.milliSecondsLeft % 60000) / (1000)).toString();
          if (this.timeLeft.seconds.length === 1) {
            this.timeLeft.seconds = '0' + this.timeLeft.seconds;
          }

          if (this.milliSecondsLeft <= 0) {
            timer.unsubscribe();
            this.tokenCheck(localStorage.getItem('token'));
          }else {
            this.milliSecondsLeft -= 1000;
          }

        }
      );
  }
}
