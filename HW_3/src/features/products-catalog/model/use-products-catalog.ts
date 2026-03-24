import { useCallback, useMemo, useState } from 'react'
import { useGetProductsQuery } from '@/shared/api/dummy-json-api'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { selectCatalogPageSize } from '@/features/settings/model/selectors'

/**
 * Состояние каталога: поиск, пагинация и RTK Query — вынесено из UI.
 */
export function useProductsCatalog() {
  const pageSize = useAppSelector(selectCatalogPageSize)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [appliedQuery, setAppliedQuery] = useState<string | undefined>(undefined)

  const skip = (page - 1) * pageSize

  const { data, isLoading, isFetching, error, isError, refetch } =
    useGetProductsQuery({
      limit: pageSize,
      skip,
      q: appliedQuery,
    })

  const totalPages = useMemo(() => {
    if (!data) {
      return 1
    }
    return Math.max(1, Math.ceil(data.total / pageSize))
  }, [data, pageSize])

  const products = data?.products ?? []

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setPage(1)
      const q = searchInput.trim()
      setAppliedQuery(q.length > 0 ? q : undefined)
    },
    [searchInput],
  )

  const handleClear = useCallback(() => {
    setSearchInput('')
    setAppliedQuery(undefined)
    setPage(1)
  }, [])

  const goPrev = useCallback(() => {
    setPage((p) => Math.max(1, p - 1))
  }, [])

  const goNext = useCallback(() => {
    setPage((p) => Math.min(totalPages, p + 1))
  }, [totalPages])

  return {
    page,
    totalPages,
    searchInput,
    setSearchInput,
    handleSearch,
    handleClear,
    goPrev,
    goNext,
    products,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    isEmpty: !isLoading && !isError && products.length === 0,
  }
}
