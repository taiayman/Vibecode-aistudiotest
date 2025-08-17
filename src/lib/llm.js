/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {GoogleGenAI} from '@google/genai'

let ai

function getAiClient() {
  if (!process.env.API_KEY) {
    throw new Error(
      'API_KEY environment variable not set. Please set it in your Vercel project settings.'
    )
  }
  if (!ai) {
    ai = new GoogleGenAI({apiKey: process.env.API_KEY})
  }
  return ai
}

const model = 'veo-2.0-generate-001'

export default async function generateVideo(prompt, onProgress) {
  const loadingMessages = [
    'Warming up the AI director...',
    'Scripting the digital scene...',
    'Casting pixel actors...',
    'Rolling the virtual cameras...',
    'Action! Generating motion...',
    'Rendering the first frames...',
    'Applying digital makeup...',
    'In the cutting room now...',
    'Adding special effects...',
    'Finalizing the masterpiece...',
    'Almost ready for the premiere!'
  ]
  let messageIndex = 0

  onProgress(loadingMessages[messageIndex++])

  const aiClient = getAiClient()

  let operation = await aiClient.models.generateVideos({
    model,
    prompt,
    config: {
      numberOfVideos: 1
    }
  })

  const progressInterval = setInterval(() => {
    onProgress(loadingMessages[messageIndex % loadingMessages.length])
    messageIndex++
  }, 8000)

  try {
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000))
      operation = await aiClient.operations.getVideosOperation({
        operation: operation
      })
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri
    if (!downloadLink) {
      throw new Error('Video generation failed or returned no link.')
    }

    onProgress('Downloading your video...')
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`)
    if (!response.ok) {
      throw new Error(`Failed to download video: ${response.statusText}`)
    }

    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } finally {
    clearInterval(progressInterval)
  }
}