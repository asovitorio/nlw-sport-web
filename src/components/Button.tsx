import {ButtonHTMLAttributes, Children} from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
sigla:string,

}
function Button(props:ButtonProps,) {
    return (
       

            <button {...props} className='bg-zinc-900 w-8 h-8 gap-1 rounded'  >{props.sigla}</button>
       
    );
}

export default Button;