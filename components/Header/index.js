import {withRouter, Link} from 'react-router-dom'
import {HeadContainer, HomeImage} from './styledComponents'

const Header = () => {
  console.log('Hello')
  return (
    <HeadContainer>
      <Link to="/">
        <HomeImage
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
        />
      </Link>
    </HeadContainer>
  )
}

export default withRouter(Header)
