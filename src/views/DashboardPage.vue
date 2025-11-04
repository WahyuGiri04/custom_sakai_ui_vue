<script lang="ts" setup>
import { ProductService } from '@/service/ProductService'
import { useNProgress } from '@/layout/composables/useNProgress'
import { onMounted, ref } from 'vue'

type ProductList = Awaited<ReturnType<typeof ProductService.getProductsSmall>>
type ProductItem = ProductList extends Array<infer Item> ? Item : never

const products = ref<ProductItem[]>([])

const carouselResponsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1,
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
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="col-span-4 lg:col-span-3">
      <div class="card mb-0">
        <Carousel
          :value="products"
          :numVisible="1"
          :numScroll="1"
          :responsiveOptions="carouselResponsiveOptions"
        >
          <template #item="slotProps">
            <div class="dark:border-surface-700 rounded m-2">
              <div class="mb-0">
                <div class="relative mx-auto">
                  <img
                    :src="slotProps.data.image"
                    :alt="slotProps.data.name"
                    class="w-full rounded"
                  />
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
    <div class="col-span-4 lg:col-span-1">
      <div class="card mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Dudung</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">152</div>
          </div>
          <div
            class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
          </div>
        </div>
        <span class="text-primary font-medium">24 new </span>
        <span class="text-muted-color">since last visit</span>
      </div>
    </div>
  </div>
</template>
