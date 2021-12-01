import react, { FC } from 'react'

import { TextField, Typography } from '@mui/material'
import { Cached, ErrorOutline } from '@mui/icons-material/'

import BoxHoc from './BoxHoc'

interface InflationState {
  results: {
    value: string
  },
  error: string | null,
  loading: boolean
}

type Props = {
  data: InflationState,
  amount: Number,
  setAmount: (value: any) => void
}

const ValueBox: FC<Props> = ({ data, amount, setAmount }) => {
  const renderInflationValue = () => {
    if (data.loading) return <Cached />
    if (data.error) return <div><ErrorOutline /></div>
    return data.results.value 
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
        <TextField required variant="standard" size="small" sx={{width: '50px'}} 
            defaultValue={amount}
            onChange={(e: any) => setAmount(e.target.value) } /> current value:
      </Typography>
      { data && renderInflationValue() }
    </>
  )
}

export default BoxHoc(ValueBox)