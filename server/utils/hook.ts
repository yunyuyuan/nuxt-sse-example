import { createHooks } from 'hookable'

interface Hooks {
  'sse:event': (data: any) => any | void
}

export const serverHooks = createHooks<Hooks>()