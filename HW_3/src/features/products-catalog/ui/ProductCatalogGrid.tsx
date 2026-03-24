import type { Product } from '@/entities/product/model/types'
import { ProductCard } from '@/entities/product/ui/ProductCard/ProductCard'
import styles from './ProductCatalogGrid.module.css'

type Props = {
  products: Product[]
  dimmed: boolean
}

export function ProductCatalogGrid({ products, dimmed }: Props) {
  return (
    <div
      className={[styles.grid, dimmed ? styles.dimmed : ''].filter(Boolean).join(' ')}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
