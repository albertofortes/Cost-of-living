import { FC, useState, useEffect} from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import HomeForm from '../src/components/HomeForm'
import PriceBox from '../src/components/PriceBox'
import RateBox from '../src/components/RateBox'
import ValueBox from '../src/components/ValueBox'
import { formatDate, formatStringUrl, useLocalStorage } from '../src/components/utils'

import { RootState } from '../src/store'
import { useSelector, useDispatch } from 'react-redux'
import { fetchInflationRate, fetchHistoricInflation, fetchInflationValue, fetchInflationPrice } from '../src/reducers/inflation'

import { TextField, Typography, Alert, AlertTitle, autocompleteClasses } from '@mui/material'
import { Box, styled } from '@mui/system'
import { Cached } from '@mui/icons-material'

const MainWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: 'auto',
  '@media (min-width: 768px)' : {
    height: '100vh'
  }
}));

interface AutocompleteOption {
  label: string,
  value: string | undefined
}

const Home: NextPage = () => {
  const [country, setCountry] = useState<string | any>(useLocalStorage('inflation-country', 'Spain')[0])
  const [amount, setAmount] = useState<number>(1000)
  const [startDateValue, setStartDateValue] = useState<Date>(new Date(2000, 0, 1))
  const [endDateValue, setEndDateValue] = useState<Date>(new Date())
  const inflationPrice = useSelector((state: RootState) => state.inflation)
  const inflationRate = useSelector((state: RootState) => state.inflation)
  const inflationHistoric = useSelector((state: RootState) => state.inflation)
  const inflationValue = useSelector((state: RootState) => state.inflation)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInflationRate(formatStringUrl(country), formatDate(startDateValue), formatDate(endDateValue)))
    dispatch(fetchInflationValue(amount, formatStringUrl(country), formatDate(startDateValue), formatDate(endDateValue)))
    dispatch(fetchInflationPrice(amount, formatStringUrl(country), formatDate(startDateValue), formatDate(endDateValue)))
  }, [dispatch, amount, country, startDateValue, endDateValue])

  

  return (
    <>
      <Head>
        <title>Cost of living. Inflation graphs</title>
        <meta name="description" content="Inflation graphs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainWrapper>

        { !country && <Alert severity="error"><AlertTitle>Error</AlertTitle>You must select a country!</Alert> }

        <HomeForm 
          country={country} 
          setCountry={setCountry} 
          startDate={startDateValue} 
          setStartDate={setStartDateValue}
          endDate={endDateValue} 
          setEndDate={setEndDateValue}
        />
        
        

        <Box sx={{           
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          '@media (min-width: 768px)' : {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: '10px',
            alignItems: 'end',
            width: 'auto',
          }          
        }}>

          { inflationRate && <RateBox rate={inflationRate} /> }

          { inflationValue && <ValueBox data={inflationValue} amount={amount} setAmount={setAmount} /> }

          { inflationPrice && <PriceBox data={inflationPrice} /> }

        </Box>


        {/* inflationHistoric && renderInflationHistoric() */}
      </MainWrapper>
    </>
  )
}

export default Home