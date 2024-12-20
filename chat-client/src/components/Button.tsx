import { ButtonProps } from "../interfaces/ButtonProps"

const Button: React.FC<ButtonProps> = ({type, onClick, children}) => {
  return (
    <button 
    type={type} 
    onClick={onClick}
    className="inline-block leading-normal bg-[#111111e6] text-white p-3 rounded-2xl hover:text-gray-300 active:font-semibold"
    >
        {children}
    </button>
  )
}

export default Button