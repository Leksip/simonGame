import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  controlArr = [];
  userArr = []
  disabled = false;
  activeButton: number;
  round: number = 0;
  looseMessage: string
  amountColor: number = 0
  i: number = 0
  timeOut: number = 1500
  score: string = localStorage.getItem('score')
  currentButton: number = 0

  sound = new Audio


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
      this.playSound()
      setTimeout(this.clearActiveButton, 500)
      this.controlArr.push(this.activeButton)
      this.disabled = true
      if (this.i > amountColor) {
        this.disabled = false
        clearInterval(timeoutChooseColor)
        this.i = 0
      }
    }, this.timeOut)
  }

  playGame() {
    this.disabled = true
    this.looseMessage = ''
    this.round++
    this.activeButton = Math.floor(Math.random() * 4) + 1
    this.controlArr.push(this.activeButton)
    this.playSound()
    setTimeout(this.clearActiveButton, 1000)
    setTimeout(()=>{this.disabled = false}, 800)

  }

  nextRound() {
    this.disabled = true
    this.round++
    this.amountColor++
    this.currentButton = 0;
    this.chooseRandomColor(this.amountColor);
    localStorage.setItem('score', this.round.toString())
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
    this.activeButton = color
    setTimeout(this.clearActiveButton, 50)
    this.playSound()
    if (this.userArr[this.currentButton] === this.controlArr[this.currentButton]) {
      this.currentButton++
      if (this.userArr.toString() === this.controlArr.toString()) {
        this.nextRound()
      }
    } else {
      this.endGame()
    }
  }

  changeComplexity(timeOut: number) {
    this.timeOut = timeOut
  }

  playSound() {
    switch (this.activeButton) {
      case 1:
        this.chooseSound("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
        break;
      case 2:
        this.chooseSound("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")
        break;
      case 3:
        this.chooseSound("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")
        break;
      case 4:
        this.chooseSound("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
        break;
    }
  }

  chooseSound(soundURL: string) {
    this.sound = new Audio(soundURL)
    this.sound.currentTime = 0;
    this.sound.play().then();
  }
}

