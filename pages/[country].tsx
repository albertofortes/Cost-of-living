import { FC, useState, useLayoutEffect} from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import { RootState } from '../src/store'
import { useSelector, useDispatch } from 'react-redux'
import { fetchHistoricInflation } from '../src/reducers/inflation'

import Head from 'next/head'
import { countriesList } from '../src/components/countriesList'

import { TextField, Typography, MenuItem, Link as MUILink, Alert, AlertTitle } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box, styled } from '@mui/system'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

import ChartistGraph from 'react-chartist'

const MainWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}))

const BoxHeadingSelector = styled(Box)({
  marginBottom: '20px',
  fontSize: '16px',
  '@media (min-width: 768px)' : {
    fontSize: '20px'
  } 
})

type Props = {
  stats: any
}

const Bar: FC<Props> = ({ stats }) => {
  const type = 'Bar'
  const series = stats.map((m: any) => m.InflationRate === undefined ? 0 :  m.InflationRate)
  const noData: boolean = series.every((val: any) => val === 0)

  const data: any = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    series: [ series ]
  }
  
  const options = {
    referenceValue: 0,
    scaleMinSpace: 20,
    seriesBarDistance: 12,
    fullWidth: true,
    chartPadding: 0,
    high: Math.max(...series) === 0 ? 1 : Math.max(...series),
    low: Math.min(...series) === 0 ? -1 : Math.min(...series)
  }  

  return (
    <>
      { noData  
        ? <Alert severity="error" sx={{marginBottom: '1em'}}><AlertTitle>No data.</AlertTitle>Please select another year.</Alert>
        : <Box sx={{ 
          marginBottom: '10px',
          backgroundColor: 'transparent',
          padding: 2,
          width: '500px'
          }}>
          <ChartistGraph data={data} options={options} type={type} className='ct-square'  />
        </Box>
      }
    </>
  )
}

const Country: FC = () => {
  const [ year, setYear ] = useState<number>(new Date().getFullYear())
  const router = useRouter()
  const country = router.query.country as string // const { country } = router.query
  const inflationHistoric = useSelector((state: RootState) => state.inflation)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    country && dispatch(fetchHistoricInflation(country, year))
  }, [country, year, dispatch])

  const renderInflationHistoric = () => {
    if (inflationHistoric.loading) return <small>Loading historic data...</small>
    if (inflationHistoric.error) return inflationHistoric.error
    
    if(inflationHistoric.results.stats.length === 0) return <small>No data for the selected year.</small>

    return (
     <Bar stats={inflationHistoric.results.stats} />
    )
  }

  const getHumanReadableCountry = (country: string) => {
    const CountryName = countriesList.filter(el => el.value === country)
    return CountryName[0]['label']
  }

  return (
    <>
      <Head>
        <title>Cost of living at {country}. Inflation graphs</title>
        <meta name="description" content={`Inflation data for ${country}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainWrapper>
        <BoxHeadingSelector>
          <NextLink href='/' passHref>
              <MUILink sx={{verticalAlign: 'bottom'}}><KeyboardBackspaceIcon /></MUILink>
          </NextLink> {country && getHumanReadableCountry(country)} inflation data for the year of <Select
              variant="standard"
              value={(year.toString())}
              label="Year"
              onChange={(e: SelectChangeEvent) => setYear(parseInt(e.target.value, 10) as number)}>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
          </Select>:
        </BoxHeadingSelector>

        <Box sx={{
          display: {
            xs: 'block',
            sm: 'flex',
          },
          flexDirection: 'row',
          marginBottom: '1em',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
          { inflationHistoric && renderInflationHistoric() }
        </Box>

      </MainWrapper>
    </>
  )
}

export default Country
