<template>
  <div>
    <div class="flex mx-4 my-4 items-center">
      <a
        href="https://github.com/maximilianschmelzer/betray-me"
        target="_blank"
      ><h1 class="text-center text-xl">github <font-awesome-icon
        class="text-red-600"
        :icon="['fas', 'heart']"
      /></h1></a>
      <div class="flex-auto" />
      <div v-if="characterSelected()" class="flex">
        <div class="text-center text-sm mr-2">
          {{ omen }} Omen
        </div>
        <div class="flex-auto" />
        <button
          class="mr-3 border border-red-600 shadow bg-red-600 text-white rounded text-sm w-6 h-6"
          @click="decrement()"
        >
          <font-awesome-icon :icon="['fa', 'minus']" />
        </button>
        <button
          class="border border-green-600 shadow bg-green-600 text-white rounded text-sm w-6 h-6"
          @click="increment()"
        >
          <font-awesome-icon :icon="['fa', 'plus']" />
        </button>
      </div>
      <div class="flex-auto" />
      <button
        v-if="characterSelected()"
        class="px-3 py-1 border border-red-600 bg-red-600 text-white rounded text-xs shadow"
        @click="reset()"
      >
        <font-awesome-icon :icon="['fa', 'undo']" />
      </button>
    </div>
    <div class="mx-8">
      <div
        v-for="(item, key) in items"
        :key="key"
        class="justify-center flex flex-col"
      >
        <button
          v-if="showName(item.id)"
          :class="{'text-2xl':true, ['text-'+item.color+'-400']:true}"
          @click="setActive(item.id)"
        >
          {{ item.name }}
        </button>
        <div v-if="active === item.id">
          <div class="flex text-xs flex-col text-center">
            <div>Alter: {{ item.age }}</div>
            <div>Größe: {{ item.size }} m</div>
            <div>Gewicht: {{ item.weight }} kg</div>
            <div>Hobbys: {{ item.hobbies.join(', ') }}</div>
            <div>Geburtstag: {{ item.birthday }}</div>
          </div>
          <div
            v-for="(type, key2) in [['speed', 'Tempo'], ['might', 'Stärke'], ['sanity', 'Verstand'], ['knowledge', 'Wissen']]"
            :key="key2"
            class="my-4"
          >
            <div class="my-2 text-center">
              {{ type[1] }}
            </div>
            <div class="flex justify-center">
              <div
                v-for="(val, key3) in item.stats[type[0]].values"
                :key="key3"
              >
                <div :set="checked = isChecked(item.id + item.stats[type[0]].id, item.stats[type[0]].baseIndex, key3)">
                  <input
                    :id="item.id + item.stats[type[0]].id + key3"
                    type="radio"
                    class="hidden"
                    :name="item.id + item.stats[type[0]].id"
                    :value="val"
                    :checked="checked"
                  >
                  <label
                    v-if="val !== 0"
                    class="border-2 border-gray-200 p-2 bg-gray-200 rounded shadow text-xs mx-1"
                    :class="{'bg-green-300 border-green-300' : item.stats[type[0]].baseIndex == key3}"
                    :for="item.id + item.stats[type[0]].id + key3"
                    @click="save(item.id + item.stats[type[0]].id, key3)"
                  >
                    {{ val }}
                  </label>
                  <label
                    v-else
                    class="border-2 border-gray-200 p-2 bg-gray-200 rounded shadow text-xs mx-1"
                    :for="item.id + item.stats[type[0]].id + key3"
                    @click="save(item.id + item.stats[type[0]].id, key3)"
                  >
                    <font-awesome-icon :icon="['fa', 'skull']" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <textarea
        v-if="characterSelected()"
        id="text"
        v-model="notes"
        class="bg-gray-300 w-full mt-4 h-24 text-sm p-2 resize-none rounded"
        placeholder="Notizen..."
        @keyup="saveText()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import data from '@/data.json'
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Index extends Vue {
  items = data.items
  active = localStorage.getItem('active')
  omen = this.getOmen()
  notes: string = localStorage.getItem('text') ?? ''

  save (key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  isChecked (storageKey: string, baseIndex: string, currentKey: string): boolean {
    const storage = localStorage.getItem(storageKey)
    return (storage != null && storage === currentKey.toString()) || (storage == null && currentKey === baseIndex)
  }

  isActive (id: string): boolean {
    return id === localStorage.getItem('active')
  }

  setActive (id: string): void {
    this.active = id
    localStorage.setItem('active', id)
  }

  showName (id: string): boolean {
    const active = localStorage.getItem('active')
    return active === null || active === id
  }

  characterSelected (): boolean {
    return localStorage.getItem('active') !== null
  }

  reset () {
    if (!confirm('Wirklich zurücksetzen?')) {
      return
    }

    this.active = null
    this.notes = ''
    localStorage.clear()
  }

  getOmen () {
    const count = localStorage.getItem('omen')
    return count !== null ? parseInt(count) : 0
  }

  increment () {
    if (this.omen === 12) {
      return
    }

    this.omen++
    this.saveInStorage()
  }

  decrement () {
    if (this.omen === 0) {
      return
    }

    this.omen--
    this.saveInStorage()
  }

  saveInStorage () {
    localStorage.setItem('omen', this.omen.toString())
  }

  saveText () {
    localStorage.setItem('text', this.notes)
  }
}
</script>

<style scoped>
input:checked ~ label {
  @apply border-gray-700;
}
</style>
