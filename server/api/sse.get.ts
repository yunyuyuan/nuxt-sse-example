export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event)
  const { name } = getQuery(event)


  const interval = setInterval(async () => {
    await eventStream.push(`Hello ${name}, now is ${new Date().toLocaleTimeString()}`)
  }, 1000)

  eventStream.onClosed(async () => {
    clearInterval(interval)
    await eventStream.close()
  })

  return eventStream.send()
})