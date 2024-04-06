import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TravelItem from '../TravelItem'
import './index.css'

const statusConstant = {
  sucess: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class Travel extends Component {
  state = {
    travelList: [],
    apiStatus: statusConstant.initial,
  }

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    this.setState({apiStatus: statusConstant.inProgress})

    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
        description: each.description,
      }))
      this.setState({
        travelList: updatedData,
        apiStatus: statusConstant.sucess,
      })
    }
  }

  renderInProgressView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {travelList} = this.state

    return (
      <ul className="travelList">
        {travelList.map(each => (
          <TravelItem key={each.id} travelDetails={each} />
        ))}
      </ul>
    )
  }

  renderFinalView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case statusConstant.sucess:
        return this.renderSuccessView()
      case statusConstant.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="travel-container">
        <h1 className="heading">Travel Guide</h1>
        <div>{this.renderFinalView()}</div>
      </div>
    )
  }
}

export default Travel
