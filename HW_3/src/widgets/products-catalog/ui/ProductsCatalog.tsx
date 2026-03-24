import { useTranslation } from 'react-i18next'
import { useProductsCatalog } from '@/features/products-catalog/model/use-products-catalog'
import { ProductSearchBar } from '@/features/products-catalog/ui/ProductSearchBar'
import { ProductCatalogGrid } from '@/features/products-catalog/ui/ProductCatalogGrid'
import { ProductCatalogPagination } from '@/features/products-catalog/ui/ProductCatalogPagination'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import { getApiErrorMessage } from '@/shared/lib/error/api-error'
import catalogStyles from './ProductsCatalog.module.css'

export function ProductsCatalog() {
  const { t } = useTranslation()
  const catalog = useProductsCatalog()

  return (
    <>
      <ProductSearchBar
        searchInput={catalog.searchInput}
        onSearchInputChange={catalog.setSearchInput}
        onSubmit={catalog.handleSearch}
        onClear={catalog.handleClear}
      />

      {catalog.isLoading ? (
        <Spinner label={t('states.loading')} />
      ) : catalog.isError ? (
        <Card>
          <p className={catalogStyles.errorText}>
            {getApiErrorMessage(catalog.error) ?? t('states.error')}
          </p>
          <div className={catalogStyles.errorActions}>
            <Button
              type="button"
              variant="ghost"
              onClick={() => void catalog.refetch()}
            >
              {t('states.retry')}
            </Button>
          </div>
        </Card>
      ) : catalog.isEmpty ? (
        <Card>
          <p className={catalogStyles.emptyText}>{t('products.empty')}</p>
        </Card>
      ) : (
        <>
          <ProductCatalogGrid
            products={catalog.products}
            dimmed={catalog.isFetching}
          />
          <ProductCatalogPagination
            page={catalog.page}
            totalPages={catalog.totalPages}
            onPrev={catalog.goPrev}
            onNext={catalog.goNext}
          />
        </>
      )}
    </>
  )
}
