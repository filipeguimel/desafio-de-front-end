
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",   
    "./app/**/*.{js,ts,jsx,tsx}",   
    "./pages/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      width: {
        '358': '358px',
        '512': '512px',
      },
       screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    },
  },
  corePlugins: {
    preflight: false, 
  },
  plugins: [import('@shadcn/ui')],
}
