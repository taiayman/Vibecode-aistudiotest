/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useRef} from 'react'
import useStore from '../lib/store'
import {addVideo, reset} from '../lib/actions'
import {isIframe} from '../lib/consts'
import VideoPost from './FeedItem' // was FeedItem.jsx, now is VideoPost.jsx
import Intro from './Intro'

export default function App() {
  const feed = useStore.use.feed()
  const inputRef = useRef(null)

  const handleGenerate = () => {
    const prompt = inputRef.current.value
    if (prompt) {
      addVideo(prompt)
      inputRef.current.value = ''
      inputRef.current.blur()
    }
  }

  return (
    <div className={isIframe ? '' : 'dark'}>
      <header>
        <h1>🎬 VidGen</h1>
        <div className="prompt-container">
          <input
            ref={inputRef}
            className="prompt-input"
            placeholder="Describe the video you want to create..."
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleGenerate()
              }
            }}
          />
          <button className="button primary generate-button" onClick={handleGenerate}>
            <span className="icon">auto_awesome</span> Generate
          </button>
        </div>
        <button className="button reset-button" onClick={reset} title="Clear all videos">
          <span className="icon">delete_sweep</span>
        </button>
      </header>

      <main>
        {feed.length ? (
          <ul className="feed" id="feed-container">
            {feed.map(video => (
              <VideoPost key={video.id} video={video} />
            ))}
          </ul>
        ) : (
          <Intro />
        )}
      </main>
    </div>
  )
}