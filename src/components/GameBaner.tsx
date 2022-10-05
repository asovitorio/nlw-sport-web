interface GameBannerProps{
    banner:string;
    title:string;
    adsCount:number;

}


export function GameBanner(props:GameBannerProps) {
    return(
        <a href="#" className="relative rounded-lg overflow-hidden">
        <img src={props.banner} alt="" />
        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient bottom-0 absolute left-0 ">
          <strong className="text-white text-sm font-bold block">
            {props.title}
          </strong>
          <span className="text-zinc-300 block mt-1"> {props.adsCount} anúncio(s)</span>
        </div>
      </a>
    )
    
}