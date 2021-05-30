import React from 'react';
import loadingSvg from '../../assets/img/loading.svg';

const Button = ({label, loading=false, warning=false, onClick, props, secondary, icon: Icon}) => {
  let className = secondary ? "py-2 md:py-2 px-12 border-2 border-primary text-primary" : "py-2 md:py-2.5 px-6 w-full bg-primary text-white";
  className = warning ? 'py-2 md:py-2.5 px-6 w-full bg-error' : className;
  return (
    <button className={"rounded-xl font-semibold flex justify-center "+className} onClick={onClick} {...props}>
      {loading ?
        <img className="h-7" src={loadingSvg} alt="loading svg"/>
        :
        <div className="flex items-center">
          {Icon &&
            <div className="mr-2 text-xl">
              <Icon />
            </div>
          }
          <p>{label}</p>
        </div>
      }
      
    </button>
  )
}

export default Button;
