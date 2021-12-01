import react, { FC } from 'react'

import { Box } from '@mui/system'
import { Typography, TextField } from '@mui/material'
import { Cached, ErrorOutline } from '@mui/icons-material/'

import BoxHoc from './BoxHoc'

interface InflationState {
  results: {
    price: string,
  },
  error: string | null,
  loading: boolean
}

const PriceBox: FC<{data: InflationState}> = ({ data }) => {
  const renderInflationPrice = () => {
    if (data.loading) return <Cached />
    if (data.error) return <div><ErrorOutline /></div>
    return data.results.price 
  }

  return (
    <>
      <Typography variant="h6" gutterBottom component="div" sx={{
          marginBottom: '1em',
          fontSize: {
            xs: 13,
            sm: 15,
            md: 17,
            lg: 19,
            xl: 21,
          }
        }}>
          were equivalent to:
      </Typography>
      { data && renderInflationPrice() }
    </>
  )
}

export default BoxHoc(PriceBox)