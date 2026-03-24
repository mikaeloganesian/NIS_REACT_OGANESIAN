import { useTranslation } from 'react-i18next'
import { ProductsCatalog } from '@/widgets/products-catalog/ui/ProductsCatalog'
import styles from './ProductsPage.module.css'

export default function ProductsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1 className={styles.title}>{t('products.title')}</h1>
      <ProductsCatalog />
    </div>
  )
}
