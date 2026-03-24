import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '@/shared/api/dummy-json-api'
import { Button } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Spinner } from '@/shared/ui/Spinner/Spinner'
import { getApiErrorMessage } from '@/shared/lib/error/api-error'

export default function ProductDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const idNum = Number(id)

  const { data, isLoading, isError, error, refetch } = useGetProductByIdQuery(
    idNum,
    { skip: Number.isNaN(idNum) },
  )

  if (Number.isNaN(idNum)) {
    return (
      <Card>
        <p style={{ margin: 0 }}>{t('notFound.title')}</p>
        <div style={{ marginTop: '0.75rem' }}>
          <Link to="/products">{t('notFound.back')}</Link>
        </div>
      </Card>
    )
  }

  if (isLoading) {
    return <Spinner label={t('states.loading')} />
  }

  if (isError || !data) {
    return (
      <Card>
        <p style={{ margin: 0, color: 'var(--color-danger)' }}>
          {getApiErrorMessage(error) ?? t('states.error')}
        </p>
        <div style={{ marginTop: '0.75rem' }}>
          <Button type="button" variant="ghost" onClick={() => void refetch()}>
            {t('states.retry')}
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link
          to="/products"
          style={{ color: 'var(--color-accent)', fontSize: '0.875rem' }}
        >
          ← {t('products.title')}
        </Link>
      </div>
      <h1 style={{ margin: '0 0 1rem', fontSize: '1.5rem', fontWeight: 600 }}>
        {t('products.detailTitle')}: {data.title}
      </h1>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}
      >
        <img
          src={data.images[0] ?? data.thumbnail}
          alt=""
          style={{
            width: '100%',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
          }}
        />
        <Card>
          <dl style={{ margin: 0, display: 'grid', gap: '0.5rem' }}>
            <div>
              <dt style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
                {t('products.price')}
              </dt>
              <dd style={{ margin: 0 }}>${data.price.toFixed(2)}</dd>
            </div>
            <div>
              <dt style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
                {t('products.rating')}
              </dt>
              <dd style={{ margin: 0 }}>{data.rating}</dd>
            </div>
            <div>
              <dt style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
                {t('products.category')}
              </dt>
              <dd style={{ margin: 0 }}>{data.category}</dd>
            </div>
            {data.brand ? (
              <div>
                <dt style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
                  {t('products.brand')}
                </dt>
                <dd style={{ margin: 0 }}>{data.brand}</dd>
              </div>
            ) : null}
            <div>
              <dt style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
                {t('products.stock')}
              </dt>
              <dd style={{ margin: 0 }}>{data.stock}</dd>
            </div>
            <div>
              <dt style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
                {t('products.description')}
              </dt>
              <dd style={{ margin: 0, lineHeight: 1.5 }}>{data.description}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  )
}
