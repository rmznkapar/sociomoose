import React from "react";

const Input = ({ htmlFor, label, icon: Icon, warning=false, ...props }) => (
  <label htmlFor={htmlFor} className="w-full">
    {label &&
      <p className="mb-2">{label}</p>
    }
    <div className="flex items-stretch bg-placeholder rounded-xl focus:shadow-md px-4">
      {Icon && 
        <div className="pr-4 flex items-center text-helper">
          <Icon />
        </div>
      }
      <input
        id={htmlFor}
        className="px-0 py-3 bg-placeholder focus:ring-0 border-none w-full placeholder-helper text-black text-sm"
        {...props}
      />
    </div>
  </label>
);

export default Input;