import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useGetProductsQuery } from '../../features/api/apiSlice'

import styles from '../../styles/Category.module.css'

import Products from '../Products/Products'

import { CATEGORY_DEFAULT_VALUES } from '../../utils/constants'

const Category = () => {
  const { id } = useParams()
  const { list } = useSelector(({ categories }) => categories)

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...CATEGORY_DEFAULT_VALUES,
  }

  const [isEnd, setEnd] = useState(false)
  const [category, setCategory] = useState(null)
  const [items, setItems] = useState([])
  const [values, setValues] = useState(CATEGORY_DEFAULT_VALUES)
  const [params, setParams] = useState(defaultParams)

  const { data, isLoading, isSuccess } = useGetProductsQuery(params)

  useEffect(() => {
    if (!id) return

    setValues(CATEGORY_DEFAULT_VALUES)
    setItems([])
    setEnd(false)
    setParams({ ...defaultParams, categoryId: id })
  }, [id])

  useEffect(() => {
    if (isLoading) return

    if (!data.length) return setEnd(true)

    setItems((_items) => [..._items, ...data])
  }, [data, isLoading])

  useEffect(() => {
    if (!id || !list.length) return

    const cat = list.find((item) => item.id === +id)

    setCategory(cat)
  }, [id, list])

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setItems([])
    setEnd(false)
    setParams({ ...defaultParams, ...values })
  }

  const handleReset = () => {
    setParams(defaultParams)
    setValues(CATEGORY_DEFAULT_VALUES)
    setEnd(false)
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{category?.name}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            onChange={handleChange}
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="0"
            onChange={handleChange}
            value={values.price_max}
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}

      {!isEnd && (
        <div className={styles.more}>
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  )
}

export default Category
