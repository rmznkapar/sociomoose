import React from 'react'
import { APP_ROUTE } from '../../constants/Routes'

const BrandLogo = () => {
  return (
    <a href={APP_ROUTE.HOME}>
      <h1 className="font-bold text-3xl">Sociomoose</h1>
    </a>
  )
}

export default BrandLogo
