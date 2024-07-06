export default defineEventHandler(async (event) => {
  const timestamp = getRouterParam(event, "timestamp")
  const eventStream = createEventStream(event)

  serverHooks.hook("sse:event", async (event) => {
    if (event.timestamp !== timestamp) return
    await eventStream.push(event.value)
  })

  eventStream.onClosed(async () => {
    await eventStream.close()
  })

  return eventStream.send()
})