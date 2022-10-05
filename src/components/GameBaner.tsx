import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import React, { useEffect, useState } from 'react'
import { api } from '../utils/api'
export interface Game {
  id: string
  title: string
  banner: string
  _count: {
    Ad: number
  }
}
export function GameBanner() {
  const [games, setGames] = useState<Game[]>([])
  useEffect(() => {
    api.get('/games').then((games) => setGames(games.data))
  }, [])
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 6,
      spacing: 15,
    },
  })
  console.log(games)

  return (
    <div ref={ref} className="keen-slider mt-16 ">
      {games.map((game) => {
        return (
          <div key={game.id} className="keen-slider__slide">
            <a href="#" className="relative rounded-lg overflow-hidden">
              <img src={game.banner} alt="" />
              <div className="w-full pt-16 pb-4 px-4 bg-game-gradient bottom-0 absolute left-0 ">
                <strong className="text-white text-sm font-bold block">
                  {game.title}
                </strong>
                <span className="text-zinc-300 block mt-1">
                  {' '}
                  {game._count.Ad} anúncio(s)
                </span>
              </div>
            </a>
          </div>
        )
      })}
    </div>
  )
}
