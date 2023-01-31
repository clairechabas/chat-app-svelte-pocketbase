<script lang="ts">
  import { currentUser, pocketbase } from './pocketbase'

  let name: string
  let email: string
  let password: string

  async function signIn() {
    await pocketbase.collection('users').authWithPassword(email, password)
  }

  async function signUp() {
    try {
      const data = {
        name,
        email,
        password,
        passwordConfirm: password,
      }
      await pocketbase.collection('users').create(data)
      await signIn()
    } catch (error) {
      console.error(error)
    }
  }

  function signOut() {
    pocketbase.authStore.clear()
  }
</script>

{#if $currentUser}
  <p>Signed in as {$currentUser.username}</p>
{:else}
  <form on:submit|preventDefault>
    <input placeholder="Name" type="text" bind:value={name} />
    <input placeholder="Email" type="text" bind:value={email} />
    <input placeholder="Password" type="password" bind:value={password} />
    <button on:click={signUp}>Sign Up</button>
    <button on:click={signIn}>Sign In</button>
  </form>
{/if}
