module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
        primary: "#1b53f4",
        secondary: "#22293F",
        warning: "##ffc107",
        success: "#31D0AA",
        error: "#FB5E5E",
        like: "#fb3958",
        whitehover: "#f3f3f4",
        body: "#FAFCFE",
        helper: "#8C8CA1",
        danger: "#e3342f",
        placeholder: "#e7edf3",
        holder: "#e1dfec",
        background: "#f9fafb",
        navbar: "#fff"
      }),
      textColor: (theme) => ({
        ...theme("colors"),
        primary: "#1b53f4",
        blackness: "#2e3447",
        secondary: "#22293F",
        warning: "##ffc107",
        success: "#31D0AA",
        like: "#fb3958",
        error: "#FB5E5E",
        body: "#FAFCFE",
        helper: "#8C8CA1",
        danger: "#e3342f",
        holder: "#bcb8d0",
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.gray.300", "currentColor"),
        primary: "#1b53f4",
        secondary: "#22293F",
        success: "#31D0AA",
        error: "#FB5E5E",
        body: "#FAFCFE",
        holder: "#e1dfec",
        helper: "#8C8CA1",
      }),
      placeholderColor: {
        holder: "#bcb8d0",
        helper: "#8C8CA1",
      },
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      width: {
        '108': '26rem',
        '116': '27rem',
        '124': '30rem',
        '136': '35rem',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
       '3': '3px',
        '4': '4px',
       '6': '6px',
       '8': '8px',
      }
    },
    fontFamily: {
      'main': ['Work Sans', 'sans-serif'],
      'part': ['Inter', 'sans-serif'],
      'openSans': ['Open Sans', 'sans-serif'],
      'mulish': ['Inter', 'sans-serif'],
    },
    fontSize: {
      'h1': '64px', 
      'h2': '40px', 
      'h3': '24px', 
      'subtitle': '24px', 
      'body': '16px', 
      'small': '14px', 
      'pretitle': '10px', 
      'button': '10px', 
      'link': '16px',  
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    customForms: theme => ({
      default: {
        checkbox: {
          "&:focus": {
            outline: undefined,
            boxShadow: undefined,
            borderColor: undefined,
          },
        },
      },
    })
  },
  variants: {
    extend: {
      outline: ["focus"]
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  corePlugins: {
    outline: false,
  }
}