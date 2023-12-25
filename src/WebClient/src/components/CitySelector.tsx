import React, { useEffect, useState } from 'react'
import { AutoComplete, Input } from 'antd'
import { BankOutlined } from '@ant-design/icons'
import useFetch from '../hooks/useFetch'
import { getRegions } from '../services/CityService'
import { searchMatching } from '../utils/SearchEngine'
import IRegion, { ICity } from '../models/IRegion'

const RenderTitle = (region: string, cities: string[]) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    {region}
    <span>
      <BankOutlined /> {cities.length}
    </span>
  </div>
)

const RenderItem = (city: string, region: string) => ({
  key: `${city} ${region}`,
  value: city,
  city: { city, region },
  label: <span>{city}</span>
})

const CitySelector = ({ onSelect, defaultCity }: { onSelect: (city: ICity) => void; defaultCity?: string }) => {
  const regions = useFetch(getRegions)

  const [filteredRegions, setFilteredRegions] = useState<IRegion[]>([])
  useEffect(() => {
    if (regions.data) setFilteredRegions(regions.data)
  }, [regions.data])

  function handleSearch(inputValue: string) {
    const megaArr: { city: string; regionIndex: number }[] = []

    if (regions.data) {
      regions.data.forEach((reg, regIdx) => {
        reg.cities.forEach((city) => megaArr.push({ city, regionIndex: regIdx }))
      })

      const filtered = searchMatching(megaArr, (i) => i.city, inputValue, { distance: 2, threshold: 0.3 })

      const citiesByRegion = filtered.reduce((acc: IRegion[], city) => {
        if (!acc[regions.data?.[city.regionIndex].region]) {
          acc[regions.data?.[city.regionIndex].region] = []
        }
        acc[regions.data?.[city.regionIndex].region].push(city.city)
        return acc
      }, {})

      const result = Object.keys(citiesByRegion).map((region) => ({
        region,
        cities: citiesByRegion[region]
      }))

      setFilteredRegions(result)
    }
  }

  const transformRegions: any = () =>
    filteredRegions.map((reg, idx) => ({
      key: `${reg} ${idx}`,
      label: RenderTitle(reg.region, reg.cities),
      options: reg.cities.map((city) => RenderItem(city, reg.region))
    }))

  return (
    <AutoComplete
      popupMatchSelectWidth={false}
      style={{ width: '100%' }}
      loading={regions.loading}
      options={transformRegions()}
      onSearch={handleSearch}
      onSelect={(value, option) => onSelect(option.city as ICity)}
      defaultValue={defaultCity as any}>
      <Input.Search size="large" placeholder="Введите название города" />
    </AutoComplete>
  )
}

export default CitySelector
