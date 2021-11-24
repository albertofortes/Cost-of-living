import { useState, useEffect } from "react"

export const formatDate = (date: Date) => {
  const d: Date = new Date(date)
  let month: string = '' + (d.getMonth() + 1)
  let day: string = '' + d.getDate()
  let year: number = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  return [year, month, day].join('/')
}

export const formatStringUrl = (text: string) => text.replace(/\s+/g, '-').toLowerCase()

function getStorageValue(key: string, defaultValue: string) {
  const saved: string | any = (typeof window !== "undefined") ? localStorage.getItem(key) : null // https://dev.to/dendekky/accessing-localstorage-in-nextjs-39he
  const initial:string | null= JSON.parse(saved)
  return initial || defaultValue
}

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState<string | null>(() => getStorageValue(key, defaultValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}