import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'

/**
 * Хук запросов к источнику данных
 * @param fetchFunction Функция запроса к источнику данных
 * @param fetchArgs Аргументы к функции запроса, при изменении аргументов данные запрашиваются снова
 * @returns data, setData - для работы с данными, refresh - запрашивает данные снова, error - ошибка, loading - статус выполнения запроса
 */

const useFetch = <TData, TArgs extends any[]>(
  fetchFunction: (...args: TArgs) => Promise<AxiosResponse<TData>>,
  ...fetchArgs: TArgs
) => {
  const [data, setData] = useState<TData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState(null)
  async function fetchData() {
    try {
      setLoading(true)
      const response = await fetchFunction(...fetchArgs)
      const result = await response.data
      setData(result)
    } catch (err) {
      setError(err?.message || 'Произошла ошибка')
    } finally {
      setLoading(false)
    }
  }

  async function refresh() {
    await fetchData()
  }

  useEffect(() => {
    setLoading(true)
    fetchData().then()
  }, [...fetchArgs])

  return { data, loading, error, setData, refresh }
}

export default useFetch
