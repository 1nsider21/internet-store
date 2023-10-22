import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromFavorites } from '../../features/user/userSlice'

import styles from '../../styles/Favorites.module.css'
import { Link } from 'react-router-dom'

const Favorites = () => {
  const { favorites } = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  const removeItem = (event, id) => {
    event.preventDefault()
    dispatch(removeItemFromFavorites(id))
  }

  return (
    <section className={styles.favorites}>
      <h2>Your favorites</h2>

      {!favorites.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <div className={styles.list}>
          {favorites.map((item) => {
            const { title, category, images, price, id } = item

            return (
              <Link to={`/products/${id}`} className={styles.item} key={id}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${images[0]})` }}
                />

                <div className={styles.info}>
                  <h3 className={styles.name}>{title}</h3>
                  <div className={styles.category}>{category.name}</div>
                </div>

                <div className={styles.price}>{price}$</div>

                <div
                  className={styles.close}
                  onClick={(event) => removeItem(event, id)}
                >
                  <svg className="icon">
                    <use
                      xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                    />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default Favorites
