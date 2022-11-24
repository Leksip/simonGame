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
  score: string = localStorage.getItem('score')
  currentButton: number = 0

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
    this.currentButton = 0;
    this.chooseRandomColor(this.amountColor);
    localStorage.setItem('score', this.round.toString())
    console.log(this.currentButton)

  }

  endGame() {
    if (localStorage.getItem('score')) {
      if (this.round > +localStorage.getItem('score')) {
        localStorage.removeItem('score')
        localStorage.setItem('score', this.round.toString())
      }
    } else {
      localStorage.setItem('score', this.round.toString())
    }
    this.score = localStorage.getItem('score')
    this.userArr = []
    this.controlArr = []
    this.amountColor = 0
    this.i = 0
    this.looseMessage = `Вы проиграли в ${this.round} раунде, попробуйте еще раз!`
    this.round = 0
    this.currentButton = 0;
  }

  chooseUserButton(color: number) {
    this.userArr.push(color)
    if (this.userArr[this.currentButton] === this.controlArr[this.currentButton]) {
      this.currentButton++
      if (this.userArr.toString() === this.controlArr.toString()) {
        this.nextRound()
      }
    } else {
      this.endGame()
      this.currentButton = 0;
    }
  }

  test() {
    console.log(this.score)
  }

  changeComplexity(timeOut: number) {
    this.timeOut = timeOut
  }
}
