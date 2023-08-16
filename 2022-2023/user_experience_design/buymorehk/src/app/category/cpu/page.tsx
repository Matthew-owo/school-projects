import { Stack } from '@/components/@mui/material'
import CategoryList from '@/components/CategoryList'
import ProductList from '@/components/ProductList'
import React from 'react'

const CpuCategory = () => {
  return (
    <Stack direction="row" spacing={1} px={1} mt={2}>
      <CategoryList />
      <ProductList />
    </Stack>
  )
}

export default CpuCategory