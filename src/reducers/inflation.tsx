import { createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit'

import { formatDate } from '../components/utils'

/*
  https://www.statbureau.org/en/inflation-api
  https://www.statbureau.org/get-data-json?country=spain
  https://www.statbureau.org/calculate-inflation-rate-json?country=spain&start=2015/1/1&end=2021/11/1
  https://www.statbureau.org/calculate-inflation-value-json?country=spain&start=2015/1/1&end=2021/11/1&amount=30000&format=true
*/

export interface InflationState {
  results: {
    price: string,
    rate: string,
    value: string,
    stats: any
  },
  error: string | null,
  loading: boolean
}

const initialState: InflationState = {
  results: {
    price: '',
    rate: '',
    value: '',
    stats: []
  },
  error: null,
  loading: false
}

export const inflationSlice = createSlice({
  name: 'inflation',
  initialState,
  reducers: {
    getInflationRate: state => {
      state.loading = true
    },
    getInflationRateSuccess: (state, { payload }) => {
      state.results.rate = payload
      state.loading = false
      state.error = null
    },
    getInflationRateFailure: state => {
      state.loading = false
      state.error = 'No data recieved'
    },
    getInflationValue: state => {
      state.loading = true
    },
    getInflationValueSuccess: (state, { payload }) => {
      state.results.value = payload,
      state.loading = false,
      state.error = null
    },
    getInflationValueFailure: state => {
      state.loading = false
      state.error = 'No data recieved'
    },
    getInflationPrice: state => {
      state.loading = true
    },
    getInflationPriceSuccess: (state, { payload }) => {
      state.results.price = payload,
      state.loading = false,
      state.error = null
    },
    getInflationPriceFailure: state => {
      state.loading = false
      state.error = 'No data recieved'
    },
    getHistoricInflation: state => {
      state.loading = true
    },
    getHistoricInflationSuccess: (state, { payload }) => {
      state.results.stats = payload
      state.loading = false
      state.error = null
    },
    getHistoricInflationFailure: (state) => {
      state.loading = false
      state.error = 'No data recieved'
    }
  }
})

// Asynchronous thunk actions:

export function fetchInflationRate(country: string, startDate: string, endDate: string) {
  //endDate = (endDate === undefined) ? formatDate(new Date()) : endDate
  //country = (country === undefined) ? 'spain' : country

  return async (dispatch: any) => {
    dispatch(getInflationRate())

    try {
      const response = await fetch(`https://www.statbureau.org/calculate-inflation-rate-json?country=${country}&start=${startDate}&end=${endDate}`)
      const data = await response.json()
      dispatch(getInflationRateSuccess(data))
    } catch (error) {
      dispatch(getInflationRateFailure())
    }
  }
}

export function fetchInflationValue(amount: number, country: string, startDate: string, endDate: string) {
  //endDate = (endDate === undefined) ? formatDate(new Date()) : endDate
  //country = (country === undefined) ? 'spain' : country

  return async (dispatch: any) => {
    dispatch(getInflationValue())

    try {
      const response = await fetch(`https://www.statbureau.org/calculate-inflation-value-json?country=${country}&start=${startDate}&end=${endDate}&amount=${amount}`)
      const data = await response.json()
      dispatch(getInflationValueSuccess(data))
    } catch (error) {
      dispatch(getInflationValueFailure())
    }
  }
}

export function fetchInflationPrice(amount: number, country: string, startDate: string, endDate: string) {
  //endDate = (endDate === undefined) ? formatDate(new Date()) : endDate
  //country = (country === undefined) ? 'spain' : country

  return async (dispatch: any) => {
    dispatch(getInflationPrice())

    try {
      const response = await fetch(`https://www.statbureau.org/calculate-inflation-price-json?country=${country}&start=${startDate}&end=${endDate}&amount=${amount}`)
      const data = await response.json()
      dispatch(getInflationPriceSuccess(data))
    } catch (error) {
      dispatch(getInflationPriceFailure())
    }
  }
}

export function fetchHistoricInflation(country: string, year: number) {
  //country = (country === undefined) ? 'spain' : country

  let yearObject:any = []
  for(let i:number = 0; i < 12; i++) {
    yearObject.push({})
  }

  return async (dispatch: any) => {
    dispatch(getHistoricInflation())

    try {
      const response = await fetch(`https://www.statbureau.org/get-data-json?country=${country}`)
      const data = await response.json()
      const filteredYear: any =  data.filter((el: any) => el['MonthFormatted'].startsWith(year))
      const dateSplit: any = yearObject.map((m: any, index: number) => {
        const matches:any = filteredYear.filter((el: any) => parseInt(el['MonthFormatted'].split("-")[1], 10) === index+1)
        const { ...response } =  matches[0]
        return response
      })      
      dispatch(getHistoricInflationSuccess(dateSplit))
    } catch (error) {
      dispatch(getHistoricInflationFailure())
    }
  }
}

// Action creators are generated for each case reducer function
export const { 
  getInflationRate, 
  getInflationRateSuccess, 
  getInflationRateFailure,
  getHistoricInflation,
  getHistoricInflationSuccess,
  getHistoricInflationFailure,
  getInflationPrice,
  getInflationPriceSuccess,
  getInflationPriceFailure,
  getInflationValue,
  getInflationValueSuccess,
  getInflationValueFailure
} = inflationSlice.actions
export default inflationSlice.reducer