import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import {
  HomeContainer,
  LoadContainer,
  NotFoundContainer,
  Image,
  Description,
  Retry,
  Text,
  Card,
  CardImage,
  DetailsContainer,
  CardDescription,
  Name,
} from './styledComponents'

const progressConstantStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {courseDetails: '', progressState: progressConstantStates.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({progressState: progressConstantStates.loading})
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      this.successfulFetch(data.course_details)
    } else {
      this.setState({progressState: progressConstantStates.failure})
    }
  }

  successfulFetch = data => {
    const updatedCourseDetails = {
      id: data.id,
      description: data.description,
      ImageUrl: data.image_url,
      name: data.name,
    }
    this.setState({
      courseDetails: updatedCourseDetails,
      progressState: progressConstantStates.success,
    })
  }

  courseCard = () => {
    const {courseDetails} = this.state
    const {ImageUrl, name, description} = courseDetails
    return (
      <Card>
        <CardImage src={ImageUrl} alt={name} />
        <DetailsContainer>
          <Name>{name}</Name>
          <CardDescription> {description} </CardDescription>
        </DetailsContainer>
      </Card>
    )
  }

  loader = () => (
    <LoadContainer data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </LoadContainer>
  )

  failureView = () => (
    <NotFoundContainer>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <Text>Oops! Something Went Wrong</Text>
      <Description>
        We cannot seem to find the page you are looking for.
      </Description>
      <Retry onClick={this.getCourseDetails}>Retry</Retry>
    </NotFoundContainer>
  )

  renderContents = () => {
    const {progressState} = this.state
    switch (progressState) {
      case progressConstantStates.loading:
        return this.loader()
      case progressConstantStates.success:
        return this.courseCard()
      case progressConstantStates.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <HomeContainer>
        <Header />
        {this.renderContents()}
      </HomeContainer>
    )
  }
}

export default CourseItemDetails
