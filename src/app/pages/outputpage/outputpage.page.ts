import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Data {
  items: string;
}

export interface itemData {
  length: number;
  amount: number;
  name: string;
  price: number;
}


@Component({
  selector: 'app-outputpage',
  templateUrl: './outputpage.page.html',
  styleUrls: ['./outputpage.page.scss'],
})
export class OutputpagePage implements OnInit {

  private info =
    {
      walls: {},
      wallsI:{},
      roofs: {},
      U: {},
      L: {}
    }

  private mock =
    {
      walls: { length: 2.2, amount: 1, name: 'wall', price: 5 }, 
      wallsI: { length: 2, amount: 3, name: 'wallIncline' ,price: 5 },
      roofs: { length: 2.2, amount: 4, name: 'roof',price: 5  },
      U: { length: 3, amount: 5, name: 'uAl' ,price: 5 }, 
    }


  private userInput = {};

  private wallsSqrM: number;
  private roofsSqrM: number;

  private roofOffset = 0.4;

  private inclineOffset = 0.2;

  private isReady = false;

  private tin5price = 55;
  private tin7price = 65;
  private tin10price = 75;

  private uA5price = 110;
  private uA7price = 130;
  private uA10price = 200;

  private curPanelPrice: number;
  private curUPrice: number;
  private totalPrice: number;

  private itemsInfo;


  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.userInput = params;
      console.log('visual', this.userInput)
      this.curPanelPrice = this.tin5price;
      this.curUPrice = this.uA5price;
      // this.initMock()
      this.makeWareHouse();
      this.isReady = true;
    });
  }

  ngOnInit() {

    this.http.get<Data>('../../../assets/itemss.json')
      .subscribe((res) => {
        this.itemsInfo = res.items;
        console.log('res', this.itemsInfo)
        this.curPanelPrice = this.itemsInfo['wallTin5'].price;
        this.curUPrice = this.itemsInfo['utin5'].price;
      });

      this.totalPrice = 0;

    this.curPanelPrice = this.tin5price;
    this.curUPrice = this.uA5price;

  }

  initMock(){
    this.mock.walls.price = this.roundUpNumber(this.mock.walls.length * this.mock.walls.amount * this.curPanelPrice);
    this.mock.wallsI.price = this.roundUpNumber(this.mock.wallsI.length * this.mock.wallsI.amount * this.curPanelPrice);
    this.mock.roofs.price = this.roundUpNumber(this.mock.roofs.length * this.mock.roofs.amount * this.curPanelPrice * 1.04);
    this.mock.U.price = this.roundUpNumber(this.mock.U.amount * this.curUPrice) ;



  }

  makeWareHouse() {
    this.wallsSqrM = (this.userInput['width'].input * 2) + (this.userInput['length'].input * 2);
    this.roofsSqrM = (this.userInput['width'].input + this.roofOffset) * 2 + (this.userInput['length'].input + this.roofOffset) * 2;

    
    this.calcWalls();
    this.calcRoofs();
    this.calcU();
    this.calcL();

    this.calcPrice();
  }

  calcPrice() {
    console.log('calcPrice', this.info)
    let price = 0;
    for (let key in this.info) {
      price += this.info[key].price

    }

    // for (let key in this.mock) {
    //   console.log(this.mock[key].price)
    //     price += this.mock[key].price
    // }

    this.totalPrice = price;
    console.log('PRICE', price)
  }

  calcWalls() {
    let w = this.roundUpNumber(this.userInput['width'].input)
    let l = this.roundUpNumber(this.userInput['length'].input)

    // console.log(this.userInput)
    if (this.userInput['incline'].input === 'length') {

      let amount = w + l * 2;
      let check = (this.userInput['length'].input % 1) ;
      if (check * 2 <= 1 && check != 0)
        amount--;
      let h = this.userInput['height'].input;
      this.info.walls = ({ length: h, amount: amount, name: 'wall', price: this.curPanelPrice * amount * h})
      this.info.wallsI = ({ length: h - this.inclineOffset, amount: w, name: 'wallIncline', price: this.curPanelPrice * w * (h - this.inclineOffset)})

    }

    else if (this.userInput['incline'].input === 'width') {
      let amount = w * 2 + l;
      let check = (this.userInput['width'].input % 1) ;
      if (check * 2 <= 1 && check != 0)
        amount--;
      let h = this.userInput['height'].input;
      this.info.walls=({ length: h, amount: amount, name: 'wall', price: this.curPanelPrice * amount * h})
      this.info.wallsI=({ length: h - this.inclineOffset, amount: l, name: 'wallIncline', price: this.curPanelPrice * l * (h - this.inclineOffset)})
    }

    console.log('info after wall calc: ', this.info)
  }

  calcRoofs() {

    // let w = this.roundUpNumber(this.userInput['width'].input + 0.4)
    // let l = this.roundUpNumber(this.userInput['length'].input + 0.4)

    let tempW = this.userInput['width'].input + 0.4;
    let tempL = this.userInput['length'].input + 0.4;

    let roofW = 1.04;
    // all next if's are to minimize costumer waist of product

    if (tempW % 1 === 0) {
      let w = this.roundUpNumber(this.userInput['width'].input + 0.4);
      this.info.roofs=({ amount: w, length: this.userInput['length'].input + 0.4, name: 'roofs', price: this.curPanelPrice * w * roofW });
    }

    else if (tempL % 1 === 0) {
      let l = this.roundUpNumber(this.userInput['length'].input + 0.4)
      this.info.roofs=({ amount: l, length: this.userInput['width'].input + 0.4, name: 'roofs', price: this.curPanelPrice * l * roofW });
    }

    else if (tempW % 1 > tempL % 1) {
      let w = this.roundUpNumber(this.userInput['width'].input + 0.4);
      this.info.roofs=({ amount: w, length: this.userInput['length'].input + 0.4, name: 'roofs', price: this.curPanelPrice * w * roofW });
    }
    else {
      let l = this.roundUpNumber(this.userInput['length'].input + 0.4)
      this.info.roofs=({ amount: l, length: this.userInput['width'].input + 0.4, name: 'roofs', price: this.curPanelPrice * l * roofW });
    }



    // this.info.roofs.push({amount: this.roundUpNumber(this.userInput['length'].input + 0.4)}) ;
    console.log('info after roof calc: ', this.info)

  }

  calcU() {
    let amount = this.roundUpNumber((this.wallsSqrM * 2 + this.roofsSqrM) / 6)
    this.info.U=({ amount: this.roundUpNumber(amount), length: 6, name: "U", price: this.curUPrice * amount });
    console.log('info after u calc: ', this.info)

  }

  calcL() {
    if (this.userInput['height'].input <= 3) {
      this.info['L']=({ name: '5/5', amount: 4, length: 3, price: 30 * 4 })
      this.info['L']=({ name: '10/10', amount: 4, length: 3, price: 40 * 4 })
    }

  }

  roundUpNumber(num: number) {
    let w = num;

    if (num % 1 !== 0)
      w = w - (num % 1) + 1;

    console.log('getTotalCalc - ', w);
    return w;
  }

  consoleME(me) {
    console.log(me)
  }

  panelWidthChanged(event) {
    console.log(event)
    let value = event.detail.value;

    if (value === '5') {
      // this.curPanelPrice = this.itemsInfo['wallTin5'].price;
      // this.curUPrice = this.itemsInfo['utin5'].price;
      this.curPanelPrice = this.tin5price;
      this.curUPrice = this.uA5price;
    }
    else if (value === '7') {
      // this.curPanelPrice = this.itemsInfo['wallTin7'].price;
      // this.curUPrice = this.itemsInfo['utin7'].price;

      this.curPanelPrice = this.tin7price;
      this.curUPrice = this.uA7price;
    }
    else if (value === '10') {
      // this.curPanelPrice = this.itemsInfo['wallTin10'].price;
      // this.curUPrice = this.itemsInfo['utin10'].price;

      this.curPanelPrice = this.tin10price;
      this.curUPrice = this.uA10price;
    }
    console.log('panelWidthChanged', this.curPanelPrice, ' ', this.curUPrice)

    this.info = {walls:{},wallsI:{},roofs:{},U:{},L:{}};
    this.makeWareHouse();
    // this.initMock();
    // this.calcPrice();
  }

}
