import { DateFormatter } from '@angular/common/src/pipes/deprecated/intl';
import { Event } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Component, OnInit, Output, Input, ViewChild, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DbTalkerService } from '../db-talker.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  public inputForm: FormGroup;
  public currentDate = new Date();
  public error = false;
  public received = false;
  public imageUploaded = false;
  public imageToLarge = false;
  public imageToApi;
  
  @Output() newPicCreated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(fb: FormBuilder, private dbTalker: DbTalkerService) {
    this.inputForm = fb.group({
      'imageName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'contributor': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'location': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'category': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  ngOnInit() {
  }

  onSubmit(x: FormGroup): void {
            
    this.dbTalker.tokenVerify(localStorage.getItem('token'))
      .then(results =>{
        if(results.answer === "yes"){
            let apiObject = new FormData();
            let timeStamp = Date.now();
            
            const todaysDate = this.currentDate.getMonth()+1 + "/" + this.currentDate.getDate() + "/" + this.currentDate.getFullYear(); //Gets date in correct format
            let formDataObject = JSON.parse(JSON.stringify(x)); //Convert FormGroup to regular object
            formDataObject.date = todaysDate; //Set date to todays date with correct format
            formDataObject.timeStamp = timeStamp; //append actual timeStamp for sorting
            formDataObject.imageName = formDataObject.imageName + "." + this.imageToApi.type.match(/\w+$/); //Add image file type to imageName

            apiObject.append('formInputData', JSON.stringify(formDataObject));
            apiObject.append('image', this.imageToApi);

            this.dbTalker.submitPhotoToDb(apiObject)
              .then(success => {this.received = true; this.newPicCreated.emit(true);})
              .catch(error => {this.error = true;console.log(error + ": Error submitting pic to SubmitPhotoToDb()--DbTalkerService");});
        }else{
          this.error = true;
          console.log("Token invalid or expired");
        }
      })
      .catch(error => {this.error = true;console.log(error + ": Error verifying token--DbTalkerService")});
  }

  // excepts and reads the image file object
  updateImageFile(x: object): void {
    // sets uploaded image to view
    const reader = new FileReader;
    reader.onload = this.imageLoader;

    if (x[0].size < 1000000001) {
      reader.readAsDataURL(x[0]);
      this.imageUploaded = true;
      this.imageToLarge = false;
    }else {
      this.imageToLarge = true;
      this.imageUploaded = false;
      document.getElementById('uploaded').setAttribute('src', '');
    }

    // save image to imageToAPI
    this.imageToApi = x[0];
  }


  // Loads image to the img element
  imageLoader(e: any): any {
    document.getElementById('uploaded').setAttribute('src', e.target.result);
  }

  // Message handling
  @ViewChild('imageform') imageForm;

  clearErrorMessage(){
    this.error = false;
  }
  clearMessageAndForm(){
    this.received = false;
    this.inputForm.reset();
    this.imageForm.nativeElement.reset();
    document.getElementById('uploaded').setAttribute('src', '');
  }

}
