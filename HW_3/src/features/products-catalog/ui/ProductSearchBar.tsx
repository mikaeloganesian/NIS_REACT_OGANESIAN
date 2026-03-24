import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import styles from './ProductSearchBar.module.css'

type Props = {
  searchInput: string
  onSearchInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onClear: () => void
}

export function ProductSearchBar({
  searchInput,
  onSearchInputChange,
  onSubmit,
  onClear,
}: Props) {
  const { t } = useTranslation()

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <Input
          name="q"
          label={t('products.searchPlaceholder')}
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
        />
      </div>
      <Button type="submit" variant="primary">
        {t('products.search')}
      </Button>
      <Button type="button" variant="ghost" onClick={onClear}>
        {t('products.clear')}
      </Button>
    </form>
  )
}
