import { FC } from 'react'
import NextLink from 'next/link'

import { Box, styled } from '@mui/system'
import { Autocomplete, TextField, Typography, Link as MUILink } from '@mui/material'

import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

import { countriesList } from './countriesList'
import { formatDate, formatStringUrl } from './utils'

const CustomizedTextField = styled(TextField)`
  width: 100% !important;

  @media (min-width: 960px) {
    width: 25ch !important;
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

const HomeForm: FC<Props> = ({ country, setCountry, startDate, setStartDate, endDate, setEndDate }) => {
  return (
    <>
      <Typography variant="h5" gutterBottom component="div" sx={{
          marginBottom: '1em',
          fontSize: {
            xs: 17, // theme.breakpoints.up('xs')
            sm: 17, // theme.breakpoints.up('sm')
            md: 18, // theme.breakpoints.up('md')
            lg: 21, // theme.breakpoints.up('lg')
            xl: 25, // theme.breakpoints.up('xl')
          },
          textAlign: 'center',
          '@media (min-width: 780px)' : {
            textAlign: 'left'
          }
        }}>
        <NextLink href={formatStringUrl(country)} passHref>
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
          <DatePicker
            disableFuture
            minDate={new Date('1961-02-01')}
            maxDate={endDate}
            openTo="year"
            views={['year', 'month', 'day']}
            label="select a start date"
            value={startDate}
            onChange={(newValue:any) => {
              setStartDate(newValue)
            }}
            renderInput={(params:any) => <CustomizedTextField {...params} helperText={null} variant="standard" />}
          />

          <DatePicker
            disableFuture
            minDate={new Date('1961-02-02')}
            maxDate={endDate}
            openTo="year"
            views={['year', 'month', 'day']}
            label="select an end date"
            value={endDate}
            onChange={(newValue:any) => {
              setEndDate(newValue);
            }}
            renderInput={(params:any) => <CustomizedTextField {...params} helperText={null} variant="standard" />}
          />
        </LocalizationProvider>

        <Autocomplete
          disablePortal
          value={country}
          onChange={(event: any, val: any) => {
            if(!val) val = '' // bulletproof
            setCountry(val)
            localStorage.setItem('inflation-country', JSON.stringify(val))
          }}
          inputValue={country}
          options={countriesList.map((option) => option.label)}
          renderInput={(params) => <CustomizedTextField {...params} label="Countries" variant="standard" />}
        />

      </Box>
    </>
  )
}

export default HomeForm