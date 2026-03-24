import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button/Button'
import styles from './ProductCatalogPagination.module.css'

type Props = {
  page: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

export function ProductCatalogPagination({
  page,
  totalPages,
  onPrev,
  onNext,
}: Props) {
  const { t } = useTranslation()

  return (
    <div className={styles.bar}>
      <span className={styles.info}>
        {t('products.page', { current: page, total: totalPages })}
      </span>
      <div className={styles.actions}>
        <Button
          variant="ghost"
          type="button"
          disabled={page <= 1}
          onClick={onPrev}
        >
          {t('products.prev')}
        </Button>
        <Button
          variant="ghost"
          type="button"
          disabled={page >= totalPages}
          onClick={onNext}
        >
          {t('products.next')}
        </Button>
      </div>
    </div>
  )
}
