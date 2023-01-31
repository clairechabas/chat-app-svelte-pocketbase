<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { currentUser, pocketbase } from './pocketbase'

  let newMessage: string
  let messages = []
  let unsubscribe: () => void

  onMount(async () => {
    const resultList = await pocketbase.collection('messages').getList(1, 50, {
      sort: 'created',
      expand: 'user',
    })
    messages = resultList.items

    // Suscribe to realtime messages
    unsubscribe = await pocketbase
      .collection('messages')
      .subscribe('*', async ({ action, record }) => {
        // The * allows us to run a callback everytime a message
        // is created, updated or deleted
        if (action === 'create') {
          // refresh messages
          const user = await pocketbase.collection('users').getOne(record.user)
          record.expand = { user }
          messages = [...messages, record]
        }

        if (action === 'delete') {
          messages = messages.filter((m) => m.id !== record.id)
        }
      })
  })

  // Unsubscribe from realtime messages
  // when user signs out or navigates to a different page
  onDestroy(() => {
    unsubscribe()
  })

  async function sendMessage() {
    const data = {
      text: newMessage,
      user: $currentUser.id,
    }
    await pocketbase.collection('messages').create(data)
  }
</script>

<div class="messages">
  {#each messages as message (message.id)}
    <div class="message">
      <img
        class="avatar"
        src={`https://avatars.dicebear.com/api/identicon/${message.expand?.user?.name}.svg`}
        alt="User avatar"
        width="40px"
      />
      <div>
        <small>Sent by &{message.expand?.user?.name}</small>
        <p class="message-text">{message.text}</p>
      </div>
    </div>
  {/each}
</div>

<form on:submit|preventDefault={sendMessage}>
  <input bind:value={newMessage} placeholder="Message" type="text" />
  <button type="submit">Send</button>
</form>
