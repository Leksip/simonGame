import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  controlArr = [];
  userArr = []
  activeButton: number;
  round: number = 0;
  looseMessage: string
  amountColor: number = 0
  i: number = 0
  timeOut: number = 1500
  clearActiveButton = () => {
    this.activeButton = 0
  }

  chooseRandomColor(amountColor) {
    this.controlArr = []
    this.userArr = []
    const timeoutChooseColor = setInterval(() => {
      this.activeButton = 0
      this.i++
      this.activeButton = Math.floor(Math.random() * 4) + 1
      setTimeout(this.clearActiveButton, 500)
      this.controlArr.push(this.activeButton)
      console.log(this.i)
      console.log(amountColor)
      console.log(`control ${this.controlArr}`)
      if (this.i > amountColor) {
        clearInterval(timeoutChooseColor)
        this.i = 0
      }
    }, this.timeOut)


  }

  playGame() {
    this.looseMessage = ''
    this.round++
    this.activeButton = Math.floor(Math.random() * 4) + 1
    this.controlArr.push(this.activeButton)
    setTimeout(this.clearActiveButton, 1000)

  }

  nextRound() {
    this.round++
    this.amountColor++
    this.chooseRandomColor(this.amountColor);
    console.log(`control ${this.controlArr}`)
  }

  chooseUserButton(color: number) {
    this.userArr.push(color)
    console.log(`user ${this.userArr}`)
    console.log(`control ${this.controlArr}`)
    console.log(`Round ${this.round}`)
    if (this.userArr.length >= this.controlArr.length) {
      if (this.userArr.toString() === this.controlArr.toString()) {
        this.nextRound()
      } else {
        this.userArr = []
        this.controlArr = []
        this.amountColor = 0
        this.i = 0
        this.looseMessage = `Вы проиграли в ${this.round} раунде, попробуйте еще раз!`
        this.round = 0
      }
    }
  }

  test() {
  }

  changeComplexity(timeOut: number) {
    this.timeOut = timeOut
    console.log(this.timeOut)
  }
}
