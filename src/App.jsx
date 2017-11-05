import React, {Component} from 'react'

import img1 from '../images/1.png'
import img2 from '../images/2.png'
import imgBg1 from '../images/bg1.jpg'
import imgCircle2 from '../images/circle2.png'
import imgIndex1 from '../images/index1.png'
import imgBeginTest from '../images/begin-test.png'

import imgIndexBg from '../images/index-bg.jpg'

import imgArrow from '../images/arrow.png'
import imgShare from '../images/share.png'

import qs from './questions.json'

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len)
  if (n > len) throw new RangeError("getRandom: more elements taken than available")
  while (n--) {
    var x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len
  }
  return result
}

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

// params from url
/*
splash: true,

currentIndex: 0,
answers: [],

rightCount: 0,
score: 0,
toggleRightAnswers: false,

shareing: false,

name: null,
tel: null
*/
let pQuestions = getQueryString('questions')
let pSplash = getQueryString('splash')
let pCurrentIndex = getQueryString('currentIndex')
let pAnswers = getQueryString('answers')
let pRightCount = getQueryString('rightCount')
let pScore = getQueryString('score')
let pToggleRightAnswers = getQueryString('toggleRightAnswers')
let pShareing = getQueryString('shareing')
let pName = getQueryString('name')
let pTel = getQueryString('tel')
console.log(getQueryString('a'))

// 如果是分享的链接，获取题目
if (pQuestions) {
  pQuestions = JSON.parse(pQuestions)
  pSplash = JSON.parse(pSplash)
  pCurrentIndex = JSON.parse(pCurrentIndex)
  pAnswers = JSON.parse(pAnswers)
  pRightCount = JSON.parse(pRightCount)
  pScore = JSON.parse(pScore)
  pToggleRightAnswers = JSON.parse(pToggleRightAnswers)
  pShareing = JSON.parse(pShareing)
  pName = pName
  pTel = pTel
}

const questions = getRandom(qs, 10)

const cssInJsApp = {
  bg: {
    width: '100%',
    height: '100%',
    backgroundImage: `url("${imgBg1}")`,
    backgroundSize: 'cover',
    position: 'absolute',
    textAlign: 'center'
  },

  boxBg: {
    position: 'absolute',
    boxShadow: '2px 2px 5px #333333',
    width: '80%',
    height: '70rem',
    backgroundColor: '#eeb3b4',
    left: '10%',
    top: '10rem',
    borderRadius: '3rem'
  },

  boxFg: {
    position: 'absolute',
    boxShadow: '2px 2px 5px #333333',
    width: '84%',
    height: '70rem',
    backgroundColor: 'white',
    left: '8%',
    top: '13rem',
    borderRadius: '3rem'
  },

  indicator: {
    position: 'absolute',
    boxShadow: '1px 1px 1px #333333',
    width: '10rem',
    height: '5rem',
    backgroundColor: '#d73d3d',
    borderRadius: '2.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '12rem',
    color: 'white',
    lineHeight: '5rem',
    fontSize: '3rem'
  },

  question: {
    width: '88%',
    // height: '50%',
    textAlign: 'start',
    padding: '1rem',
    paddingTop: '5rem',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    color: 'black',
    fontSize: '2rem'
  },

  divider: {
    width: '100%',
    height: '2px',
    backgroundColor: '#888888'
  },

  answers: {
    width: '88%',
    // height: '50%',
    textAlign: 'start',
    padding: '3rem',
    color: 'black',
    fontSize: '2rem'
  },

  // 查看答案
  view: {
    width: '20rem',
    height: '3rem',
    backgroundColor: '#d73d3d',
    borderRadius: '1.5rem',
    color: 'white',
    fontSize: '1.8rem',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '2rem'
  },
  input: {
    width: '15rem',
    height: '2rem',
    border: '1px black solid',
    fontSize: '2rem'
  }
}
class App extends Component {
  constructor(props) {
    super(props)

    this.onStartTap = this.onStartTap.bind(this)
    this.renderQuestions = this.renderQuestions.bind(this)
    this.questionAnswerAndNext = this.questionAnswerAndNext.bind(this)

    this.renderDone = this.renderDone.bind(this)
    this.onToggleRight = this.onToggleRight.bind(this)
    this.renderRightAnswers = this.renderRightAnswers.bind(this)

    this.state = {
      splash: true,

      currentIndex: 0,
      answers: [],

      rightCount: 0,
      score: 0,
      toggleRightAnswers: false,

      shareing: false,

      name: null,
      tel: null
    }
  }

  onStartTap() {
    this.setState({
      splash: false
    })
  }

  questionAnswerAndNext(a) {
    let answers = this.state.answers
    answers.push(a)
    let index = this.state.currentIndex
    index++
    this.setState({
      answers: answers,
      currentIndex: index
    })

    // summary
    if (answers.length === questions.length) {
      let rightAnswers = []
      let rightCount = 0
      for (let i = 0; i < questions.length; i++) {
        rightAnswers.push(questions[i].answer)
      }
      for (let i = 0; i < rightAnswers.length; i++) {
        if (rightAnswers[i] === answers[i]) {
          rightCount++
        }
      }

      const score = rightCount * (100 / questions.length)
      this.setState({
        rightCount: rightCount,
        score: score
      })
      console.log('right answers: ' + rightAnswers)
      console.log('&your answers: ' + answers)
      console.log('right count: ' + rightCount + ' score: ' + score)
    }
  }

  renderQuestions() {
    const index = this.state.currentIndex

    const question = questions[this.state.currentIndex]
    const answers = question.answers


    return (
      <div style={ cssInJsApp.bg }>
        <div style={ cssInJsApp.boxBg }></div>
        <div style={ cssInJsApp.boxFg }>
          <div style={ cssInJsApp.question }>{ (index + 1) + question.title }</div>
          <div style={ cssInJsApp.divider }></div>
          <div style={ cssInJsApp.answers }>
            <div className='item' style={ { minHeight: '6rem', padding: '1rem' } } onClick={ () => this.questionAnswerAndNext('A') }>{ answers[0] }</div>
            <div className='item' style={ { minHeight: '6rem', padding: '1rem' } } onClick={ () => this.questionAnswerAndNext('B') }>{ answers[1] }</div>
            <div className='item' style={ { minHeight: '6rem', padding: '1rem' } } onClick={ () => this.questionAnswerAndNext('C') }>{ answers[2] }</div>
          </div>
        </div>
        <div style={ cssInJsApp.indicator }>{ index + 1 }/10</div>
      </div>
    )
  }

  render() {
    const splash = this.state.splash
    const done = (this.state.currentIndex === questions.length)
    const shareing = this.state.shareing

    return (
      // <h1>Hello React :)<SplashScreen /></h1>
      <div>
        { splash ? (<SplashScreen onStartTap={ this.onStartTap }/>) : (
          done ? this.renderDone() : this.renderQuestions()
        ) }
        { shareing ? (<Share onShareTap={ () => { this.setState({ shareing: false }) } }/>) : '' }
      </div>
    );
  }

  onToggleRight() {
    let view = this.state.toggleRightAnswers
    view = !view
    this.setState({
      toggleRightAnswers: view
    })
  }

  renderDone() {
    return (
      <div style={ cssInJsApp.bg }>
        <div style={ cssInJsApp.boxBg }></div>
        <div style={ Object.assign(cssInJsApp.boxFg, { }) }>
          <div style={ Object.assign(cssInJsApp.question, { textAlign: 'center' }) }>
            你答对了{this.state.rightCount}题<br/>
            共得分{this.state.score}分
            <div style={ cssInJsApp.view } onClick={ this.onToggleRight }>正确答案</div>
            <div style={ { textAlign: 'start' } }>
              { this.state.toggleRightAnswers ? this.renderRightAnswers(): ''}
            </div>
          </div>
          <div style={ cssInJsApp.divider }></div>
          { this.state.toggleRightAnswers ? '' : (
            <div style={ cssInJsApp.answers }>
              <div style={ cssInJsApp.view } onClick={ () => { this.setState({ shareing: true }) } }>让朋友也来参加</div>
              <br/><br/>秀出我的成绩单<br/><br/>
              您的名字：<input style={ cssInJsApp.input } onChange={ (e) => { this.setState({ name: e.target.value }) }}/><br/><br/>
              手机号：<input style={ cssInJsApp.input } onChange={ (e) => { this.setState({ tel: e.target.value }) } }/>
              <div style={ cssInJsApp.view } onClick={ () => {
                console.log(this.state.name, this.state.tel, this.state.score)

                window.alert('提交成功!')
              } }>提交</div>
            </div>
          )}
        </div>
        <div style={ cssInJsApp.indicator }>{ this.state.rightCount }</div>
      </div>
    )
  }

  renderRightAnswers() {
    const children = []
    for (let i = 0; i < questions.length; i++) {
      let qChildren = []
      const q = questions[i].answers
      for (let j = 0; j < q.length; j++) {
        qChildren.push(
          <p>{ q[j] }</p>
        )
      }

      children.push(
        <p key={i}>{ (i + 1) + questions[i].title }<br/>{qChildren}<br/>正确答案：{questions[i].answer}</p>
      )
    }

    return (
      <div style={ { height: '52rem', overflow: 'auto' } }>
        { children }
      </div>
    )
  }
}
export default App

class Share extends Component {
  render() {
    return (
      <div onClick={ this.props.onShareTap } style={ {
        position: 'absolute',
        backgroundColor: 'rgba(33, 33, 33, 0.8)',
        width: '100%',
        height: '100%'
      } }>
        <img src={ imgArrow } style={ {
          position: 'absolute',
          top: '0',
          right: '0'
        } }/>
        <img src={ imgShare } style={ {
          position: 'absolute',
          top: '12rem',
          right: '0'
        } }/>
      </div>
    )
  }
}

// splash screen
const cssInJsSplash = {
  bg: {
    width: '100%',
    height: '100%',
    backgroundImage: `url("${imgBg1}")`,
    backgroundSize: 'cover',
    position: 'absolute',
    textAlign: 'center'
  },

  sloganLeft: {
    position: 'absolute',
    top: '5rem',
    transform: 'translateX(-50%)',
    animation: '1s splash_slogan_one'
  },

  sloganRight: {
    position: 'absolute',
    top: '10rem',
    transform: 'translateX(-50%)',
    animation: '1s splash_slogan_two'
  },

  paper: {
    position: 'absolute',
    top: '24rem',
    transform: 'translateX(-50%)',
    animation: '2s splash_paper'
  },

  pen: {
    position: 'absolute',
    top: '24rem',
    animation: '2s splash_pen'
  },

  start: {
    position: 'absolute',
    top: '70rem',
    transform: 'translateX(-50%)',
    animation: '0.5s splash_start infinite alternate'
  }
}
class SplashScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={ cssInJsSplash.bg }>
        <img style={ cssInJsSplash.sloganLeft } src={ img1 } />
        <img style={ cssInJsSplash.sloganRight } src={ img2 } />
        <img style={ cssInJsSplash.paper } src={ imgCircle2 } />
        <img style={ cssInJsSplash.pen } src={ imgIndex1 } />
        <img style={ cssInJsSplash.start } src={ imgBeginTest } onClick={ this.props.onStartTap }/>
      </div>
    )
  }
}
