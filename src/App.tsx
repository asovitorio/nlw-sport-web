import { useEffect, useState } from 'react'
import './styles/main.css'
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from './assets/logo-nlw-esports.png'
import { GameBanner } from './components/GameBaner'
import { CreateAdBanner } from './components/CreateAdBanner'
import CreateAdModal from './components/CreateAdModal'
import { api } from './utils/api'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
export interface Game {
  id: string
  title: string
  banner: string
  _count: {
    Ad: number
  }
}

function App() {
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
  return (
    <div className="max-w-[1344px]  mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-clip-text text-transparent bg-nlw-gradient">
          duo
        </span>{' '}
        está aqui!
      </h1>
      <div ref={ref} className="keen-slider mt-16">
        <div className="keen-slider__slide">
         </div>
      </div>
      <GameBanner
          
            />
      {/* <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              banner={game.banner}
              adsCount={game._count.Ad}
            />
          )
        })}
      </div> */}
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
