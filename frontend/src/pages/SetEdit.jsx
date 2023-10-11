import React from 'react'
import LayoutNormal from '../components/Parts/LayoutNormal'
import { useParams } from 'react-router-dom'

const SetEdit = () => {
    const {setId} = useParams()
  return (
    <LayoutNormal>
        {setId}
    </LayoutNormal>
  )
}

export default SetEdit