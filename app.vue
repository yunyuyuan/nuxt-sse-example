<script setup lang="ts">
const eventSource = ref<EventSource>()
const name = ref('hacker')
const messages = reactive<string[]>([])

const start = () => {
  const timestamp = Date.now()
  messages.splice(0, messages.length)
  eventSource.value = new EventSource(`/api/${timestamp}`)
  fetch(`/api/start?timestamp=${timestamp}&name=${name.value}`)
  eventSource.value.onmessage = (event) => {
    messages.push(event.data)
  }
}

const close = async () => {
  eventSource.value?.close()
}

onBeforeUnmount(() => {
  close()
})
</script>

<template>
  <div>
    <label>
      Your name: <input v-model="name" />
    </label>
    <button style="margin: 0 10px;" @click="start">start</button>
    <button @click="close">close</button>
    <ul>
      <li v-for="message in messages">{{ message }}</li>
    </ul>
  </div>
</template>
