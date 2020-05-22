<template>
  <textarea
    id="text"
    v-model="notes"
    class="bg-gray-300 w-full mt-4 h-24 text-sm p-2 resize-none rounded"
    placeholder="Notizen..."
  />
</template>

<script>

export default {
    data() {
        return {
            notes: localStorage.getItem('text')
        }
    }
}

</script>
