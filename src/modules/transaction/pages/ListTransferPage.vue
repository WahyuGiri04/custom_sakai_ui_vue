<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionStore } from '@/modules/transaction'

const transactionStore = useTransactionStore()
const { items, loading, error, hasData } = storeToRefs(transactionStore)
const skeletonRows = Array.from({ length: 10 }, (_, index) => ({ id: index }))

onMounted(() => {
  if (!hasData.value) {
    transactionStore.fetchTransactions()
  }
})

function handleRetry(): void {
  transactionStore.fetchTransactions()
}
</script>

<template>
  <div class="grid grid-cols-1">
    <Card>
      <template #content>
        <div class="flex flex-col grid-4 mb-4">
          <Toolbar>
            <template #start>
              <div class="font-bold">List of Transactions</div>
            </template>
            <template #end>
              <div class="flex flex-4 grid-4">
                <IconField>
                  <InputIcon class="pi pi-search" />
                  <InputText placeholder="Search" />
                </IconField>
                <Button
                  icon="pi pi-refresh"
                  :loading="loading"
                  @click="handleRetry"
                  class="mr-2"
                  severity="secondary"
                  text
                />
                <Button icon="pi pi-print" class="mr-2" severity="secondary" text />
                <Button icon="pi pi-upload" severity="secondary" text />
              </div>
            </template>
          </Toolbar>
        </div>

        <Message v-if="error" severity="error" :closable="false" class="mb-4">
          Gagal memuat data transaksi. {{ error }}
        </Message>

        <DataTable
          :value="loading ? skeletonRows : items"
          dataKey="noReferensi"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          responsiveLayout="scroll"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <Column field="statusKlaim" header="Status Klaim" sortable>
            <template #body="slotProps">
              <Skeleton v-if="loading" width="8rem" height="1rem" />
              <span v-else>{{ slotProps.data.statusKlaim }}</span>
            </template>
          </Column>
          <Column field="statusTransaksi" header="Status Transaksi" sortable>
            <template #body="slotProps">
              <Skeleton v-if="loading" width="8rem" height="1rem" />
              <span v-else>{{ slotProps.data.statusTransaksi }}</span>
            </template>
          </Column>
          <Column field="nomorKartu" header="Nomor Kartu" sortable>
            <template #body="slotProps">
              <Skeleton v-if="loading" width="10rem" height="1rem" />
              <span v-else>{{ slotProps.data.nomorKartu }}</span>
            </template>
          </Column>
          <Column field="nomorRekening" header="Nomor Rekening" sortable>
            <template #body="slotProps">
              <Skeleton v-if="loading" width="8rem" height="1rem" />
              <span v-else>{{ slotProps.data.nomorRekening }}</span>
            </template>
          </Column>
          <Column field="tanggalTransaksi" header="Tanggal" sortable>
            <template #body="slotProps">
              <Skeleton v-if="loading" width="6rem" height="1rem" />
              <span v-else>{{ slotProps.data.tanggalTransaksi }}</span>
            </template>
          </Column>
          <Column field="waktu" header="Waktu">
            <template #body="slotProps">
              <Skeleton v-if="loading" width="4rem" height="1rem" />
              <span v-else>{{ slotProps.data.waktu }}</span>
            </template>
          </Column>
          <Column field="noReferensi" header="No Referensi" sortable>
            <template #body="slotProps">
              <Skeleton v-if="loading" width="6rem" height="1rem" />
              <span v-else>{{ slotProps.data.noReferensi }}</span>
            </template>
          </Column>
          <Column field="kodeTerminal" header="Kode Terminal" sortable>
            <template #body="slotProps">
              <Skeleton v-if="loading" width="8rem" height="1rem" />
              <span v-else>{{ slotProps.data.kodeTerminal }}</span>
            </template>
          </Column>
          <Column field="nominal" header="Nominal" sortable>
            <template #body="slotProps">
              <Skeleton v-if="loading" width="6rem" height="1rem" />
              <span v-else>{{ slotProps.data.nominal }}</span>
            </template>
          </Column>
          <Column field="jenisPesan" header="Jenis Pesan">
            <template #body="slotProps">
              <Skeleton v-if="loading" width="6rem" height="1rem" />
              <span v-else>{{ slotProps.data.jenisPesan }}</span>
            </template>
          </Column>

          <template #empty>
            <div v-if="!loading" class="py-6 text-center text-sm text-surface-500">
              Belum ada data transaksi untuk ditampilkan.
            </div>
          </template>
        </DataTable>
      </template>
    </Card>
  </div>
</template>
