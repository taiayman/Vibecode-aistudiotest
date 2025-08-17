/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {addVideo} from '../lib/actions'

const presets = [
  {label: '🤖', prompt: 'A robot dancing in the rain'},
  {label: '🌳', prompt: 'A magical, glowing forest at night'},
  {label: '🐱', prompt: 'A cat DJing at a party with neon lights'},
  {label: '🚀', prompt: 'A spaceship flying through a colorful nebula'}
]

export default function Intro() {
  return (
    <section className="intro">
      <h2>🎬 Welcome to VidGen</h2>
      <p>
        Turn your ideas into video. Type a prompt for what you want to see, and
        let AI bring it to life.
      </p>
      <div>
        <h3>Or try an example:</h3>
        <ul className="presets">
          {presets.map(({label, prompt}) => (
            <li key={prompt}>
              <button onClick={() => addVideo(prompt)} className="chip">
                {label} {prompt}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}