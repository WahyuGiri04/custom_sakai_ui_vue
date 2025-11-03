<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import { Form } from '@primevue/forms';

const toast = useToast()

const resolver = zodResolver(
  z.object({
    username: z.string().min(1, { message: 'Username is required.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
  }),
)

const onFormSubmit = ({ valid }: { valid: boolean }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-12">
        <div class="flex items-center justify-center gap-3 mb-6">
          <img src="/jalin.svg" width="100px" />
          <div class="h-12 w-px bg-gray-300"></div>
          <div class="text-xl font-semibold text-gray-800">Aplikasi Claim Online</div>
        </div>
        <p class="text-gray-600 text-base">Silahkan login ke akun Anda</p>
      </div>

      <Form :resolver="resolver" @submit="onFormSubmit" class="gap-4 w-full flex flex-col">
        <FormField
          v-slot="$field"
          as="section"
          name="username"
          initialValue=""
          class="flex flex-col gap-2 w-full"
        >
          <InputText type="text" placeholder="Username" />
          <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
            $field.error?.message
          }}</Message>
        </FormField>
        <FormField v-slot="$field" asChild name="password" initialValue="">
          <section class="flex flex-col gap-2">
            <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid />
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
              $field.error?.message
            }}</Message>
          </section>
        </FormField>
        <Button
          type="submit"
          class="w-full bg-red-400 hover:bg-red-500 text-white py-3 rounded-lg font-medium transition duration-200"
          label="Submit"
        />
      </Form>
    </div>
  </div>
</template>

<style scoped></style>
