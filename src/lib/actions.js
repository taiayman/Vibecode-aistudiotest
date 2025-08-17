/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import useStore from './store'
import generateVideo from './llm'

const get = useStore.getState
const set = useStore.setState

export const init = () => {
  if (get().didInit) {
    return
  }

  set(state => {
    state.didInit = true
  })
}

export const addVideo = async prompt => {
  const newVideoId = crypto.randomUUID()

  set(state => {
    state.feed.unshift({
      id: newVideoId,
      prompt,
      isBusy: true,
      videoUrl: null,
      error: null,
      loadingMessage: 'Initializing generation...'
    })
  })

  // Scroll to the new video placeholder
  document
    .getElementById('feed-container')
    ?.scroll({top: 0, behavior: 'smooth'})

  try {
    const onProgress = loadingMessage => {
      set(state => {
        const video = state.feed.find(v => v.id === newVideoId)
        if (video && video.isBusy) {
          video.loadingMessage = loadingMessage
        }
      })
    }

    const videoUrl = await generateVideo(prompt, onProgress)

    set(state => {
      const video = state.feed.find(v => v.id === newVideoId)
      if (video) {
        video.isBusy = false
        video.videoUrl = videoUrl
      }
    })
  } catch (e) {
    console.error(e)
    set(state => {
      const video = state.feed.find(v => v.id === newVideoId)
      if (video) {
        video.isBusy = false
        video.error = e.message || 'An unknown error occurred.'
      }
    })
  }
}

export const removeVideo = id =>
  set(state => {
    state.feed = state.feed.filter(video => video.id !== id)
  })

export const reset = () => {
  set(state => {
    // Revoke object URLs to prevent memory leaks
    state.feed.forEach(video => {
      if (video.videoUrl) {
        URL.revokeObjectURL(video.videoUrl)
      }
    })
    state.feed = []
  })
}

init()
