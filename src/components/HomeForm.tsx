import { FC, ChangeEvent, useEffect, useRef, useMemo, SelectHTMLAttributes } from 'react'
import NextLink from 'next/link'

import { Box, styled } from '@mui/system'
import { Autocomplete, TextField, Typography, SelectChangeEvent, Link as MUILink } from '@mui/material'

import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { countriesList } from '../data/countriesList'
import { formatDate, formatStringUrl } from './utils'

const CustomizedTextField = styled(TextField)`
  width: 95% !important;

  @media (min-width: 960px) {
    width: 18ch !important;
  }
`;

type Props = {
  setCountry: (value: string) => void,
  country: string,
  startDate: Date,
  setStartDate: (value: Date) => void,
  endDate: Date,
  setEndDate: (value: Date) => void
}

const StartDate: FC<{
  startDate: Date,
  setStartDate: (value: Date) => void,
  endDate: Date
  }> = ({startDate, endDate, setStartDate}) => {
  return (
    <>
      <DatePicker
        disableFuture
        minDate={new Date('1961-02-01')}
        maxDate={endDate}
        openTo="year"
        views={['year', 'month', 'day']}
        label="select a start date"
        value={startDate}
        onChange={(date: Date | null) => {
          setStartDate(date as Date)
        }}
        renderInput={(params:any) => <CustomizedTextField {...params} helperText={null} variant="standard" />}
      />
    </>
  )
}

const EndDate: FC<{
  endDate: Date, 
  setEndDate: (value: Date) => void
}> = ({endDate, setEndDate}) => {
  return (
    <>
      <DatePicker
        disableFuture
        minDate={new Date('1961-02-02')}
        maxDate={endDate}
        openTo="year"
        views={['year', 'month', 'day']}
        label="select an end date"
        value={endDate}
        onChange={(date: Date | null) => {
          setEndDate(date as Date);
        }}
        renderInput={(params:any) => <CustomizedTextField {...params} helperText={null} variant="standard" />}
      />
    </>
  )
}

const CountrySelector: FC<{
  country: string, 
  setCountry: (value: string) => void
}> = ({country, setCountry}) => {
  const handleCountryChange = (e: ChangeEvent<{}>, value: any): void => {
    if(!value) return
    localStorage.setItem('inflation-country', JSON.stringify(value))
    setCountry(value)
  }

  return (
    <>
      <Autocomplete
        disablePortal
        disableClearable
        value={country}
        onChange={handleCountryChange}
        inputValue={country}
        options={countriesList.map((option) => option.label)}
        renderInput={(params) => <CustomizedTextField {...params} label="Countries" variant="standard" />}
      />
    </>
  )
}

const HomeForm: FC<Props> = ({ country, setCountry, startDate, setStartDate, endDate, setEndDate }) => {
  const memoizedStartDate = useMemo(() => <StartDate startDate={startDate} endDate={endDate} setStartDate={setStartDate} />, [startDate, endDate, setStartDate])
  const memoizedEndDate = useMemo(() => <EndDate endDate={endDate} setEndDate={setEndDate} />, [endDate, setEndDate])
  const memoizedCountrySelector = useMemo(() => <CountrySelector country={country} setCountry={setCountry} />, [country, setCountry])

  return (
    <>
      <Typography variant="h5" gutterBottom component="div" sx={{
          marginBottom: '1em',
          fontSize: {
            xs: 17,
            sm: 17,
            md: 18,
            lg: 21,
            xl: 25,
          },
          textAlign: 'center',
          '@media (min-width: 780px)' : {
            textAlign: 'left'
          }
        }}>
        <NextLink href={{ pathname: formatStringUrl(country) }}>
          <MUILink>{country}</MUILink>
        </NextLink> inflation tax from {formatDate(startDate)} to {formatDate(endDate)}:
      </Typography>

      <Box sx={{
          display: {
            xs: 'block',
            sm: 'flex',
          },
          flexDirection: 'row',
          marginBottom: '1em',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>      
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {memoizedStartDate}
          {memoizedEndDate}          
        </LocalizationProvider>
        {memoizedCountrySelector}
      </Box>
    </>
  )
}

export default HomeForm