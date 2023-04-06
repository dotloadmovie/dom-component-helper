import { ComponentMap } from '../componentAPI/Register'

export type Message = {
  body: string
  type?: string
}

export type BindingProps = {
  domElement: Element
  name: string
  sendMessage: (message: Message) => void
  ready: (receiveMessage: (message: Message) => void) => void
}

type ReceiverItem = {
  receiveMessage: (message: Message) => void
}

const Init = (
  map: ComponentMap,
  domList: NodeListOf<Element>,
  typeAttributeName = 'data-component-type'
): void => {
  const responders: ReceiverItem[] = []

  const messageBus = (payload: Message & { source: string }) => {
    responders.forEach((responder) => {
      responder.receiveMessage(payload)
    })
  }

  ;[...domList].forEach((domElement) => {
    const match = domElement.getAttribute(typeAttributeName) as string

    const binding = map[match]

    try {
      const props: BindingProps = {
        domElement,
        name: match,
        sendMessage: (message: Message): void => {
          messageBus({ ...message, source: match })
        },
        ready: (receiveMessage: (message: Message) => void) => {
          responders.push({ receiveMessage })
        },
      }

      binding(props)
    } catch (e) {
      console.log(e, 'error occurred when binding to DOM')
    }
  })
}

export default Init
