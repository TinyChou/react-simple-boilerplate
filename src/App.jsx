import React, {Component} from 'react'

import img1 from '../images/1.png'
import img2 from '../images/2.png'
import imgBg1 from '../images/bg1.png'
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
let pCompany = getQueryString('company')

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
  pCompany = pCompany

  let q = []
  for (let i = 0; i < qs.length; i++) {
    if (pQuestions.indexOf(qs[i].id) >= 0) {
      q.push(qs[i])
    }
  }
  pQuestions = q

  console.log(pQuestions)
  console.log(pSplash)
  console.log(pCurrentIndex)
  console.log(pAnswers)
  console.log(pRightCount)
  console.log(pScore)
  console.log(pToggleRightAnswers)
  console.log(pShareing)
  console.log(pName)
  console.log(pTel)
  console.log(pCompany)
}

let questions = pQuestions ? pQuestions : getRandom(qs, 10)

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
  },
  show: {
    width: '30rem',
    height: '5rem',
    backgroundColor: '#d73d3d',
    borderRadius: '1.5rem',
    color: 'white',
    fontSize: '3rem',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '3.5rem',
    fontWeight: 'bold'
  },
  submit: {
    width: '12rem',
    height: '6rem',
    backgroundColor: '#d73d3d',
    borderRadius: '1.5rem',
    color: 'white',
    fontSize: '4rem',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '3.5rem',
    fontWeight: 'bold'
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

    const hasParams = !!pQuestions
    this.state = {
      splash: hasParams ? pSplash : true,

      currentIndex: hasParams ? pCurrentIndex : 0,
      answers: hasParams ? pAnswers : [],

      rightCount: hasParams ? pRightCount : 0,
      score: hasParams ? pScore : 0,
      toggleRightAnswers: hasParams ? pToggleRightAnswers : false,

      shareing: hasParams ? pShareing : false,

      name: hasParams ? pName : null,
      tel: hasParams ? pTel : null,
      company: hasParams ? pCompany : null
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
            你答对了<font color="red" style={ { fontSize: '200%' } }>{this.state.rightCount}</font>题<br/>
            共得分<font color="red" style={ { fontSize: '200%' } }>{this.state.score}</font>分
            <div style={ cssInJsApp.view } onClick={ this.onToggleRight }>正确答案</div>
            <div style={ { textAlign: 'start' } }>
              { this.state.toggleRightAnswers ? this.renderRightAnswers(): ''}
            </div>
          </div>
          <div style={ cssInJsApp.divider }></div>
          { this.state.toggleRightAnswers ? '' : (
            <div style={ cssInJsApp.answers }>
              <div style={ Object.assign(cssInJsApp.show, { marginTop: '0' }) } onClick={ () => {
                 document.title = `我在武汉公安青年学习十九大精神网络知识竞赛中得了${this.state.score}分，一起来学习吧！`
                 this.setState({ shareing: true })
               } }>秀出我的成绩单</div>
              <br/>11月7日至16日，“武汉公安青年”将每天选取10份完善个人资料的满分答卷，送出“十九大安保卫士荣誉勋章”或神秘礼品。<br/><br/>
              完善个人资料<br/>
              您的名字：<input style={ cssInJsApp.input } onChange={ (e) => { this.setState({ name: e.target.value }) }}/><br/>
              您的电话：<input style={ cssInJsApp.input } onChange={ (e) => { this.setState({ tel: e.target.value }) } }/><br/>
              工作单位：<input style={ cssInJsApp.input } onChange={ (e) => { this.setState({ company: e.target.value })} }/><br/>
              <div style={ Object.assign({}, cssInJsApp.submit, { display: 'inline-block', marginLeft: '10rem' }) } onClick={ () => {
                console.log(this.state.name, this.state.tel, this.state.score, this.state.company)

                let questionIds = []
                for (let i = 0; i < questions.length; i++) {
                  questionIds.push(questions[i].id)
                }
                questionIds = JSON.stringify(questionIds)
                // window.location.href = `index.html?questions=${questionIds}&splash=${this.state.splash}&currentIndex=${this.state.currentIndex}&answers=${JSON.stringify(this.state.answers)}&rightCount=${this.state.rightCount}&score=${this.state.score}&toggleRightAnswers=${this.state.toggleRightAnswers}&shareing=${this.state.shareing}&name=${this.state.name}&tel=${this.state.tel}`
                if (!this.state.name) {
                  window.alert('名字不能为空!')
                  return
                }
                if (!this.state.tel) {
                  window.alert('电话不能为空!')
                  return
                }
                if (!this.state.company) {
                  window.alert('工作单位不能为空!')
                  return
                }
                if (this.state.tel.length !== '18812345678'.length) {
                  window.alert('电话长度不正确!')
                  return
                }
                // window.alert('成功!')
                $.post('/submit', {
                  name: this.state.name,
                  tel: this.state.tel,
                  score: this.state.score,
                  company: this.state.company
                }, function (result) {
                  if (result.code == 100) {
                    window.alert('成功!')
                  } else {
                    window.alert('失败!服务器出现异常...')
                  }
                });
              } }>提交</div>
              <div style={ Object.assign({}, cssInJsApp.submit, { height: '3rem', fontSize: '2rem', marginTop: '0', display: 'inline-block', marginLeft: '2rem' }) } onClick={ () => { window.location.href = 'https://mp.weixin.qq.com/s/ohQHmxKW-BPloiSHjO01Fw' } }>获奖名单</div>
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
      <div style={ { height: '45rem', overflow: 'auto' } }>
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
    top: '40rem',
    transform: 'translateX(-50%)',
    animation: '1s splash_slogan_one'
  },

  sloganRight: {
    position: 'absolute',
    top: '50rem',
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

  /*
  <img style={ cssInJsSplash.paper } src={ imgCircle2 } />
  <img style={ cssInJsSplash.pen } src={ imgIndex1 } />
  <img style={ cssInJsSplash.sloganLeft } src={ img1 } />
  <img style={ cssInJsSplash.sloganRight } src={ img2 } />
  */
  render() {
    return (
      <div style={ cssInJsSplash.bg }>

        <img style={ cssInJsSplash.start } src={ imgBeginTest } onClick={ this.props.onStartTap }/>
      </div>
    )
  }
}
