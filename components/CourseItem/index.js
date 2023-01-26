import {Link} from 'react-router-dom'

import {Li, Logo, Name} from './styledComponents'

const CourseItem = data => {
  const {details} = data
  const {id, logoUrl, name} = details
  return (
    <Link
      to={`/courses/${id}`}
      style={{textDecoration: 'none', color: 'inherit'}}
    >
      <Li>
        <Logo src={logoUrl} alt={name} />
        <Name> {name} </Name>
      </Li>
    </Link>
  )
}

export default CourseItem
