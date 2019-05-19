import React from 'react'
import ForumArticleListRoy from '../component/Forum/ForumArticleList/ForumArticleListRoy'
import ForumSearchbarRoy from '../component/Forum/ForumSearchbarRoy'
import ForumArticleContentRoy from '../component/Forum/ForumArticleContent/ForumArticleContentRoy'
import ForumArticleCommentRoy from '../component/Forum/ForumArticleComment/ForumArticleCommentRoy'
import ActionButtonCategoryRoy from '../component/Forum/ForumActionButton/ActionButtonCategoryRoy'
import ActionButtonFilterRoy from '../component/Forum/ForumActionButton/ActionButtonFilterRoy'
import ActionBtnScrollTopRoy from '../component/Forum/ForumActionButton/ActionBtnScrollTopRoy'
import ActionBtnScrollBottomRoy from '../component/Forum/ForumActionButton/ActionBtnScrollBottomRoy'
import ActionBtnCreateRoy from '../component/Forum/ForumActionButton/ActionBtnCreateRoy'
import ForumSideActionBarRoy from '../component/Forum/ForumSideActionBarRoy'

class Forum extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      // 用來接JSONSERVER所FETCH到的資料
      listdata: [],
      // 用來接列表點擊後當文章對應到的所有內容，用來渲染到文章內容用
      currentdata: {},
    }
  }

  async componentDidMount() {
    try {
      await this.setState({ loading: true })
      // 從JSONSERVER中抓forum這個陣列的的JSON檔
      const response = await fetch('http://localhost:5555/forum', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })

      if (!response.ok) throw new Error(response.statusText)

      const jsonObject = await response.json()

      await this.setState({
        // 用來下面ForumArticleListRoy渲染列表內容
        // 在這裡反轉物件順序，不要在ForumArticleListRoy MAP前用，否則每當重新渲染就會順序反過來
        listdata: jsonObject.reverse(),
        // 預設載入最新文章內容，在下面ForumArticleContentRoy元件渲染
        currentdata: jsonObject[jsonObject.length - 1],
      })
    } catch (e) {
      console.log(e)
    }
  }
  // element:點擊到列表的對應物件，index當個文章的索引值
  handleClick = (index, element) => {
    // 用來接列表點擊後當文章對應到的所有內容，用來渲染到文章內容ForumArticleContentRoy
    this.setState({ currentdata: element })
    console.log(this.state.currentdata.forumArticlePic)
  }

  render() {
    return (
      <>

        <div className="container-fuild justify-content-center">
          <div className="row justify-content-center ">
            <div className="col-3 mr-4 p-0 ">
              <div className="">
                <ActionBtnCreateRoy className="btn-fill" />
                <div className="my-4">
                  <ForumSearchbarRoy />

                </div>
                <div className="d-flex mb-3">
                  <ActionButtonCategoryRoy />
                  <div className=" ml-3">
                    <ActionButtonFilterRoy />
                  </div>
                </div>
                <ActionBtnScrollTopRoy />
                {/* 將陣列倒入COMPINET，用MAP的方式，記得設定KEY */}
                {/* 同時撈將各index */}
                {this.state.listdata.map((element, index) => (
                  <ForumArticleListRoy
                    //MAP之所在，KEY之所在
                    key={element.id}
                    listheadline={element.headline}
                    listforumSpoilers={element.forumSpoilers}
                    listforumViews={element.forumViews}
                    listforumCreateDate={element.forumCreateDate}
                    listforumName={element.forumName}
                    listforumAvatar={element.forumAvatar}
                    // 用bind綁定偵測點擊當下的element之index，並傳入handleClick得到index值
                    onClick={this.handleClick.bind(this, index, element)}
                  />
                ))}
                <ActionBtnScrollBottomRoy />
              </div>
            </div>
            <div className="col-7 ml-4">
              <div className="row m-0 p-0">
                <div className="col-12  p-5 border border-dark">
                  <ForumArticleContentRoy
                    // 將點擊文章列表後所產生的物件中的值傳下去，同時更新文章內容
                    contentheadline={this.state.currentdata.headline}
                    contentUserAvatar={this.state.currentdata.forumAvatar}
                    contentUserName={this.state.currentdata.forumName}
                    contentIssueDate={this.state.currentdata.forumCreateDate}
                    contentReview={this.state.currentdata.forumReview}
                    contentArticlePic={this.state.currentdata.forumArticlePic}
                  />
                </div>
              </div>
              <div className="row my-4">
                <div className="col-12 p-5 border border-dark">
                  <ForumArticleCommentRoy />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="px-3 py-4 rounded border border-warning position-fixed"
          style={{ right: 0, top: '25vh' }}
        >
          <ForumSideActionBarRoy />
        </div>
      </>
    )
  }
}

export default Forum
