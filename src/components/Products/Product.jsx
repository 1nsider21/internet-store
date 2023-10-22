import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ROUTES } from '../../utils/routes'

import styles from '../../styles/Product.module.css'
import {
  addItemToCart,
  addItemToFavorites,
} from '../../features/user/userSlice'

import { PRODUCT_SIZES } from '../../utils/constants'

const Product = (item) => {
  const { currentUser } = useSelector(({ user }) => user)
  const { title, price, images, description, id } = item
  const dispatch = useDispatch()

  const [currentImage, setCurrentImage] = useState()
  const [currentSize, setCurrentSize] = useState(null)

  useEffect(() => {
    setCurrentSize(null)
  }, [id])

  useEffect(() => {
    if (!images.length) return

    setCurrentImage(images[0])
  }, [images])

  const addToCart = () => {
    dispatch(addItemToCart(item))
  }

  const addToFavorites = () => {
    dispatch(addItemToFavorites(item))
  }

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div
          className={styles.current}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <div className={styles['images-list']}>
          {images.map((image, index) => (
            <div
              key={index}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        <div className={styles.color}>
          <span>Color:</span> Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes:</span>

          <div className={styles.list}>
            {PRODUCT_SIZES.map((size) => (
              <div
                className={`${styles.size} ${
                  currentSize === size ? styles.active : ''
                }`}
                key={size}
                onClick={() => setCurrentSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <button
            className={styles.add}
            onClick={addToCart}
            disabled={!currentSize || !currentUser}
          >
            Add to cart
          </button>
          <button
            className={styles.favorite}
            onClick={addToFavorites}
            disabled={!currentUser}
          >
            Add to favorites
          </button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purchased</div>

          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  )
}

export default Product
