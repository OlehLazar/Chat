import { InputProps } from "../interfaces/InputProps"

const Input: React.FC<InputProps> = ({onChange, placeholder, name}) => {
  return (
    <input 
    onChange={onChange}
    placeholder={placeholder}
    name={name}
    className="pb-2 pt-2 pr-3 pl-3 focus: outline-none border-b border-[#1111116a]" 
    />
  )
}

export default Input