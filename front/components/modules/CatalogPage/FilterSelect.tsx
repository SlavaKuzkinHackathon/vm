/* eslint-disable indent */
import { $mode } from '@/context/mode'
import { $productsm, setProductsmByPopularity, setProductsmCheapFirst, setProductsmExpensiveFirst } from '@/context/products'
import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import { IOption, SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'
import { categoriesOptions } from '@/utils/selectContents'
import { useStore } from 'effector-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Select from 'react-select'

const FilterSelect = ({ setSpinner }: { setSpinner: (arg0: boolean) => void }) => {
  const mode = useStore($mode)
  const products = useStore($productsm)

  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const router = useRouter()

  useEffect(() => {
    if (products.rows) {
      switch (router.query.first) {
        case 'cheap':
          updateCategoryOption('Сначала недорогие')
          setProductsmCheapFirst()
          break
        case 'expensive':
          updateCategoryOption('Сначала дорогие')
          setProductsmExpensiveFirst()
          break
        case 'popular':
          updateCategoryOption('По популярности')
          setProductsmByPopularity()
          break
        default:
          updateCategoryOption('Сначала недорогие')
          setProductsmCheapFirst()
          break
      }
    }
  }, [products.rows, router.query.first])

  const updateCategoryOption = (value: string) => setCategoryOption({
    value, label: value
  })

  const updateRouteParam = (first: string) => router.push({
    query: {
      ...router.query,
      first
    }
  }, undefined, { shallow: true })

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
      setSpinner(true)
    setCategoryOption(selectedOption)

    switch ((selectedOption as IOption).value) {
      case 'Сначала недорогие':
        setProductsmCheapFirst()
        updateRouteParam('cheap')
        break;
      case 'Сначала дорогие':
        setProductsmExpensiveFirst()
        updateRouteParam('expensive')
        break;
      case 'По популярности':
        setProductsmByPopularity()
        updateRouteParam('popular')
        break;
    }
    setTimeout(() => setSpinner(false), 1000)
  }


  return (
    <Select
      placeholder="Я ищу..."
      value={categoryOption || createSelectOption('Сначала дешевые')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isSearchable={false}
      options={categoriesOptions}
    />
  )
}

export default FilterSelect
