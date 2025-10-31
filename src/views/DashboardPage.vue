<script lang="ts" setup>
import { ProductService } from '@/service/ProductService'
import { useNProgress } from '@/composables/useNProgress'
import { onMounted, ref } from 'vue'

type ProductList = Awaited<ReturnType<typeof ProductService.getProductsSmall>>
type ProductItem = ProductList extends Array<infer Item> ? Item : never

const products = ref<ProductItem[]>([])

const carouselResponsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: '768px',
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: '560px',
    numVisible: 3,
    numScroll: 3,
  },
]

const { wrap } = useNProgress()

const loadProducts = async () => {
  const data = await ProductService.getProductsSmall()
  products.value = data
}

onMounted(() => {
  wrap(loadProducts)
})

const getSeverity = (
  status: ProductItem['inventoryStatus'],
): 'success' | 'danger' | 'warn' | 'secondary' | 'info' | 'contrast' | undefined => {
  switch (status) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warn'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return undefined
  }
}
</script>

<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Carousel</div>
    <Carousel
      :value="products"
      :numVisible="3"
      :numScroll="3"
      :responsiveOptions="carouselResponsiveOptions"
    >
      <template #item="slotProps">
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.data.image"
                :alt="slotProps.data.name"
                class="w-full rounded"
              />
              <div class="dark:bg-surface-900 absolute rounded-border" style="left: 5px; top: 5px">
                <Tag
                  :value="slotProps.data.inventoryStatus"
                  :severity="getSeverity(slotProps.data.inventoryStatus)"
                />
              </div>
            </div>
          </div>
          <div class="mb-4 font-medium">{{ slotProps.data.name }}</div>
          <div class="flex justify-between items-center">
            <div class="mt-0 font-semibold text-xl">${{ slotProps.data.price }}</div>
            <span>
              <Button icon="pi pi-heart" severity="secondary" outlined />
              <Button icon="pi pi-shopping-cart" class="ml-2" />
            </span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>
