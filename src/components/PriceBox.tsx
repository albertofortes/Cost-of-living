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

type Props = {
  data: InflationState
}

const PriceBox: FC<Props> = ({ data }) => {
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
            xs: 13, // theme.breakpoints.up('xs')
            sm: 15, // theme.breakpoints.up('sm')
            md: 17, // theme.breakpoints.up('md')
            lg: 19, // theme.breakpoints.up('lg')
            xl: 21, // theme.breakpoints.up('xl')
          }
        }}>
          were equivalent to:
      </Typography>
      { data && renderInflationPrice() }
    </>
  )
}

export default BoxHoc(PriceBox)