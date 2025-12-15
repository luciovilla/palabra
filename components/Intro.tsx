import { solutionIndex } from '../lib/words'

type Props = {
  onPlay: () => void
}

export const Intro = ({ onPlay }: Props) => {
  // Format today's date
  const today = new Date()
  const dateString = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4 relative overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="mb-8 rounded-2xl shadow-xl">
          {/** biome-ignore lint/performance/noImgElement: small image */}
          <img
            src="/game_icon.png"
            alt="La Palabra Icon"
            className="w-24 h-24 object-contain rounded-xl shadow-lg"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-2 tracking-tight text-slate-200 drop-shadow-sm text-center">
          La Palabra
        </h1>

        <h2 className="text-xl md:text-2xl font-medium mb-8 text-center text-slate-300 max-w-lg">
          A daily word game based on Bad Bunny's lyrics
        </h2>

        <p className="mb-8 text-center text-slate-200 font-light leading-relaxed">
          Get 6 chances to guess a 6-letter word
        </p>

        <button
          onClick={onPlay}
          className="group cursor-pointer relative inline-flex items-center justify-center px-8 py-2 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)] mb-12"
        >
          Play
        </button>

        <div className="text-center font-medium text-slate-500 text-sm bg-slate-900/50">
          <p className="mb-1 text-slate-400 uppercase tracking-widest text-xs font-bold">
            {dateString}
          </p>
          <div className="flex items-center justify-center space-x-2">
            <span>Puzzle No. {solutionIndex}</span>
            <span className="text-slate-600">•</span>
            <span>
              Created by{' '}
              <a
                href="https://www.luciovilla.com/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-green-400 transition-colors"
              >
                Lucio Villa
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
