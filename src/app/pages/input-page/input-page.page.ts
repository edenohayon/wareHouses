import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from "@angular/router";


@Component({
  selector: 'app-input-page',
  templateUrl: './input-page.page.html',
  styleUrls: ['./input-page.page.scss'],
})
export class InputPagePage implements OnInit {

  private inputs = {
    length: { title: "אורך", input: 0 },
    width: { title: "רוחב", input: 0 },
    height: { title: "גובה", input: 2.2 },
    // incline: { title: "שיפוע", input: 'width'}

  }
  private showWarning = false;

  private incline = {title: "שיפוע", input: 'width'}

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  nextPage() {

    if (this.validInputs()) {


      this.inputs['incline'] = this.incline;

      console.log(this.inputs)

      let navigationExtras: NavigationExtras = {
        queryParams: this.inputs
      };
      this.navCtrl.navigateForward('outputpage', navigationExtras)
    }

  }

  //to allow clear on edit on first focus
  onInputFocus(event) {
    event.target.clearOnEdit = true;
  }

  validInputs() {
    // console.log(Object.keys(this.inputs));

    for (let key of Object.keys(this.inputs)) {
      // console.log(this.inputs[key]);
      if (this.inputs[key].input === 0) {
        this.showWarning = true;
        return false;
      }

    }
    return true;

  }

  onInclineClick(direction: string){
    console.log('onInclineClick() ', direction['detail'].value)
    this.incline.input = direction['detail'].value;
  }

}
