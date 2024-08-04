module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xs': '400px', // Extra extra small devices
        'xs': '475px',  // Extra small devices
        'sm': '640px',  // Small devices (phones, 640px and up)
        'md': '768px',  // Medium devices (tablets, 768px and up)
        'lg': '1024px', // Large devices (desktops, 1024px and up)
        'xl': '1280px', // Extra large devices (large desktops, 1280px and up)
        '2lg': '1400px',
        '2xl': '1536px' // Extra extra large devices (larger desktops, 1536px and up)
      },
    },
  },
  plugins: [],
}
