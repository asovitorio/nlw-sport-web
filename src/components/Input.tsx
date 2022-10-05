import {InputHTMLAttributes, useState} from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{

}
interface NicknameProps{
  setNinckname:(nickname:string) =>{}
}
export function Input(props:InputProps,nickName:NicknameProps) {
  
  return (
    <input
    {...props}
    
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
    />
  )
}
