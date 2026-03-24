import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Product } from '@/entities/product/model/types'
import { Card } from '@/shared/ui/Card/Card'
import styles from './ProductCard.module.css'

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation()

  return (
    <Card>
      <div className={styles.row}>
        <img
          className={styles.thumb}
          src={product.thumbnail}
          alt=""
          width={64}
          height={64}
        />
        <div className={styles.body}>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.meta}>
            {t('products.category')}: {product.category}
          </div>
          <div className={styles.stats}>
            {t('products.price')}: ${product.price.toFixed(2)} ·{' '}
            {t('products.rating')}: {product.rating}
          </div>
          <div className={styles.action}>
            <Link className={styles.link} to={`/products/${product.id}`}>
              {t('products.open')}
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
