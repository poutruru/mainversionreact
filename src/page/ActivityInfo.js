import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import ActivityPageSection from '../component/activity/ActivityPageSection/ActivityPageSection'
import ActivityTitle from '../component/activity/ActivityTitle/ActivityTitle'
import ActivityPageCard from '../component/activity/ActivityPageCard/ActivityPageCard'
import ActivityContent from '../component/activity/ActivityContent/ActivityContent'
import ActivityQRcode from '../component/activity/ActivityQRcode/ActivityQRcode'
import ActivityJoinBtn from '../component/activity/ActivityJoinBtn/ActivityJoinBtn'
import ActivityCard from '../component/activity/ActivityCard/ActivityCard'

class ActivityInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ['戲院資訊', '活動資訊', '相關活動', '相關影片'],
      activityPageData: [],
      activityPageOtherData: [],
      streetView: false,
      collectActivity: '',
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:5555/activityCardData', {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      const activityPageData = data.find(
        item => item.id === this.props.match.params.id
      )
      const activityPageOtherData = data.filter(
        item => item.id !== this.props.match.params.id
      )
      console.log(activityPageData)
      this.setState({ activityPageData: activityPageData })
      this.setState({ activityPageOtherData: activityPageOtherData })
      this.setState({ activityHeroImage: activityPageData.imgSrc })
    } catch (err) {
      console.log(err)
    }

    const memberId = sessionStorage.getItem('memberId')
    try {
      const res = await fetch('http://localhost:5555/member/' + memberId, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const data = await res.json()
      this.setState({ collectActivity: data.collectActivity })
    } catch (err) {
      console.log(err)
    }
  }
  handleOnClick = () => {
    this.setState({ activityPageData: [] })
    const res = fetch('http://localhost:5555/activityCardData', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const data = res.json()
    const activityPageData = data.find(
      item => item.id === this.props.match.params.id
    )
    const activityPageOtherData = data.filter(
      item => item.id !== this.props.match.params.id
    )

    console.log(activityPageData)
    this.setState({ activityPageData: activityPageData })
    this.setState({ activityPageOtherData: activityPageOtherData })
    this.setState({ activityHeroImage: activityPageData.imgSrc })
  }
  render() {
    return (
      <>
        <div className="container-fuild">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityPageSection
                theater={this.state.activityPageData.theater}
                title={this.state.activityPageData.title}
                content={this.state.activityPageData.content}
                HeroImage={this.state.activityPageData.imgSrc}
              />
            </div>
          </div>
        </div>
        <div className="container-fuild fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[0]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
              <ActivityPageCard
                theater={this.state.activityPageData.theater}
                theaterMap={this.state.activityPageData.theaterMap}
                phone={this.state.activityPageData.phone}
                GUINumber={this.state.activityPageData.GUINumber}
                website={this.state.activityPageData.website}
                email={this.state.activityPageData.email}
                lat={this.state.activityPageData.lat}
                lng={this.state.activityPageData.lng}
                streetView={this.state.streetView}
                handleOnClickMap={() => this.setState({ streetView: true })}
                handleOnClickMaplocal={() =>
                  this.setState({ streetView: false })
                }
              />
            </div>
          </div>
        </div>
        <div className="container-fuild fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[1]}
                className="content-title"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-9 mt-5">
              <ActivityContent
                theater={this.state.activityPageData.theater}
                title={this.state.activityPageData.title}
                theaterMap={this.state.activityPageData.theaterMap}
                content={this.state.activityPageData.content}
                joinContent={this.state.activityPageData.joinContent}
                joinContentCurrentPeople={
                  this.state.activityPageData.joinContentCurrentPeople
                }
              />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-3 mt-5">
              <ActivityQRcode imgSrc={window.location.href} />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-5 d-flex justify-content-center">
              <ActivityJoinBtn id={this.props.match.params.id} />
            </div>
          </div>
        </div>
        <div className="container-fuild fix-content" id="text">
          <div className="row">
            <div className="col-md-12 p-0">
              <ActivityTitle
                title={this.state.title[2]}
                className="content-title"
              />
            </div>
            {this.state.activityPageOtherData.map(data => (
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 mt-5">
                <ActivityCard
                  routerId={data.id}
                  handleCollect={() => this.handleCollect(data.id)}
                  key={data.id}
                  title={data.theater}
                  subtitle={data.title}
                  imgSrc={data.imgSrc}
                  collectOpen
                  isCollect={
                    this.state.collectActivity.indexOf(data.id) > -1
                      ? true
                      : false
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default ActivityInfo
