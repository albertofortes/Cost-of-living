import React, { FC } from 'react'

import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { Cached, ErrorOutline } from '@mui/icons-material/'

import BoxHoc from './BoxHoc'

type Props = {
  rate: any,
}

const RateBox: FC<Props> = ({ rate }) => {
  const renderInflationRate = () => {
    if (rate.loading) return <Cached />
    if (rate.error) return <div><ErrorOutline /></div>
    return rate.results.rate + '%'
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
      }}>Inflation rate:</Typography> { rate && renderInflationRate() }
    </>
  )
}

export default BoxHoc(RateBox)