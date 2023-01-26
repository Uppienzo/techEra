import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourseItem'
import {
  HomeContainer,
  CoursesContainer,
  Head,
  LoadContainer,
  CoursesList,
  NotFoundContainer,
  Image,
  Description,
  Retry,
  Text,
} from './styledComponents'

const progressConstantStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {courses: [], progressState: progressConstantStates.initial}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({progressState: progressConstantStates.loading})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.successfulFetch(data)
    } else {
      this.setState({progressState: progressConstantStates.failure})
    }
  }

  successfulFetch = data => {
    const {courses} = data
    const updatedCourses = courses.map(each => ({
      id: each.id,
      logoUrl: each.logo_url,
      name: each.name,
    }))
    this.setState({
      courses: updatedCourses,
      progressState: progressConstantStates.success,
    })
  }

  courses = () => {
    const {courses} = this.state
    return (
      <CoursesContainer>
        <Head>Courses</Head>
        <CoursesList>
          {courses.map(each => (
            <CourseItem key={each.id} details={each} />
          ))}
        </CoursesList>
      </CoursesContainer>
    )
  }

  loader = () => (
    <LoadContainer data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
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
      <Retry onClick={this.getCourses}>Retry</Retry>
    </NotFoundContainer>
  )

  renderContents = () => {
    const {progressState} = this.state
    switch (progressState) {
      case progressConstantStates.loading:
        return this.loader()
      case progressConstantStates.success:
        return this.courses()
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

export default Home
