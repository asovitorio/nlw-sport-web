import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, GameController } from 'phosphor-react'
import { Input } from './Input'
import { FormEvent, useEffect, useState } from 'react'
import { Game } from '../App'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { api } from '../utils/api'

function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [gameId, setGameId] = useState<string>('')
  const [nickname, setNickname] = useState<string>('')
  const [yearsPlaying, setYearsPlaying] = useState<number>(0)
  const [discord, setDiscord] = useState<string>('')
  const [hoursStart, setHoursStart] = useState<any | undefined>(undefined)
  const [hoursEnd, setHoursEnd] = useState<any | undefined>(undefined)
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  useEffect(() => {
    api.get('/games').then((games) => setGames(games.data))
  }, [])

  function hanleCreateAd(e: FormEvent) {
    e.preventDefault()

    const data = {
      name: nickname,
      week_days: weekDays,
      use_voice_channel: useVoiceChannel?1:0,
      years_playing: yearsPlaying,
      discord,
      hours_start: hoursStart,
      hours_end: hoursEnd,
      
    }
    api.post(`/games/${gameId}/ads`,data).then( resp =>{
    alert("Anuncio criado com sucesso!")
    window.close()
  }).catch( err =>{
    console.log(err.message);
    
    alert("Erro ao cadastrar!")
    })
   
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed  bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded w-[480px] shadow-lg shadow-black/50 ">
        <Dialog.Title className="text-3xl font-black">
          Publique Seus Anúncios
        </Dialog.Title>

        <form
          action=""
          onSubmit={hanleCreateAd}
          className="mt-8 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              id="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
              defaultValue=""
              onChange={(e) => setGameId(e.target.value)}
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>
              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Seu nome (ou nickname)</label>
            <Input
              type="text"
              id="nome"
              placeholder="Como te chamam dentro do game?"
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-6 ">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                <Input
                  type="number"
                  id="yearsPlaying"
                  placeholder="Tudo bem se for zero."
                  onChange={(e) => setYearsPlaying(parseInt(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu discord?</label>
                <Input
                  type="text"
                  id="discord"
                  placeholder="usuario#00000"
                  onChange={(e) => setDiscord(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <label htmlFor="weeekDays">Quando costuma jogar?</label>

                <ToggleGroup.Root
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                  onValueChange={setWeekDays}
                >
                  <ToggleGroup.Item
                    type="button"
                    value="0"
                    title="Domingo"
                    className={`bg-zinc-900 w-8 h-8 gap-1 rounded text-red-500 ${
                      weekDays.includes('0') ? 'bg-violet-500' : ''
                    }`}
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    type="button"
                    value="1"
                    title="Segunda"
                    className={`bg-zinc-900 w-8 h-8 gap-1 rounded ${
                      weekDays.includes('1') ? 'bg-violet-500' : ''
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    type="button"
                    value="2"
                    title="Terça"
                    className={`bg-zinc-900 w-8 h-8 gap-1 rounded ${
                      weekDays.includes('2') ? 'bg-violet-500' : ''
                    }`}
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    type="button"
                    value="3"
                    title="Quarta"
                    className={`bg-zinc-900 w-8 h-8 gap-1 rounded ${
                      weekDays.includes('3') ? 'bg-violet-500' : ''
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    type="button"
                    value="4"
                    title="Quinta"
                    className={`bg-zinc-900 w-8 h-8 gap-1 rounded ${
                      weekDays.includes('4') ? 'bg-violet-500' : ''
                    }`}
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    type="button"
                    value="5"
                    title="Sexta"
                    className={`bg-zinc-900 w-8 h-8 gap-1 rounded ${
                      weekDays.includes('5') ? 'bg-violet-500' : ''
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    type="button"
                    value="6"
                    title="Sabado"
                    className={`bg-zinc-900 w-8 h-8 gap-1 rounded ${
                      weekDays.includes('6') ? 'bg-violet-500' : ''
                    }`}
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <label htmlFor="hourStart">Qual horario do dia?</label>

                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="time"
                    placeholder="De"
                    onChange={(e) => setHoursStart(e.target.value)}
                  />
                  <Input
                    type="time"
                    placeholder="Até"
                    onChange={(e) => setHoursEnd(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              checked={useVoiceChannel}
              onCheckedChange={() => setUseVoiceChannel(!useVoiceChannel)}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text- text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz.
          </label>
          <footer className="mt-4 flex justify-end  items-center gap-6">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold  hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              className="flex justify-center items-center gap-2 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600"
              type="submit"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default CreateAdModal
function axios(arg0: string) {
  throw new Error('Function not implemented.')
}
