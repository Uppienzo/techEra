import {NotFoundContainer, Image, Head, Description} from './styledComponents'
import Header from '../Header'

const Notfound = () => (
  <>
    <Header />
    <NotFoundContainer>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt=" not found"
      />
      <Head>Page Not Found</Head>
      <Description>
        We are sorry, the page you requested could not be found.
      </Description>
    </NotFoundContainer>
  </>
)

export default Notfound
