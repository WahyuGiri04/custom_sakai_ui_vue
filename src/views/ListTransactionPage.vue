<script setup lang="ts">
import { ProductService, type Product } from '@/service/ProductService'
import { onMounted, ref } from 'vue'

const products = ref<Product[]>([])

function formatCurrency(value: number | null | undefined): string {
  if (value == null) {
    return '-'
  }

  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

onMounted(async () => {
  products.value = await ProductService.getProductsListTable()
})
</script>
<template>
  <div class="grid grid-cols-1">
    <Card>
      <template #content>
        <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
          <Column style="width: 15%" header="Image">
            <template #body="slotProps">
              <img
                :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                :alt="slotProps.data.image"
                width="50"
                class="shadow"
              />
            </template>
          </Column>
          <Column field="name" header="Name" :sortable="true" style="width: 35%"></Column>
          <Column field="price" header="Price" :sortable="true" style="width: 35%">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column style="width: 15%" header="View">
            <template #body>
              <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>
