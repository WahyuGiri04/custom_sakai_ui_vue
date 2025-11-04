<script lang="ts" setup>
import { ProductService } from '@/service/ProductService'
import { useNProgress } from '@/layout/composables/useNProgress'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { MenuMethods } from 'primevue/menu'

type ProductList = Awaited<ReturnType<typeof ProductService.getProductsSmall>>
type ProductItem = ProductList extends Array<infer Item> ? Item : never

const products = ref<ProductItem[]>([])
const currentDate = ref(new Date())

const formattedTime = computed(() =>
  currentDate.value.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }),
)

const formattedDate = computed(() =>
  currentDate.value.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)

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
let clockTimer: ReturnType<typeof setInterval> | undefined

const loadProducts = async () => {
  const data = await ProductService.getProductsSmall()
  products.value = data
}

const menu = ref<MenuMethods | null>(null)

const items = ref([
  { label: 'Add New', icon: 'pi pi-fw pi-plus' },
  { label: 'Remove', icon: 'pi pi-fw pi-trash' },
])

const toggleMenu = (event: MouseEvent) => {
  menu.value?.toggle(event)
}

onMounted(() => {
  wrap(loadProducts)
  clockTimer = window.setInterval(() => {
    currentDate.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  if (clockTimer) {
    window.clearInterval(clockTimer)
  }
})
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="grid grid-cols-1 col-span-4 lg:col-span-3 gap-4">
      <Card style="overflow: hidden" class="w-full bg-transparent mt-0">
        <template #content>
          <Carousel
            :value="products"
            :numVisible="1"
            :numScroll="1"
            :responsiveOptions="carouselResponsiveOptions"
            circular
            :autoplayInterval="3000"
            class="hero-carousel m-0"
          >
            <template #item="{ data }">
              <div class="carousel-slide">
                <img :src="data.image" :alt="data.name" class="carousel-image" />
              </div>
            </template>
          </Carousel>
        </template>
      </Card>
      <!-- created claim -->
      <Card style="overflow: hidden" class="w-full bg-transparent mt-0">
        <template #title>Created Claim</template>
        <template #content>
          <div class="grid grid-cols-6 grid-rows-2 gap-4">
            <Card
              style="overflow: hidden"
              class="row-span-2 col-span-2 !bg-blue-50 !border-blue-600 border-2"
            >
              <template #content>
                <!-- Header Section -->
                <div class="mb-4">
                  <div class="flex items-center gap-2 mb-1">
                    <h1 class="text-4xl font-bold !text-blue-900">452</h1>
                    <span class="flex items-center text-green-600 text-xs font-medium">
                      <i class="pi pi-arrow-up text-xs mr-1"></i>
                      4%
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm">Total Created Claims</p>
                </div>

                <!-- Bank List -->
                <div class="space-y-3 mb-4">
                  <div class="flex items-center justify-between py-1">
                    <span class="text-gray-700 text-sm">Mandiri</span>
                    <div class="flex items-center gap-1">
                      <span class="text-gray-700 text-sm font-medium">172</span>
                      <i class="pi pi-chevron-right text-gray-400 text-xs"></i>
                    </div>
                  </div>

                  <div class="flex items-center justify-between py-1">
                    <span class="text-gray-700 text-sm">BNI</span>
                    <div class="flex items-center gap-1">
                      <span class="text-gray-700 text-sm font-medium">135</span>
                      <i class="pi pi-chevron-right text-gray-400 text-xs"></i>
                    </div>
                  </div>
                </div>
              </template>

              <template #footer>
                <div class="flex flex-col gap-2">
                  <Button
                    label="See Report"
                    icon="pi pi-file"
                    class="w-full !bg-red-600 hover:!bg-red-700 !border-red-600"
                    severity="danger"
                  />
                  <p class="text-gray-500 text-xs text-center m-0">Update: 04:22 AM</p>
                </div>
              </template>
            </Card>
            <Card style="overflow: hidden" class="!bg-red-50 !border-red-200 border-2 col-span-2">
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-red-600">7</h1>
                  <i class="pi pi-chevron-right text-red-400 text-xl"></i>
                </div>
                <p class="text-gray-700 text-sm mb-3">Closed Today</p>

                <div class="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full">
                  <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span class="text-red-600 text-xs font-medium">Urgent</span>
                </div>
              </template>
            </Card>
            <Card
              style="overflow: hidden"
              class="!bg-yellow-50 !border-yellow-200 border-2 col-span-2"
            >
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-yellow-600">15</h1>
                  <i class="pi pi-chevron-right text-yellow-400 text-xl"></i>
                </div>
                <p class="text-gray-700 text-sm mb-3">Closed on 20 - 25 Mei</p>

                <div class="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full">
                  <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span class="text-yellow-700 text-xs font-medium">Need action</span>
                </div>
              </template>
            </Card>
            <Card style="overflow: hidden">
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-blue-900">85</h1>
                  <i class="pi pi-chevron-right text-gray-400 text-xl"></i>
                </div>
                <p class="text-gray-600 text-sm mb-3">Total Need Approval</p>

                <span class="text-blue-600 text-xs font-medium">+21 Claims today</span>
              </template>
            </Card>
            <Card style="overflow: hidden">
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-blue-900">10</h1>
                  <i class="pi pi-chevron-right text-gray-400 text-xl"></i>
                </div>
                <p class="text-gray-600 text-sm mb-3">Total New</p>

                <span class="text-blue-600 text-xs font-medium">+7 Claims today</span>
              </template>
            </Card>
            <Card style="overflow: hidden">
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-blue-900">15</h1>
                  <i class="pi pi-chevron-right text-gray-400 text-xl"></i>
                </div>
                <p class="text-gray-600 text-sm mb-3">Total New Proactive</p>

                <span class="text-green-600 text-xs font-medium">No claims today</span>
              </template>
            </Card>
            <Card
              style="overflow: hidden"
              class="!bg-white !border-2 !border-dashed !border-gray-300 cursor-pointer hover:!border-red-400 hover:!bg-red-50 transition-all"
            >
              <template #content>
                <div class="flex flex-col items-center justify-center gap-3 py-8">
                  <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <i class="pi pi-plus text-gray-400 text-2xl"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-600">Load More</span>
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Card>
      <!-- recived claim -->
      <Card style="overflow: hidden" class="w-full bg-transparent mt-0">
        <template #title>Recived Claim</template>
        <template #content>
          <div class="grid grid-cols-6 grid-rows-2 gap-4">
            <Card
              style="overflow: hidden"
              class="row-span-2 col-span-2 !bg-blue-50 !border-blue-600 border-2"
            >
              <template #content>
                <!-- Header Section -->
                <div class="mb-4">
                  <div class="flex items-center gap-2 mb-1">
                    <h1 class="text-4xl font-bold !text-blue-900">234</h1>
                    <span class="flex items-center text-red-600 text-xs font-medium">
                      <i class="pi pi-arrow-down text-xs mr-1"></i>
                      4%
                    </span>
                  </div>
                  <p class="text-gray-600 text-sm">Total Created Claims</p>
                </div>

                <!-- Bank List -->
                <div class="space-y-3 mb-4">
                  <div class="flex items-center justify-between py-1">
                    <span class="text-gray-700 text-sm">Mandiri</span>
                    <div class="flex items-center gap-1">
                      <span class="text-gray-700 text-sm font-medium">172</span>
                      <i class="pi pi-chevron-right text-gray-400 text-xs"></i>
                    </div>
                  </div>

                  <div class="flex items-center justify-between py-1">
                    <span class="text-gray-700 text-sm">BNI</span>
                    <div class="flex items-center gap-1">
                      <span class="text-gray-700 text-sm font-medium">135</span>
                      <i class="pi pi-chevron-right text-gray-400 text-xs"></i>
                    </div>
                  </div>
                </div>
              </template>

              <template #footer>
                <div class="flex flex-col gap-2">
                  <Button
                    label="See Report"
                    icon="pi pi-file"
                    class="w-full !bg-red-600 hover:!bg-red-700 !border-red-600"
                    severity="danger"
                  />
                  <p class="text-gray-500 text-xs text-center m-0">Update: 04:22 AM</p>
                </div>
              </template>
            </Card>
            <Card style="overflow: hidden" class="!bg-red-50 !border-red-200 border-2">
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-red-600">17</h1>
                  <i class="pi pi-chevron-right text-red-400 text-xl"></i>
                </div>
                <p class="text-gray-700 text-sm mb-3">Expaired Today</p>

                <div class="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full">
                  <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span class="text-red-600 text-xs font-medium">Urgent</span>
                </div>
              </template>
            </Card>
            <Card style="overflow: hidden" class="!bg-red-50 !border-red-200 border-2 col-span-2">
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-red-600">44</h1>
                  <i class="pi pi-chevron-right text-red-400 text-xl"></i>
                </div>
                <p class="text-gray-700 text-sm mb-3">Already Expaired</p>

                <div class="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full">
                  <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span class="text-red-600 text-xs font-medium">Urgent</span>
                </div>
              </template>
            </Card>
            <Card style="overflow: hidden" class="!bg-yellow-50 !border-yellow-200 border-2">
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-yellow-600">15</h1>
                  <i class="pi pi-chevron-right text-yellow-400 text-xl"></i>
                </div>
                <p class="text-gray-700 text-sm mb-3">Expaired on 20 - 25 Mei</p>

                <div class="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full">
                  <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span class="text-yellow-700 text-xs font-medium">Need action</span>
                </div>
              </template>
            </Card>
            <Card style="overflow: hidden">
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-blue-900">85</h1>
                  <i class="pi pi-chevron-right text-gray-400 text-xl"></i>
                </div>
                <p class="text-gray-600 text-sm mb-3">Total Need Approval</p>

                <span class="text-blue-600 text-xs font-medium">+21 Claims today</span>
              </template>
            </Card>
            <Card style="overflow: hidden">
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-blue-900">10</h1>
                  <i class="pi pi-chevron-right text-gray-400 text-xl"></i>
                </div>
                <p class="text-gray-600 text-sm mb-3">Total New</p>

                <span class="text-blue-600 text-xs font-medium">+7 Claims today</span>
              </template>
            </Card>
            <Card style="overflow: hidden">
              <template #content>
                <div class="flex items-center justify-between mb-1">
                  <h1 class="text-4xl font-bold text-blue-900">15</h1>
                  <i class="pi pi-chevron-right text-gray-400 text-xl"></i>
                </div>
                <p class="text-gray-600 text-sm mb-3">Total New Proactive</p>

                <span class="text-green-600 text-xs font-medium">No claims today</span>
              </template>
            </Card>
            <Card
              style="overflow: hidden"
              class="!bg-white !border-2 !border-dashed !border-gray-300 cursor-pointer hover:!border-red-400 hover:!bg-red-50 transition-all"
            >
              <template #content>
                <div class="flex flex-col items-center justify-center gap-3 py-8">
                  <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <i class="pi pi-plus text-gray-400 text-2xl"></i>
                  </div>
                  <span class="text-sm font-medium text-gray-600">Load More</span>
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Card>
    </div>
    <div class="col-span-4 lg:col-span-1 flex flex-col gap-4">
      <Card style="overflow: hidden">
        <template #content>
          <div class="flex justify-between items-center mb-4">
            <div>
              <span class="block text-muted-color font-medium mb-2">Waktu Server</span>
              <div class="text-surface-900 dark:text-surface-0 font-medium text-2xl">
                {{ formattedTime }}
              </div>
              <span class="block text-muted-color text-sm mt-1">{{ formattedDate }}</span>
            </div>
            <div
              class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
              style="width: 2.5rem; height: 2.5rem"
            >
              <i class="pi pi-clock text-blue-500 !text-xl"></i>
            </div>
          </div>
          <span class="text-primary font-medium">Data waktu diperbarui otomatis</span>
        </template>
      </Card>
      <Card style="overflow: hidden">
        <template #content>
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div class="flex-1 min-w-0">
              <span class="block text-muted-color font-bold mb-2">Calendar</span>
              <DatePicker inline showWeek class="w-full md:max-w-sm lg:max-w-md" />
            </div>
          </div>
        </template>
      </Card>
      <Card style="overflow: hidden">
        <template #content>
          <div class="flex items-center justify-between mb-6">
            <div class="font-semibold text-xl">Notifications</div>
            <div>
              <Button
                icon="pi pi-ellipsis-v"
                class="p-button-text p-button-plain p-button-rounded"
                @click="toggleMenu"
              ></Button>
              <Menu ref="menu" popup :model="items" class="!min-w-40"></Menu>
            </div>
          </div>

          <span class="block text-muted-color font-medium mb-4">TODAY</span>
          <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li class="flex items-center py-2 border-b border-surface">
              <div
                class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0"
              >
                <i class="pi pi-dollar !text-xl text-blue-500"></i>
              </div>
              <span class="text-surface-900 dark:text-surface-0 leading-normal"
                >Richard Jones
                <span class="text-surface-700 dark:text-surface-100"
                  >has purchased a blue t-shirt for
                  <span class="text-primary font-bold">$79.00</span></span
                >
              </span>
            </li>
            <li class="flex items-center py-2">
              <div
                class="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full mr-4 shrink-0"
              >
                <i class="pi pi-download !text-xl text-orange-500"></i>
              </div>
              <span class="text-surface-700 dark:text-surface-100 leading-normal"
                >Your request for withdrawal of
                <span class="text-primary font-bold">$2500.00</span> has been initiated.</span
              >
            </li>
          </ul>

          <span class="block text-muted-color font-medium mb-4">YESTERDAY</span>
          <ul class="p-0 m-0 list-none mb-6">
            <li class="flex items-center py-2 border-b border-surface">
              <div
                class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0"
              >
                <i class="pi pi-dollar !text-xl text-blue-500"></i>
              </div>
              <span class="text-surface-900 dark:text-surface-0 leading-normal"
                >Keyser Wick
                <span class="text-surface-700 dark:text-surface-100"
                  >has purchased a black jacket for
                  <span class="text-primary font-bold">$59.00</span></span
                >
              </span>
            </li>
            <li class="flex items-center py-2 border-b border-surface">
              <div
                class="w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-full mr-4 shrink-0"
              >
                <i class="pi pi-question !text-xl text-pink-500"></i>
              </div>
              <span class="text-surface-900 dark:text-surface-0 leading-normal"
                >Jane Davis
                <span class="text-surface-700 dark:text-surface-100"
                  >has posted a new questions about your product.</span
                >
              </span>
            </li>
          </ul>
          <span class="block text-muted-color font-medium mb-4">LAST WEEK</span>
          <ul class="p-0 m-0 list-none">
            <li class="flex items-center py-2 border-b border-surface">
              <div
                class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-4 shrink-0"
              >
                <i class="pi pi-arrow-up !text-xl text-green-500"></i>
              </div>
              <span class="text-surface-900 dark:text-surface-0 leading-normal"
                >Your revenue has increased by
                <span class="text-primary font-bold">%25</span>.</span
              >
            </li>
            <li class="flex items-center py-2 border-b border-surface">
              <div
                class="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full mr-4 shrink-0"
              >
                <i class="pi pi-heart !text-xl text-purple-500"></i>
              </div>
              <span class="text-surface-900 dark:text-surface-0 leading-normal"
                ><span class="text-primary font-bold">12</span> users have added your products to
                their wishlist.</span
              >
            </li>
          </ul>
        </template>
      </Card>
    </div>
  </div>
</template>
