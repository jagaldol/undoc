import { type NextRequest } from "next/server"

export const dynamic = "force-dynamic"

function toMockTokens(text: string) {
  const normalized = text.replaceAll("\n", "<enter_token>").replaceAll(" ", "<space_token>")
  return normalized.match(/<enter_token>|<space_token>|./g) ?? []
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const query = typeof body?.query === "string" ? body.query : ""

  const answer =
    query.length > 0
      ? `Temporary mock response.\nInput: ${query}\nTesting state flow without backend.`
      : "Temporary mock response. Enter a prompt to receive echo-like output."

  const tokens = toMockTokens(answer)
  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let tokenIndex = 0

      const pushNextToken = () => {
        if (tokenIndex >= tokens.length) {
          controller.close()
          return
        }

        controller.enqueue(encoder.encode(`data: ${tokens[tokenIndex]}\n\n`))
        tokenIndex += 1
        setTimeout(pushNextToken, 40)
      }

      pushNextToken()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  })
}
