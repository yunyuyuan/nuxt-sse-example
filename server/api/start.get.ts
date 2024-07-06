import { fetchEventSource } from '@fortaine/fetch-event-source';

export default defineEventHandler(async (event) => {
  const { timestamp, name } = getQuery(event)

  fetchEventSource(`http://localhost:3000/api/sse?name=${name}`, {
    onmessage: (event) => {
      serverHooks.callHook("sse:event", { timestamp, value: event.data })
    }
  }).then()
  return { success: true }
})