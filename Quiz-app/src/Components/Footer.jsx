import { assets } from "../assets/assets"
import { Github, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 px-4 md:px-0">
        <div className="flex flex-col items-center md:items-center space-y-4 md:w-1/3">
          <img src={assets.logo || "/placeholder.svg"} alt="Logo" className="h-16" />
          <p className="text-center md:text-center text-sm md:text-base">
            Welcome to Train-urself, your ultimate destination for tech and programming Question. Choose from diverse
            categories, and read articles that help you learn, grow, and have fun.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="transition-transform transform hover:scale-110">
              <img src={assets.facebook_icon || "/placeholder.svg"} alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" className="transition-transform transform hover:scale-110">
              <img src={assets.twitter_icon || "/placeholder.svg"} alt="Twitter" className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" className="transition-transform transform hover:scale-110">
              <img src={assets.linkedin_icon || "/placeholder.svg"} alt="LinkedIn" className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-center space-y-4 md:w-1/3">
          <h2 className="font-bold text-xl mb-4 text-center md:text-center relative">
            DEVELOPED BY
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 -mb-2"></span>
          </h2>
          <div className="flex space-x-8">
            <div className="flex flex-col items-center p-3 rounded-lg bg-gray-700/60 hover:bg-gray-700/80 transition-colors duration-300">
              <p className="text-sm font-medium mb-2">Yahia Mati</p>
              <div className="flex space-x-2">
                <a
                  href="https://github.com/yahyamati"
                  className="text-gray-300 hover:text-white transition-transform transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yahia Mati's GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              
                  <a href="https://www.linkedin.com/in/yahya-mati-265381298" target="_blank" className="transition-transform transform hover:scale-110">
                    <img src={assets.linkedin_icon || "/placeholder.svg"} alt="LinkedIn" className="h-6 w-6" />
                 </a>
              
              </div>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-gray-700/60 hover:bg-gray-700/80 transition-colors duration-300">
              <p className="text-sm font-medium mb-2">Islam Birouk</p>
              <div className="flex space-x-2">
                <a
                  href="https://github.com/islamdev2022"
                  className="text-gray-300 hover:text-white transition-transform transform hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Islam Birouk's GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                
                  <a href="https://www.linkedin.com/in/birouk-islam" target="_blank" className="transition-transform transform hover:scale-110">
                    <img src={assets.linkedin_icon || "/placeholder.svg"} alt="LinkedIn" className="h-6 w-6" />
                 </a>
            
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4 border-gray-600" />
      <p className="text-center text-sm md:text-base">Copyright {new Date().getFullYear()} © Train-urself - All Rights Reserved.</p>
    </footer>
  )
}

export default Footer