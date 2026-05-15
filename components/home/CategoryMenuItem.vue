<template>
    <li class="border-b w-full">
      <a
:class="{ 'active': isActive }"
      href="#" class="flex justify-between py-2 collapsed items-center text-gray-800 hover:text-green-600" :data-bs-toggle="'collapse'"
        :data-bs-target="`#${category.slug}`" aria-expanded="false" :aria-controls="category.slug"
        @click.prevent="$emit('select', category.slug)">
        {{ category.name }}
        <Icon name="tabler:chevron-right" size="14" class="inline-block" />
      </a>
      <div :id="category.slug" class="accordion-collapse collapse" data-bs-parent="#categoryCollapseMenu">
        <div class="text-gray-800">
          <ul class="flex flex-wrap flex-col ml-3">
            <li v-for="(item, index) in category.childs" :key="index" >
              <a
href="#!" class="inline-block py-2 no-underline hover:text-green-600"
              :class="{ 'active': isActive }"
              @click.prevent="$emit('select', item.slug)">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </template>
  
  <script setup>
  defineProps({
    category: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  })
  </script>