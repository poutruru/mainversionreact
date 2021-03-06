import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ResComment from './ResComment'
import ArticleLike from '../ArticleList/ArticleButton/Like'
import ArticleMark from '../ArticleList/ArticleButton/Mark'
import ArticleShare from '../ArticleList/ArticleButton/Share'
import ArticleCommentbtn from '../ArticleList/ArticleButton/Comment'
import ResCommentInput from './ResCommentInput'

class ArticleComment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resComment: [],
      inputTextRes: '',
    }
    this.handleResChange = this.handleResChange.bind(this)
  }
  async componentDidMount() {
    try {
      const res = await fetch(
        'http://localhost:5555/articleResComment?_sort=id&_order=DESC',
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const dataR = await res.json()
      const resCommemtData = dataR.filter(item => item.rid === +this.props.sid)
      this.setState({ resComment: resCommemtData })
      console.log(resCommemtData)
    } catch (err) {
      console.log(err)
    }
  }

  //偵聽表單變化 且倒入state
  handleResChange = event => {
    this.setState({ inputTextRes: event.target.value })
    console.log(this.state.inputTextRes)
  }

  //送出留言  TODO:重新渲染
  goResComment = async () => {
    alert(this.state.inputTextRes)

    let newRes = {
      rid: this.props.sid,
      date: new Date().toString().substr(0, 10), //時間 TODO:調整格式
      author: '測試1',
      content: this.state.inputTextRes,
    }
    // 倒入 json資料庫
    try {
      const res = await fetch('http://localhost:5555/articleResComment', {
        method: 'POST',
        body: JSON.stringify(newRes),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const newResData = await res.json()
      // console.log(newComment)
      // const newCommentData = newComment.filter(
      //   item => item.aid === +this.state.thisId
      // )

      const news = this.state.resComment.find(
        item => +item.id === +newResData.id
      )
        ? true
        : // ? this.setState({ articleComment: this.state.articleComment })
          this.setState({
            resComment: [newRes, ...this.state.resComment],
          })
      console.log(newResData)
      console.log(news)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <>
        <Row className="my-3 justify-content-md-center">
          <Col md={8} xs={12} className="box-shadow p-4">
            <Row class="media-body d-flex py-5 justify-content-center">
              <Col xs={4} md={2} className="row">
                <div className="avatar mx-2">
                  <img src="/images/article/test4.jpg" class="mr-3" alt="..." />
                </div>
                <div>
                  <div>{this.props.author}</div>
                  <div>{this.props.date}</div>
                </div>
              </Col>
              <Col xs={8} md={'5'} className="">
                {this.props.content}
              </Col>
            </Row>
            <Row className="justify-content-end my-2 media-body">
              {/* 伸縮留言區 */}
              <ResCommentInput
                sid={this.props.sid}
                handleResChange={this.handleResChange}
                goResComment={this.goResComment}
                inputTextRes={this.inputTextRes}
              />
            </Row>

            {this.state.resComment.map((item, index) => (
              <>
                <ResComment
                  key={index}
                  author={item.author}
                  date={item.date}
                  content={item.content}
                />
              </>
            ))}
          </Col>
        </Row>
      </>
    )
  }
}

export default ArticleComment
