import PocketBase from 'pocketbase'

import { writable } from 'svelte/store'

export const pocketbase = new PocketBase('http://127.0.0.1:8090/')

export const currentUser = writable(pocketbase.authStore.model)

pocketbase.authStore.onChange((auth) => {
  console.log('authStore changed', auth)

  currentUser.set(pocketbase.authStore.model)
})
