import React from 'react'

import LocationDetails from './LocationDetails'

const GetLocation = ({ match, }) => {
  const locationId = match.params.id
  return <LocationDetails id={ locationId } />
}

export default GetLocation
