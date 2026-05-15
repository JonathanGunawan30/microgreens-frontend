<template>
  <div class="container">
    <div class="grid grid-cols-1 mb-8">
      <div class="md:flex justify-between items-center gap-4">
        <div>
          <h2 class="text-xl">Roles</h2>
          <nav aria-label="breadcrumb">
            <ol class="flex flex-wrap">
              <li class="inline-block text-green-600">
                <a href="/dashboard">
                  Dashboard
                  <Icon name="tabler:slash" size="14" class="inline-block mx-2" />
                </a>
              </li>
              <li class="inline-block text-gray-500 active" aria-current="page">Roles</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1">
      <div class="card h-full card-lg">
        <div class="card-body p-0">
          <div class="relative overflow-x-auto md:overflow-visible">
            <table class="text-left w-full whitespace-nowrap table-with-checkbox table-hover">
              <thead class="bg-gray-200 text-gray-700">
                <tr class="border-transparent !border-b-0">
                  <th scope="col" class="px-6 py-3">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="useRole.loading">
                    <td colspan="1" class="text-center py-4 text-gray-500">Loading data...</td>
                </tr>
                <tr v-else-if="useRole.error">
                    <td colspan="1" class="text-center py-4 text-red-500">{{ useRole.error }}</td>
                </tr>
                <tr v-else-if="!rolesData || rolesData.length === 0">
                    <td colspan="1" class="text-center py-4 text-gray-500">No data available</td>
                </tr>
                <tr v-for="role in rolesData" v-else :key="role.id" class="border-b border-gray-200">
                    <td class="py-3 px-6 text-left">{{ role.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoleStore } from '~/stores/role'
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: ['admin', 'auth'],
  layout: 'dashboard',
})

const useRole = useRoleStore()
const rolesData = ref([])

onMounted(async () => {
  const response = await useRole.fetchRoles()
  rolesData.value = response.data
})

useHead({
  script: [
    {
      src: '/js/theme.min.js',
      body: true
    },
  ],
})
</script>