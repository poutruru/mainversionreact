import React from 'react'
import CardKagaStar from './CardKagaStar'
import CardKagaEditToAreaButton from './CardKagaEditToAreaButton'
import { Link } from 'react-router-dom'
const memberId = sessionStorage.getItem('memberId')
class CardKagaBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markText: '',
      star: '',
    }
  }
  componentDidMount() {
    const markProps = this.props.mark
    let markData = { markId: '', markcontent: '' }
    markProps.map(item => {
      if (item.markId === this.props.id) {
        markData.markId = item.markId
        markData.markcontent = item.markcontent
      }
      return item
    })
    // 初始狀態設定
    let propsData = this.props.star
    let dataStar = { starId: '', star: '' }
    propsData.map(item => {
      if (item.starId === memberId) {
        dataStar.starId = item.starId
        dataStar.star = item.star
      }
      return item
    })
    this.setState({
      markText: markData.markcontent,
      star: dataStar.star,
    })
  }

  mouseOver = event => () => {
    const realevent = '#' + event
    let cardTopMaskKaga = document.querySelector(realevent)
    //
    let elseCard = [...document.getElementsByName('TopOpenClose')]
    elseCard.map(item => {
      return (item.className = 'cardTopMaskKaga')
    })
    cardTopMaskKaga.className = 'cardTopMaskKagaZero'
  }

  mouseOut = event => () => {
    const realevent = '#' + event
    let cardTopMaskKaga = document.querySelector(realevent)
    cardTopMaskKaga.className = 'cardTopMaskKaga'
  }

  saveMiddleStar = val => {
    console.log(val)
    this.setState({ markText: val.mark.markcontent, star: val.star.star })
  }

  del = () => {
    this.props.del(this.props.id)
    // 去把會員的collectFilm裡面的這個id刪掉
    // 所以傳id回去就好
  }
  render() {
    return (
      <>
        <span
          onMouseOver={this.mouseOver('a' + this.props.id)}
          onMouseOut={this.mouseOut('a' + this.props.id)}
          key={this.props.id}
          className="col-3 flex-column aCardText position-relative"
        >
          {/* 外框＋底圖 */}
          <div
            className="card text-center flex-column border-0 cardAreaBgKaga"
            style={{
              backgroundImage: `url(${this.props.img})`,
            }}
          >
            {/* 上方淺色遮罩 */}
            <div
              id={'a' + this.props.id}
              name="TopOpenClose"
              className="pr-1 cardTopMaskKaga"
            />

            {/* 下方深色遮罩 */}
            <Link to={this.props.link}>
              <div className="h-30 d-flex flex-column justify-content-center cardBottomMaskKaga">
                <h6 className="card-title mb-1">{this.props.subtitle}</h6>
                <h4 className="card-title m-0">{this.props.title}</h4>
              </div>
            </Link>

            {/* 滑鼠滑入後彈出區塊 */}
            <div className="card-body align-items-center p-0 text-center cardPopupMaskKaga">
              {this.props.member ? (
                <>
                  <div>
                    <h4 className="mt-4 mb-2">我的評分</h4>
                  </div>
                  <CardKagaStar star={this.state.star} />
                  <h4 className="card-title mt-3">註記</h4>
                  {/* 文字標籤,給他一個寬度,超過就會變成點點點 */}
                  <span
                    style={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '200px',
                    }}
                  >
                    {this.state.markText !== ''
                      ? this.state.markText
                      : '尚無備註'}
                  </span>
                  <div className="row d-flex justify-content-center mt-4">
                    {/* 編輯按鈕, 觸發editArea元件 */}
                    <CardKagaEditToAreaButton
                      id={this.props.id}
                      title={this.props.title}
                      subtitle={this.props.subtitle}
                      star={this.props.star}
                      mark={this.props.mark}
                      newStarAndMark={this.props.newStarAndMark}
                      starAmimation={this.props.starAmimation}
                      saveMiddleStar={this.saveMiddleStar}
                    />

                    {/* 刪除按鈕 */}
                    <button
                      type="button"
                      className="btn btn-danger ml-2"
                      onClick={this.del}
                    >
                      刪除
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="mt-4 mb-2">目前評分</h4>
                  </div>
                  <CardKagaStar star={this.state.star} />
                  <h4 className="card-title mt-3">註記</h4>
                  {/* 文字標籤,給他一個寬度,超過就會變成點點點 */}
                  <span
                    style={{
                      display: 'inline-block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '200px',
                    }}
                  >
                    {this.state.markText !== ''
                      ? this.state.markText
                      : '尚無備註'}
                  </span>
                  <div className="row d-flex justify-content-center mt-4">
                    {/* 編輯按鈕, 觸發editArea元件 */}
                    <CardKagaEditToAreaButton
                      id={this.props.id}
                      title={this.props.title}
                      subtitle={this.props.subtitle}
                      star={this.props.star}
                      mark={this.props.mark}
                      newStarAndMark={this.props.newStarAndMark}
                      member={this.props.member}
                      starAmimation={this.props.starAmimation}
                    />
                    {/* 有給刪除值就有刪除按鈕 */}
                    {this.props.del ? (
                      <button
                        type="button"
                        className="btn btn-danger ml-2"
                        onClick={this.del}
                      >
                        刪除
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </span>
      </>
    )
  }
}
export default CardKagaBox
