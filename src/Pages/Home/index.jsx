import React, { useState, useEffect, useRef, useMemo } from 'react';

// Preloader component with musical animation - Mobile Optimized
const Preloader = ({ setLoading, darkMode }) => {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="text-center px-4 w-full max-w-sm">
        {/* Musical Notes Animation - Mobile Responsive */}
        <div className="flex justify-center space-x-3 sm:space-x-6 mb-6 sm:mb-8">
          {['♪', '♫', '♪', '♬', '♪'].map((note, i) => (
            <div
              key={i}
              className="text-4xl sm:text-6xl md:text-7xl animate-bounce text-black transform hover:scale-110 transition-transform"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '0.6s'
              }}
            >
              {note}
            </div>
          ))}
        </div>

        {/* Sound Bars - Mobile Responsive */}
        <div className="flex justify-center space-x-1 sm:space-x-2 mb-4 sm:mb-6">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-2 sm:w-3 rounded-full animate-pulse bg-black"
              style={{
                height: `${20 + Math.random() * 35}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Scroll to top button component
const ScrollToTopButton = ({ homeRef, darkMode, isMobile }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Hide on mobile devices
  if (isMobile) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-blue-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};


// Animated text component - reveals elements as they enter viewport
const AnimatedText = ({ children, delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(textRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  const getAnimationClass = () => {
    const baseClass = "transition-all duration-1000 ";
    const delayClass = `delay-${delay * 2}00 `;
    
    if (!isVisible) {
      switch (direction) {
        case 'up': return baseClass + "opacity-0 translate-y-10";
        case 'down': return baseClass + "opacity-0 -translate-y-10";
        case 'left': return baseClass + "opacity-0 translate-x-10";
        case 'right': return baseClass + "opacity-0 -translate-x-10";
        default: return baseClass + "opacity-0";
      }
    }
    
    return baseClass + delayClass + "opacity-100 translate-y-0 translate-x-0";
  };

  return (
    <div ref={textRef} className={getAnimationClass()}>
      {children}
    </div>
  );
};

// Dark Mode Toggle Button
const DarkModeToggle = ({ darkMode, toggleDarkMode, showHamburger, isMobile }) => {
  // Hide when hamburger menu is shown on mobile
  if (isMobile && showHamburger) return null;
  
  return (
    <button 
      onClick={toggleDarkMode}
      className={`fixed top-5 right-5 z-50 w-10 h-10 rounded-full ${darkMode ? 'bg-gray-200 text-gray-900' : 'bg-gray-800 text-gray-200'} flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg`}
      aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? (
        // Sun icon for dark mode
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        // Moon icon for light mode
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
};

// Navigation component that changes color on scroll
// Navigation component with hamburger menu when scrolled past projects
const Navigation = ({ activeSection, scrollToSection, navItems, darkMode, isMobile, projectsRef }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      const projectsPosition = projectsRef.current ? projectsRef.current.offsetTop : 0;
      const shouldShowHamburger = window.scrollY >= projectsPosition - 100; // Show hamburger 100px before projects section
      
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      if (shouldShowHamburger !== showHamburger) {
        setShowHamburger(shouldShowHamburger);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, showHamburger, projectsRef]);

  // Close mobile menu when clicking on a nav item
  const handleNavClick = (ref) => {
    scrollToSection(ref);
    setMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  if (isMobile && showHamburger) {
    // Mobile Navigation with Hamburger Menu (only when scrolled past projects)
    return (
      <>
        {/* Mobile Hamburger Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          className={`fixed top-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-500 ${
            darkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'
          } shadow-lg`}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 transition-all duration-300 ${
              darkMode ? 'bg-gray-300' : 'bg-gray-700'
            } ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-5 h-0.5 mt-1 transition-all duration-300 ${
              darkMode ? 'bg-gray-300' : 'bg-gray-700'
            } ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 mt-1 transition-all duration-300 ${
              darkMode ? 'bg-gray-300' : 'bg-gray-700'
            } ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Background overlay */}
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900' : 'bg-white'} bg-opacity-95 backdrop-blur-sm`}></div>
          
          {/* Menu Items */}
          <div className="relative z-50 flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.ref)}
                className={`text-2xl font-bold transition-all duration-300 transform ${
                  mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                } ${
                  activeSection === item.name.toLowerCase() 
                    ? (darkMode ? 'text-blue-400' : 'text-blue-600') 
                    : (darkMode ? 'text-gray-300' : 'text-gray-700')
                } hover:${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:scale-110`}
                style={{ 
                  transitionDelay: mobileMenuOpen ? `${index * 100}ms` : '0ms' 
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  // Regular Navigation Bar (Desktop and Mobile before projects section)
  return (
    <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-sm transition-all duration-500 rounded-full px-4 sm:px-6 py-3 ${
      darkMode ? 'bg-gray-900 bg-opacity-90' : 'bg-white bg-opacity-90'
    } shadow-lg`}>
      <div className={`flex items-center ${isMobile ? 'space-x-4 sm:space-x-8'  : 'space-x-4 sm:space-x-8'}`}>
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`${isMobile ? 'text-xs' : 'text-sm sm:text-base'} font-bold transition-all duration-300 relative
              ${activeSection === item.name.toLowerCase() ? (darkMode ? 'text-blue-400' : 'text-blue-600') : (darkMode ? 'text-gray-300' : 'text-gray-700')}
              hover:${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
            onClick={() => scrollToSection(item.ref)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
};
const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const initialLimit = 4;
  
  // These are the key state variables for the modal functionality
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Refs for each section
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const notesRef = useRef(null);
  
  // Project Modal Component Definition
// ProjectModal Component with Slideshow (Original Layout)
const ProjectModal = ({ project, isOpen, onClose, darkMode }) => {
  if (!isOpen || !project) return null;
  
  const modalRef = useRef(null);
  // State to track current screenshot index
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get screenshots array from project, fallback to empty array
  const screenshots = project.screenshots || [];
  
  // Default screenshot if none exist
  const defaultScreenshot = {
    src: "/images/default-screenshot.png",
    alt: "Default screenshot"
  };
  
  // Helper function to check if file is a video
  const isVideo = (src) => {
    return src && (src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.ogg') || src.endsWith('.mov'));
  };
  
  // Function to go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };
  
  // Function to go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);
  
  // Reset current slide when modal opens with a new project
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen, project]);
  
  // Get current media source
  const currentMediaSrc = screenshots.length > 0 ? screenshots[currentSlide].src : defaultScreenshot.src;
  const currentMediaAlt = screenshots.length > 0 ? (screenshots[currentSlide].alt || `Media ${currentSlide + 1}`) : defaultScreenshot.alt;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      <div 
        className={`absolute inset-0 backdrop-blur-md ${
          darkMode ? 'bg-black bg-opacity-70' : 'bg-gray-200 bg-opacity-70'
        } transition-all duration-300`}
      ></div>
      
      <div 
        ref={modalRef}
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl transform transition-all duration-500 ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}
        style={{
          animation: 'modal-appear 0.4s ease-out forwards',
        }}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-50 w-8 h-8 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors duration-300`}
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        <div className="flex flex-col md:flex-row">
          {/* LEFT SIDE: Screenshot/Video Slideshow */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
            <div className="h-full relative">
              {/* Main Media Display */}
              <div className="w-full h-full flex items-center justify-center relative z-20">
                <div className="md:p-6 w-full h-full flex items-center justify-center">
                  {isVideo(currentMediaSrc) ? (
                    <video 
                      controls
                      preload="metadata"
                      className="w-full h-full object-contain relative z-30"
                      style={{
                        maxHeight: '80%',
                        maxWidth: '80%',
                        pointerEvents: 'auto'
                      }}
                      onError={(e) => {
                        console.error('Video failed to load:', currentMediaSrc);
                      }}
                      onLoadStart={() => {
                        console.log('Video loading started:', currentMediaSrc);
                      }}
                    >
                      <source src={currentMediaSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img 
                      src={currentMediaSrc} 
                      alt={currentMediaAlt} 
                      className="w-full h-full object-contain"
                      style={{
                        maxHeight: '80%',
                        maxWidth: '80%'
                      }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-screenshot.png";
                      }}
                    />
                  )}
                </div>
              </div>
              
              {/* Gradient overlay - only for images, not videos */}
              {!isVideo(currentMediaSrc) && (
                <div className={`absolute inset-0 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-gray-900 via-transparent to-transparent opacity-70' 
                    : 'bg-gradient-to-r from-white via-transparent to-transparent opacity-50'
                } z-10`}></div>
              )}
              
              {/* Navigation controls - only show if there are multiple screenshots */}
              {screenshots.length > 1 && (
                <>
                  {/* Previous button */}
                  <button 
                    onClick={prevSlide}
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full ${
                      darkMode ? 'bg-gray-900 bg-opacity-70 hover:bg-gray-800' : 'bg-white bg-opacity-70 hover:bg-gray-100'
                    } flex items-center justify-center transition-all duration-300 hover:scale-110 z-40`}
                    aria-label="Previous slide"
                  >
                    <svg 
                      className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Next button */}
                  <button 
                    onClick={nextSlide}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full ${
                      darkMode ? 'bg-gray-900 bg-opacity-70 hover:bg-gray-800' : 'bg-white bg-opacity-70 hover:bg-gray-100'
                    } flex items-center justify-center transition-all duration-300 hover:scale-110 z-40`}
                    aria-label="Next slide"
                  >
                    <svg 
                      className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Slide counter */}
                  <div className={`absolute bottom-4 right-4 px-2 py-1 rounded-md text-xs z-40 ${
                    darkMode ? 'bg-gray-800 bg-opacity-70 text-white' : 'bg-white bg-opacity-70 text-gray-800'
                  }`}>
                    {currentSlide + 1} / {screenshots.length}
                  </div>
                </>
              )}
              
              {/* Thumbnail strip at bottom */}
              {screenshots.length > 1 && (
                <div className={`absolute bottom-0 left-0 right-0 flex justify-center bg-opacity-70 z-40 ${
                  darkMode ? 'bg-gray-900' : 'bg-gray-100'
                } py-1 px-2 overflow-x-auto`}>
                  <div className="flex space-x-1">
                    {screenshots.map((screenshot, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-8 w-8 rounded-sm overflow-hidden ${
                          currentSlide === index 
                            ? 'ring-2 ring-blue-500 opacity-100 scale-110' 
                            : 'opacity-70 hover:opacity-100'
                        } transition-all duration-300 relative`}
                      >
                        {isVideo(screenshot.src) ? (
                          <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <img
                            src={screenshot.src}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/default-screenshot.png";
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* RIGHT SIDE: Project Details */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
            <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {project.title}
            </h2>
            <p className={`mb-4 text-sm font-semibold ${project.tagColor(darkMode)}`}>
              {project.tagText}
            </p>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {project.description}
            </p>
            
            <h3 className={`text-lg font-semibold mb-2 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Key Features
            </h3>
            <ul className="mb-6 space-y-2">
              {project.features && project.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-lg mr-2">{feature.icon}</span>
                  <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    <strong className="block">{feature.title}</strong>
                    <span>{feature.description}</span>
                  </div>
                </li>
              ))}
            </ul>
            
            <h3 className={`text-lg font-semibold mb-2 ${
              darkMode ? 'text-blue-300' : 'text-blue-700'
            }`}>
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies && project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${tech.color(darkMode)}`}
                >
                  {tech.iconPath && (
                    <img
                      src={tech.iconPath}
                      alt={`${tech.name} icon`}
                      className="h-4 w-4 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-icon.png";
                      }}
                    />
                  )}
                  {tech.name}
                </span>
              ))}
            </div>
            
            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <a
                href={project.liveUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <span>View Live</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>

              <a
                href={project.repoUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                <span>Source Code</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  const projectsData = [
     {
     
            id: 1,
            title: "ECPOS - In House Point of Sale System (Mobile)",
            tagText: "In-house POS system for BW Super Bakeshop",
            tagColor: darkMode => darkMode ? "text-blue-300" : "text-blue-600",
            type: "mobile",
            imagePath: "/images/ecpostablet1.png",
            projectLink: "https://eljin.org/",
            liveUrl: "https://eljin.org/",
            repoUrl: "https://github.com/Raysantos22/ECPOS",
            description: "A fully integrated, in-house POS system developed for BW Super Bakeshop, deployed across 21 store locations. ECPOS manages inventory, sales, customer engagement, employee attendance, and reporting. With real-time cloud synchronization and intuitive dashboards, it streamlines daily operations and improves decision-making across all branches.",
           features: [
                  {
                    icon: "💼",
                    title: "Multi-Branch Deployment",
                    description: "Seamlessly operates across 21 branches with support for multi-terminal usage per store."
                  },

                  {
                    icon: "📈",
                    title: "Sales & Financial Reporting",
                    description: "Generates comprehensive sales reports, discount analysis, and financial summaries with visual dashboards for easy business insights."
                  },
                  {
                    icon: "👥",
                    title: "Customer & Loyalty Management",
                    description: "Built-in CRM with loyalty point systems and member tracking to boost customer retention and personalized service."
                  },
                  {
                    icon: "⏱️",
                    title: "Employee Attendance & Time Tracking",
                    description: "Monitors employee check-ins/outs, records working hours, and manages shift schedules for HR efficiency."
                  },
                    {
                    icon: "📦",
                    title: "Advanced Inventory Management",
                    description: "Handles batch counting, inventory movements, and real-time stock level tracking with stock transfer support between branches."
                  },
                  {
                    icon: "🛒",
                    title: "Flexible Cashier Module",
                    description: "Designed for fast-paced retail environments with multi-window support, change fund management, and customizable item carts."
                  },
                  {
                    icon: "🧾",
                    title: "Order & Expense Management",
                    description: "Supports order processing, store-level expense recording, and request handling, ensuring tight cost control."
                  },
                  {
                    icon: "⚙️",
                    title: "Administrative Settings & Control Panel",
                    description: "Includes printer configuration, POS info setup, and emergency sync tools for store admins and IT support."
                  }
                ]
                ,
      technologies: [
        { 
          name: "Kotlin",
          iconPath: "/images/kotlin.png", 
          color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800" 
        },
        { 
          name: "Node.js",
          iconPath: "/images/node.png", 
          color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800" 
        },
        
        { 
          name: "Laravel API",
          iconPath: "/images/laravel.png", 
          color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800" 
        },
     
           { 
          name: "Room Db",
          iconPath: "/images/roomdb1.jpg", 
          color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800" 
        },
        { 
          name: "Android Studio",
          iconPath: "/images/androidstudio.png", 
          color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800" 
        }
      ],
      screenshots: [
           {
          src: "/images/e1.png",
        },
        {
          src: "/images/e2.png",
        },
             {
          src: "/images/e3.png",
        },
        {
          src: "/images/e4.png",
        },
             {
          src: "/images/e5.png",
        },
        {
          src: "/images/e6.png",
        },
             {
          src: "/images/e7.png",
        },
        {
          src: "/images/e8.png",
        },
             {
          src: "/images/e9.png",
        },
        {
          src: "/images/e10.png",
        },
             {
          src: "/images/e11.png",
        },
        {
          src: "/images/e12.png",
        },
             {
          src: "/images/e13.png",
        },
        {
          src: "/images/e14.png",
        },
             {
          src: "/images/e15.png",
        },
        {
          src: "/images/e16.png",
        },
             {
          src: "/images/e17.png",
        },
        {
          src: "/images/e18.png",
        },
             {
          src: "/images/e19.png",
        },
        {
          src: "/images/e20.png",
        },
             {
          src: "/images/e21.png",
        },
        {
          src: "/images/e22.png",
        },
             {
          src: "/images/e23.png",
        },
        {
          src: "/images/e24.png",
        },
             {
          src: "/images/e25.png",
        },
        {
          src: "/images/e26.jpg",
        },
             {
          src: "/images/e27.jpg",
        },
        {
          src: "/images/e28.jpg",
        },
             {
          src: "/images/e29.jpg",
        },
        {
          src: "/images/e30.jpg",
        },
             {
          src: "/images/e31.jpg",
        },
        {
          src: "/images/e32.jpg",
        }
      ]
    },
    {
      
   
  id: 2,
  title: "Mobile-Based Real-Time Skin Disease Detection with YOLO v5",
  tagText: "🏆 Winner of TSU 2024 Best Thesis Award in BSCS",
  tagColor: darkMode => darkMode ? "text-yellow-300" : "text-yellow-600",
  type: "mobile",
  imagePath: "/images/diseasesscan1.png",
  projectLink: "/projects/skin-disease-detection",
  liveUrl: "https://github.com/Raysantos22",
  repoUrl: "https://github.com/Raysantos22",
  description: "Developed an offline mobile app using Java/Kotlin for real-time skin disease detection with 95.20% accuracy. Utilizes YOLO v5 (TensorFlow/PyTorch) and OpenCV to identify 12 common skin conditions, aiding early diagnosis and treatment even without internet access.",
  features: [
    {
      icon: "🤖",
      title: "YOLO v5 Detection Model",
      description: "Integrated YOLO v5 with TensorFlow/PyTorch for fast and accurate object detection of skin conditions."
    },
    {
      icon: "📱",
      title: "Offline Mobile App",
      description: "Built using Java/Kotlin for Android, the app works fully offline, ideal for remote areas with limited connectivity."
    },
    {
      icon: "📊",
      title: "High Diagnostic Accuracy",
      description: "Achieved 95.20% accuracy, 94.80% precision, 96.10% specificity, and 95.50% recall across 12 diseases."
    },
    {
      icon: "🩺",
      title: "Real-Time Analysis",
      description: "Instant detection through live camera feed using OpenCV-powered preprocessing and YOLO-based inference."
    },
    {
      icon: "📚",
      title: "Comprehensive Condition Coverage",
      description: "Covers acne, bullous pemphigoid, herpes zoster, hives, impetigo, melanonychia, monkeypox, psoriasis, ringworm, warts, cutaneous larva migrans, and Raynaud's phenomenon."
    }
  ],

      technologies: [
        { 
          name: "Kotlin",
          iconPath: "/images/kotlin.png", 
          color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800" 
        },
        { 
          name: "TensorFlow",
          iconPath: "/images/tensorflow.png", 
          color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800" 
        },
        { 
          name: "PyTorch",
          iconPath: "/images/pytorch.png", 
          color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800" 
        },
        { 
            name: "Android Studio",
            iconPath: "/images/androidstudio.png",
            color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800" 
        },
          {
          name: "YOLO v5",
          iconPath: "/images/yolo.png",
          color: darkMode => darkMode ? "bg-red-900 bg-opacity-30 text-red-200" : "bg-red-100 text-red-800"
        },
        { 
          name: "Kaggle",
          iconPath: "/images/kaggle.png", 
          color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800" 
        }
      ],
     screenshots: [
        {
          src: "/images/m1.jpg",
        },
        {
          src: "/images/m2.jpg",
        },
         {
          src: "/images/m3.jpg",
        },
        {
          src: "/images/m4.jpg",
        },
         {
          src: "/images/m5.jpg",
        },
        {
          src: "/images/m6.jpg",
        },
        {
          src: "/images/m7.mp4",
        },
        {
          src: "/images/m1.gif",
        },
         {
          src: "/images/m8.jpg",
        }
      ]
    
    },
         {
    id: 5,
  title: "Vegetable Health Monitoring System with Object Detection Using YOLOv11",
  tagText: "🌿 Real-time mobile app for tomato pest and disease detection",
  tagColor: darkMode => darkMode ? "text-green-300" : "text-green-600",
  type: "mobile",
  imagePath: "/images/plantmonitoring3.png",
  projectLink: "/projects/vegetable-monitoring",
  liveUrl: "https://github.com/Raysantos22",
  repoUrl: "https://github.com/Raysantos22",
  description: "A mobile-based application developed to help new gardeners monitor tomato plant health using real-time image processing. Built with YOLOv11 for object detection, it identifies pests and diseases, provides severity assessments, and suggests treatment recommendations for improved crop quality.",
  features: [
    {
      icon: "📷",
      title: "Real-Time Object Detection",
      description: "Utilizes YOLOv11 to identify visible signs of pests and diseases on tomato plants using the device camera."
    },
    {
      icon: "📅",
      title: "Daily Monitoring",
      description: "Allows users to regularly track the condition of their vegetables with logs and visual comparisons."
    },
    {
      icon: "📊",
      title: "Severity Assessment",
      description: "Estimates the seriousness of detected conditions to assist with timely and appropriate action."
    },
    {
      icon: "🐛",
      title: "Pest and Disease Identification",
      description: "Detects and classifies common tomato plant issues with precision using a trained detection model."
    },
    {
      icon: "🧪",
      title: "Treatment Recommendations",
      description: "Provides suggested remedies or actions based on identified issues to help users manage their crops."
    }
  ],
  technologies: [
    {
      name: "Kotlin",
      iconPath: "/images/kotlin.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
     {
      name: "Pytorch",
      iconPath: "/images/pytorch.png",
      color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800"
    },
    {
      name: "Tensorflow",
      iconPath: "/images/tensorflow.png",
      color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800"
    },
    {
      name: "Kaggle",
      iconPath: "/images/kaggle.png",
      color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800"
    },
        {
      name: "YOLOv11",
      iconPath: "/images/yolo.png",
      color: darkMode => darkMode ? "bg-red-900 bg-opacity-30 text-red-200" : "bg-red-100 text-red-800"
    },

    {
      name: "Android Studio ",
      iconPath: "/images/androidstudio.png",
      color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800"
    }
  ],
     screenshots: [
        {
          src: "/images/p1.jpg",
        },
        {
          src: "/images/p2.jpg",
        },
         {
          src: "/images/p3.jpg",
        },
        {
          src: "/images/p4.jpg",
        },
         {
          src: "/images/p5.jpg",
        },
        {
          src: "/images/p6.jpg",
        },
        {
          src: "/images/p7.jpg",
        },
            {
          src: "/images/p8.jpg",
        },
        {
          src: "/images/p9.jpg",
        },
         {
          src: "/images/p10.jpg",
        },
             {
          src: "/images/p11.jpg",
        },
        {
          src: "/images/p12.jpg",
        },
         {
          src: "/images/p13.jpg",
        },
        {
          src: "/images/p14.jpg",
        },
         {
          src: "/images/p15.jpg",
        },
        {
          src: "/images/p16.jpg",
        },
        {
          src: "/images/p17.jpg",
        }
      ]
    },
        {
  
  id: 6,
  title: "SIGN-IFY: Filipino Sign Language Recognition with Facial Expression Using YOLOv11",
  tagText: "👐 Real-time FSL translation with facial expression detection",
  tagColor: darkMode => darkMode ? "text-indigo-300" : "text-indigo-600",
  type: "mobile",
  imagePath: "/images/signify1.png",
  projectLink: "/projects/signify-fsl",
  liveUrl: "https://github.com/Raysantos22",
  repoUrl: "https://github.com/Raysantos22",
  description: "SIGN-IFY is a real-time mobile application designed to help deaf and mute individuals communicate more effectively by translating Filipino Sign Language (FSL) gestures and facial expressions into text or speech. Powered by YOLOv11 and CNN-based deep learning, the app recognizes FSL signs and facial cues for more accurate and expressive translations.",
  features: [
    {
      icon: "✋",
      title: "Hand Gesture Recognition",
      description: "Detects FSL alphabet and word gestures in real-time using YOLOv11 and a dedicated gesture dataset."
    },
        {
      icon: "🗣️",
      title: "Text and Speech Output",
      description: "Translates detected signs and expressions into readable text and synthesized speech for broader communication."
    },
    {
      icon: "😊",
      title: "Facial Expression Detection",
      description: "Recognizes emotional expressions (happy, sad, angry) to add emotional context to sign translation."
    },

    {
      icon: "⚡",
      title: "Real-Time Performance",
      description: "Optimized for mobile using lightweight models for fast and accurate FSL recognition."
    },
    {
      icon: "📊",
      title: "Dataset Utilization",
      description: "Trained on a combined dataset from Kaggle (5,077 images) covering alphabet, word signs, and facial expressions."
    }
  ],
  technologies: [
     {
      name: "Kotlin",
      iconPath: "/images/kotlin.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
    {
      name: "YOLOv11",
      iconPath: "/images/yolo.png",
      color: darkMode => darkMode ? "bg-red-900 bg-opacity-30 text-red-200" : "bg-red-100 text-red-800"
    },
   
     {
      name: "Pytorch",
      iconPath: "/images/pytorch.png",
      color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800"
    },
    {
      name: "Tensorflow",
      iconPath: "/images/tensorflow.png",
      color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800"
    },
    {
      name: "Kaggle",
      iconPath: "/images/kaggle.png",
      color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800"
    },
        {
      name: "Text to Speech",
      color: darkMode => darkMode ? "bg-red-900 bg-opacity-30 text-red-200" : "bg-red-100 text-red-800"
    },
    {
      name: "Android Studio ",
      iconPath: "/images/androidstudio.png",
      color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800"
    }
  ],
       screenshots: [
        {
          src: "/images/s1.jpg",
        },
        {
          src: "/images/s2.jpg",
        },
         {
          src: "/images/s3.jpg",
        },
        {
          src: "/images/s4.jpg",
        },
         {
          src: "/images/s5.jpg",
        },
        {
          src: "/images/s6.jpg",
        },
        {
          src: "/images/s7.jpg",
        },
        {
          src: "/images/s8.jpg",
        }
      ]
    },
        
 
    {
  id: 4,
  title: "Real-Time Face-Based Attendance System with Anti-Spoofing and Hand-Raising Detection",
  tagText: "🎓 Face recognition system for secure student attendance",
  tagColor: darkMode => darkMode ? "text-red-300" : "text-red-600",
  type: "system",
  imagePath: "/images/attendancefs1.png",
  projectLink: "/projects/face-attendance-system",
  liveUrl: "https://github.com/Raysantos22",
  repoUrl: "https://github.com/Raysantos22",
  description: "Developed a real-time student attendance system using Python, integrating Facenet for facial recognition, SVM for classification, and Haar cascades for anti-spoofing. The system features face login for secure authentication, hand-raising detection to track participation, and supports login time, logout, and admin access functionalities.",
  features: [
    {
      icon: "🧠",
      title: "Facial Recognition with Facenet",
      description: "Uses Facenet embeddings for high-accuracy face identification and user verification."
    },
    {
      icon: "🛡️",
      title: "Anti-Spoofing Mechanism",
      description: "Implements Haar cascade classifiers to prevent spoofing attempts using printed or digital photos."
    },
    {
      icon: "✋",
      title: "Hand-Raising Detection",
      description: "Detects raised hands during class sessions to monitor student participation in real time."
    },
    {
      icon: "⏱️",
      title: "Login/Logout with Face",
      description: "Captures attendance with time in and out using secure facial login."
    },
    {
      icon: "🔐",
      title: "Admin Access Panel",
      description: "Provides administrator tools to review logs, manage users, and configure attendance policies."
    }
  ],
  technologies: [
    { 
      name: "Python",
      iconPath: "/images/python.png", 
      color: darkMode => darkMode ? "bg-yellow-900 bg-opacity-30 text-yellow-200" : "bg-yellow-100 text-yellow-800" 
    },
    { 
      name: "Facenet",
      // iconPath: "/images/facenet.png", 
      color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800" 
    },
    { 
      name: "SVM",
      // iconPath: "/images/svm.png", 
      color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800" 
    },
    { 
      name: "Haar Cascade",
      // iconPath: "/images/haar.png", 
      color: darkMode => darkMode ? "bg-gray-900 bg-opacity-30 text-gray-200" : "bg-gray-100 text-gray-800" 
    },
    { 
      name: "OpenCV",
      iconPath: "/images/opencv.png", 
      color: darkMode => darkMode ? "bg-teal-900 bg-opacity-30 text-teal-200" : "bg-teal-100 text-teal-800" 
    }
  ],
      screenshots: [
        {
          src: "/images/r1.gif",
          alt: "Activity dashboard"
        }
      ]
    },
  
 {
  id: 7,
  title: "Snake Identifier: Classifying Venomous and Non-Venomous Snakes in the Philippines Using YOLOv11",
  tagText: "🐍 Real-time snake identification and safety tool",
  tagColor: darkMode => darkMode ? "text-red-300" : "text-red-600",
  type: "mobile",
  imagePath: "/images/snakedetection8.png",
  projectLink: "/projects/snake-identifier",
  liveUrl: "https://github.com/Raysantos22",
  repoUrl: "https://github.com/Raysantos22",
  description: "A mobile app designed to identify and classify venomous and non-venomous snakes in the Philippines using YOLOv11. The application supports real-time detection, even offline, and provides vital safety information including species data, habitats, and first aid procedures for snakebite incidents. It aims to support outdoor enthusiasts, researchers, and medical professionals in snake-prone regions.",
  features: [
    {
      icon: "📷",
      title: "Real-Time Snake Detection",
      description: "Capture and classify snake species in real-time using an optimized YOLOv11 model."
    },
    {
      icon: "🧪",
      title: "Venomous vs Non-Venomous Classification",
      description: "Accurately distinguishes between venomous and non-venomous snakes using deep learning."
    },
    {
      icon: "📵",
      title: "Offline Functionality",
      description: "Works without internet access, ideal for remote and rural field use."
    },
    {
      icon: "📚",
      title: "Educational Resources",
      description: "Includes safety guidelines, habitat information, and snakebite first aid protocols."
    },
    {
      icon: "🏥",
      title: "Healthcare Support",
      description: "Assists medical teams by helping identify snakes and selecting proper antivenom."
    }
  ],
  technologies: [
 
    {
      name: "Kotlin",
      iconPath: "/images/kotlin.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
      {
      name: "Tensorflow",
      iconPath: "/images/tensorflow.png",
      color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800"
    },
     {
      name: "Pytorch",
      iconPath: "/images/pytorch.png",
      color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800"
    },
  
    {
      name: "Kaggle",
      iconPath: "/images/kaggle.png",
      color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800"
    },
       {
      name: "YOLOv11",
      iconPath: "/images/yolo.png",
      color: darkMode => darkMode ? "bg-red-900 bg-opacity-30 text-red-200" : "bg-red-100 text-red-800"
    },
    {
      name: "Android Studio ",
      iconPath: "/images/androidstudio.png",
      color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800"
    }
  ],
        screenshots: [
        {
          src: "/images/snake1.jpg",
        },
        {
          src: "/images/snake2.jpg",
        },
         {
          src: "/images/snake3.jpg",
        },
        {
          src: "/images/snake4.jpg",
        },
         {
          src: "/images/snake5.jpg",
        },
        {
          src: "/images/snake6.jpg",
        },
        {
          src: "/images/snake7.jpg",
        },
            {
          src: "/images/snake8.jpg",
        }
      ]
    },
        
  {
  id: 8,
  title: "AI-Driven Object Detection with Descriptive Audio Feedback for Blind Users Using YOLOv9",
  tagText: "🎧 Assistive object detection for the visually impaired",
  tagColor: darkMode => darkMode ? "text-yellow-300" : "text-yellow-600",
  type: "mobile",
  imagePath: "/images/blinddetection2.png",
  projectLink: "/projects/ai-vision-assist",
  liveUrl: "https://github.com/Raysantos22",
  repoUrl: "https://github.com/Raysantos22",
  description: "A wearable mobile application built with YOLOv9 to assist visually impaired users by detecting objects and providing descriptive audio feedback in real time. The app includes GPS tracking for caregiver monitoring, distance measurement, and works offline—ensuring privacy, low latency, and functionality in any environment.",
  features: [
    {
      icon: "🕶️",
      title: "Wearable and Mobile-Based",
      description: "Designed to be worn on the chest with a harness, allowing stable camera input and comfortable hands-free operation."
    },
    {
      icon: "🎙️",
      title: "Real-Time Audio Feedback",
      description: "Objects detected in the camera's view are immediately described through text-to-speech output."
    },
    {
      icon: "📏",
      title: "Distance Estimation",
      description: "Estimates proximity of objects using monocular depth estimation models for better spatial awareness."
    },
    {
      icon: "📵",
      title: "Offline Functionality",
      description: "Processes all detection and audio feedback locally without internet dependency, ensuring user privacy and low latency."
    },
    {
      icon: "📍",
      title: "GPS Tracking",
      description: "Allows caregivers to monitor the user’s location for added safety and peace of mind."
    }
  ],
  technologies: [
    {
      name: "YOLOv9",
      iconPath: "/images/yolo.png",
      color: darkMode => darkMode ? "bg-red-900 bg-opacity-30 text-red-200" : "bg-red-100 text-red-800"
    },
    {
      name: "TensorFlow",
      iconPath: "/images/tensorflow.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
    {
      name: "Kotlin",
      iconPath: "/images/kotlin.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
   {
      name: "Kaggle",
      iconPath: "/images/kaggle.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
      {
      name: "Pytorch",
      iconPath: "/images/pytorch.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
    {
      name: "Android Studio",
      iconPath: "/images/androidstudio.png",
      color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800"
    }
  ],
      screenshots: [
        {
          src: "/images/b1.jpg",
        },
        {
          src: "/images/b2.jpg",
        },
           {
          src: "/images/b3.jpg",
        },
        {
          src: "/images/b4.jpg",
        },
           {
          src: "/images/b5.jpg",
        },
        {
          src: "/images/b6.jpg",
        },
           {
          src: "/images/b7.jpg",
        },
        {
          src: "/images/b8.jpg",
        },
           {
          src: "/images/b9.mp4",
        },
        {
          src: "/images/b10.jpg",
        }

      
      ]
    },

        {
  id: 9,
     title: "ECPOS - In House Point of Sale System (Website)",
            tagText: "In-house POS system for BW Super Bakeshop",
            tagColor: darkMode => darkMode ? "text-blue-300" : "text-blue-600",
            type: "website",
            imagePath: "/images/ecposlaptop1.png",
            projectLink: "/projects/ecpos-system",
            liveUrl: "https://github.com/Raysantos22",
            repoUrl: "https://github.com/Raysantos22",
            description: "A fully integrated, in-house POS system developed for BW Super Bakeshop, deployed across 50+ store locations. ECPOS manages inventory, sales, customer engagement, employee attendance, and reporting. With real-time cloud synchronization and intuitive dashboards, it streamlines daily operations and improves decision-making across all branches.",
           features: [
                  {
                    icon: "💼",
                    title: "Multi-Branch Deployment",
                    description: "Seamlessly operates across 50+ branches with support for multi-terminal usage per store."
                  },

                  {
                    icon: "📈",
                    title: "Sales & Financial Reporting",
                    description: "Generates comprehensive sales reports, discount analysis, and financial summaries with visual dashboards for easy business insights."
                  },
                  {
                    icon: "👥",
                    title: "Customer & Loyalty Management",
                    description: "Built-in CRM with loyalty point systems and member tracking to boost customer retention and personalized service."
                  },
                  {
                    icon: "⏱️",
                    title: "Employee Attendance & Time Tracking",
                    description: "Monitors employee check-ins/outs, records working hours, and manages shift schedules for HR efficiency."
                  },
                    {
                    icon: "📦",
                    title: "Advanced Inventory Management",
                    description: "Handles batch counting, inventory movements, and real-time stock level tracking with stock transfer support between branches."
                  },
                  {
                    icon: "🛒",
                    title: "Flexible Cashier Module",
                    description: "Designed for fast-paced retail environments with multi-window support, change fund management, and customizable item carts."
                  },
                  {
                    icon: "🧾",
                    title: "Order & Expense Management",
                    description: "Supports order processing, store-level expense recording, and request handling, ensuring tight cost control."
                  },
                  {
                    icon: "⚙️",
                    title: "Administrative Settings & Control Panel",
                    description: "Includes printer configuration, POS info setup, and emergency sync tools for store admins and IT support."
                  }
                ]
                ,
      technologies: [
        { 
          name: "Laravel API",
          iconPath: "/images/laravel.png", 
          color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800" 
        },
           { 
          name: "PHP",
          iconPath: "/images/php.png", 
          color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800" 
        },
          { 
          name: "Node.js",
          iconPath: "/images/node.png", 
          color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800" 
        },
          { 
          name: "JavaScript",
          iconPath: "/images/javascriptlogo.png", 
          color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800" 
        },
        
          { 
          name: "Mysql",
          iconPath: "/images/mysql.png", 
          color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800" 
        },
         { 
          name: "TailWind",
          iconPath: "/images/tailwind.png", 
          color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800" 
        },
           { 
          name: "HTML",
          iconPath: "/images/html.png", 
          color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800" 
        },
          
            { 
          name: "CSS",
          iconPath: "/images/css3.png", 
          color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800" 
        }
      ],
       screenshots: [
           {
          src: "/images/e1.png",
        },
        {
          src: "/images/e2.png",
        },
             {
          src: "/images/e3.png",
        },
        {
          src: "/images/e4.png",
        },
             {
          src: "/images/e5.png",
        },
        {
          src: "/images/e6.png",
        },
             {
          src: "/images/e7.png",
        },
        {
          src: "/images/e8.png",
        },
             {
          src: "/images/e9.png",
        },
        {
          src: "/images/e10.png",
        },
             {
          src: "/images/e11.png",
        },
        {
          src: "/images/e12.png",
        },
             {
          src: "/images/e13.png",
        },
        {
          src: "/images/e14.png",
        },
             {
          src: "/images/e15.png",
        },
        {
          src: "/images/e16.png",
        },
             {
          src: "/images/e17.png",
        },
        {
          src: "/images/e18.png",
        },
             {
          src: "/images/e19.png",
        },
        {
          src: "/images/e20.png",
        },
             {
          src: "/images/e21.png",
        },
        {
          src: "/images/e22.png",
        },
             {
          src: "/images/e23.png",
        },
        {
          src: "/images/e24.png",
        },
             {
          src: "/images/e25.png",
        },
        {
          src: "/images/e26.jpg",
        },
             {
          src: "/images/e27.jpg",
        },
        {
          src: "/images/e28.jpg",
        },
             {
          src: "/images/e29.jpg",
        },
        {
          src: "/images/e30.jpg",
        },
             {
          src: "/images/e31.jpg",
        },
        {
          src: "/images/e32.jpg",
        }
      ]
    },
   {
  id: 10,
  title: "ISKOYAN: A Scholarship Application and Distribution System with Prescriptive Analytics for Ramos",
  tagText: "🎓 Data-driven scholarship system with intelligent recommendations",
  tagColor: darkMode => darkMode ? "text-indigo-300" : "text-indigo-600",
  type: "website",
  imagePath: "/images/iskoyanlaptop1.png",
  projectLink: "/projects/iskoyan",
  liveUrl: "https://github.com/Raysantos22",
  repoUrl: "https://github.com/Raysantos22",
  description: "ISKOYAN is a data-driven web platform built to improve the scholarship application and distribution process using prescriptive analytics. It offers intelligent recommendations, status tracking, interview management, and automated decision support for scholarship allocation. Designed for applicants, scholars, and administrators, ISKOYAN ensures efficiency, transparency, and fairness in every step.",
  features: [
    {
      icon: "📝",
      title: "Smart Application & Recommendation",
      description: "Applicants submit details and receive personalized scholarship recommendations using prescriptive analytics."
    },
    {
      icon: "📷",
      title: "Camera-Based Online Interviews",
      description: "Built-in support for live interviews using webcam with optional liveliness detection."
    },
    {
      icon: "📊",
      title: "Admin Dashboard & Reporting",
      description: "Comprehensive admin module for evaluation, interview scheduling, distribution notifications, and data backup."
    },
    {
      icon: "🔔",
      title: "Application Status Tracking & Alerts",
      description: "Users receive updates, notices, and support ticket feedback in real-time."
    },
    {
      icon: "🧠",
      title: "Prescriptive Analytics Engine",
      description: "Intelligently prescribes suitable scholarships based on applicant data and funding constraints."
    }
  ],
  technologies: [
    {
      name: "PHP",
      iconPath: "/images/php.png",
      color: darkMode => darkMode ? "bg-yellow-900 bg-opacity-30 text-yellow-200" : "bg-yellow-100 text-yellow-800"
    },
    {
      name: "HTML",
      iconPath: "/images/html.png",
      color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800"
    },
    {
      name: "CSS",
      iconPath: "/images/css3.png",
      color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800"
    },
    {
      name: "JavaScript",
      iconPath: "/images/javascriptlogo.png",
      color: darkMode => darkMode ? "bg-yellow-800 bg-opacity-30 text-yellow-200" : "bg-yellow-100 text-yellow-800"
    },
    {
      name: "Mysql",
      iconPath: "/images/mysql.png",
      color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800"
    }
  ],
      screenshots: [
        {
          src: "/images/health-screenshot1.png",
          alt: "Activity dashboard"
        },
        {
          src: "/images/health-screenshot2.png",
          alt: "Nutrition tracker"
        },
        {
          src: "/images/health-screenshot3.png",
          alt: "Sleep analysis"
        }
      ]
    },
         {
  id: 3,
  title: "FoxNav: A 2D Navigation System using MAPBOX and A* Algorithm",
  tagText: "📍 Real-time TSU campus navigation for freshmen",
  tagColor: darkMode => darkMode ? "text-purple-300" : "text-purple-600",
  type: "mobile",
  imagePath: "/images/foxnav5.png",
  projectLink: "/projects/foxnav-navigation",
  liveUrl: "https://github.com/Raysantos22",
  repoUrl: "https://github.com/Raysantos22",
  description: "FoxNav assists TSU freshmen with real-time outdoor navigation using Mapbox API and seamless indoor navigation through a custom 2D map and A* pathfinding algorithm. Users can locate themselves inside buildings and find the fastest route to any room on campus.",
  features: [
    {
      icon: "🗺️",
      title: "Real-Time Outdoor Navigation",
      description: "Utilizes Mapbox API for GPS-based navigation around the TSU campus."
    },
    {
      icon: "🏫",
      title: "Indoor Room-to-Room Navigation",
      description: "Custom 2D campus map with an A* algorithm for optimized indoor pathfinding."
    },
    {
      icon: "📍",
      title: "Current Position Detection",
      description: "Shows user's live location on both indoor and outdoor maps for accurate guidance."
    },
    {
      icon: "📐",
      title: "Optimized Pathfinding",
      description: "A* algorithm ensures shortest and most efficient route recommendations within campus buildings."
    }
  ],
      technologies: [
        { 
          name: "Kotlin",
          iconPath: "/images/kotlin.png", 
          color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800" 
        },
        { 
            name: "Android Studio",
            iconPath: "/images/androidstudio.png",
            color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800" 
        },
          {
    name: "Mapbox",
    iconPath: "/images/mapbox.png",
    color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800"
  },
  {
    name: "A* Algorithm",
    iconPath: "/images/astar1.png",
    color: darkMode => darkMode ? "bg-gray-900 bg-opacity-30 text-gray-200" : "bg-gray-100 text-gray-800"
  },
      ],
      screenshots: [
        {
          src: "/images/foxnav1.jpg",
        },
        {
          src: "/images/foxnav2.jpg",
        },
         {
          src: "/images/foxnav3.jpg",
        },
        {
          src: "/images/foxnav4.jpg",
        },
         {
          src: "/images/foxnav5.jpg",
        },
        {
          src: "/images/foxnav6.jpg",
        },
          {
          src: "/images/foxnav7.jpg",
        },
        {
          src: "/images/foxnav8.jpg",
        },
         {
          src: "/images/foxnav9.jpg",
        },
        {
          src: "/images/foxnav10.jpg",
        },
         {
          src: "/images/foxnav11.jpg",
        },
        {
          src: "/images/foxnav12.jpg",
        },
         {
          src: "/images/foxnav13.jpg",
        }
      ]
    },
  {
  id: 11,
  title: "Hybrid Oral Health Detection using YOLOv8 & TensorFlow",
  tagText: "🦷 AI-based oral disease detection for smokers",
  tagColor: darkMode => darkMode ? "text-red-300" : "text-red-600",
  type: "mobile" ,
  imagePath: "/images/oralguard2.png",
  projectLink: "/projects/oral-health-detection",
  liveUrl: "https://github.com/Raysantos22",
  repoUrl: "https://github.com/Raysantos22",
  description: "A web-based AI system that uses YOLOv8 for object detection and TensorFlow with EfficientNet for classification to detect oral diseases in cigarette and e-cigarette users. Users can upload or capture oral images for real-time analysis, receive descriptive feedback, and gain early warnings for potential health risks like gum disease, discoloration, lesions, or oral cancer. Designed for both users and healthcare professionals, the platform promotes proactive health monitoring and education.",
  features: [
    {
      icon: "📸",
      title: "Image Capture and Upload",
      description: "Users can take or upload images for analysis of oral conditions in real-time."
    },
    {
      icon: "🧠",
      title: "YOLOv8 Object Detection",
      description: "Efficiently detects affected areas in oral images using the latest YOLOv8 model."
    },
    {
      icon: "🔍",
      title: "TensorFlow Classification",
      description: "Classifies oral health issues such as gingivitis, caries, ulcers, or lesions using EfficientNet."
    },
    {
      icon: "💬",
      title: "Descriptive Feedback & Recommendations",
      description: "Displays oral health insights and suggests next steps for users to take."
    },
    {
      icon: "📊",
      title: "Real-Time and Offline Functionality",
      description: "Processes input instantly, with optional offline support for remote access."
    }
  ],
  // technologies: [
  //      {
  //     name: "PHP",
  //     iconPath: "/images/php.png",
  //     color: darkMode => darkMode ? "bg-yellow-900 bg-opacity-30 text-yellow-200" : "bg-yellow-100 text-yellow-800"
  //   },
  //   {
  //     name: "YOLOv8",
  //     iconPath: "/images/yolo.png",
  //     color: darkMode => darkMode ? "bg-red-900 bg-opacity-30 text-red-200" : "bg-red-100 text-red-800"
  //   },
  //   {
  //     name: "TensorFlow",
  //     iconPath: "/images/tensorflow.png",
  //     color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
  //   },
  //   {
  //     name: "Pytorch",
  //     iconPath: "/images/pytorch.png",
  //     color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800"
  //   },
  //   {
  //     name: "Flask",
  //     // iconPath: "/images/flask.png",
  //     color: darkMode => darkMode ? "bg-gray-900 bg-opacity-30 text-gray-200" : "bg-gray-100 text-gray-800"
  //   },
  //    {
  //     name: "HTML",
  //     iconPath: "/images/html.png",
  //     color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800"
  //   },
  //   {
  //     name: "CSS",
  //     iconPath: "/images/css3.png",
  //     color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800"
  //   },
  //   {
  //     name: "JavaScript",
  //     iconPath: "/images/javascriptlogo.png",
  //     color: darkMode => darkMode ? "bg-yellow-800 bg-opacity-30 text-yellow-200" : "bg-yellow-100 text-yellow-800"
  //   },
  //   {
  //     name: "Mysql",
  //     iconPath: "/images/mysql.png",
  //     color: darkMode => darkMode ? "bg-purple-900 bg-opacity-30 text-purple-200" : "bg-purple-100 text-purple-800"
  //   },  
  //   {
  //     name: "OpenCV",
  //     iconPath: "/images/opencv.png",
  //     color: darkMode => darkMode ? "bg-blue-900 bg-opacity-30 text-blue-200" : "bg-blue-100 text-blue-800"
  //   }
  technologies: [
    {
      name: "YOLOv9",
      iconPath: "/images/yolo.png",
      color: darkMode => darkMode ? "bg-red-900 bg-opacity-30 text-red-200" : "bg-red-100 text-red-800"
    },
    {
      name: "TensorFlow",
      iconPath: "/images/tensorflow.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
    {
      name: "Kotlin",
      iconPath: "/images/kotlin.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
   {
      name: "Kaggle",
      iconPath: "/images/kaggle.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
      {
      name: "Pytorch",
      iconPath: "/images/pytorch.png",
      color: darkMode => darkMode ? "bg-orange-900 bg-opacity-30 text-orange-200" : "bg-orange-100 text-orange-800"
    },
    {
      name: "Android Studio",
      iconPath: "/images/androidstudio.png",
      color: darkMode => darkMode ? "bg-green-900 bg-opacity-30 text-green-200" : "bg-green-100 text-green-800"
    }
  ],
      screenshots: [
        {
          src: "/images/health-screenshot1.png",
          alt: "Activity dashboard"
        },
        {
          src: "/images/health-screenshot2.png",
          alt: "Nutrition tracker"
        },
        {
          src: "/images/health-screenshot3.png",
          alt: "Sleep analysis"
        }
      ]
    },
    
    // Continue with the rest of your projects...
    
    
 
  ];
  
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => 
      activeFilter === 'all' || project.type === activeFilter
    );
  }, [activeFilter, projectsData]);
  
  const visibleProjects = useMemo(() => {
    return showAll 
      ? filteredProjects 
      : filteredProjects.slice(0, initialLimit);
  }, [showAll, filteredProjects, initialLimit]);
  
  const toggleShowMore = () => setShowAll(!showAll);
  
  // Reset showAll when filter changes
  useEffect(() => {
    setShowAll(false);
  }, [activeFilter]);
  
  // Check if viewport is mobile
useEffect(() => {
  const checkScreenSize = () => {
    const width = window.innerWidth;
    setIsMobile(width < 768);
    setIsTablet(width >= 768 && width < 1024);
  };
  
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  
  return () => window.removeEventListener('resize', checkScreenSize);
}, []);
  // Nav items and other setup
  const navItems = [
    { name: 'Home', ref: homeRef },
    { name: 'Projects', ref: projectsRef },
    { name: 'About', ref: aboutRef },
    { name: 'Contact', ref: contactRef }
  ];
  
  // Gradient styles
  const lightGradient = {
    color1: '#f0f9ff',
    color2: '#e0f2fe',
    color3: '#bae6fd',
    color4: '#dbeafe'
  };
  
  const darkGradient = {
    color1: '#0f172a',
    color2: '#1e293b',
    color3: '#334155',
    color4: '#1e40af'
  };
  
  const currentGradient = darkMode ? darkGradient : lightGradient;
  
  const gradientStyle = {
    background: `linear-gradient(135deg, ${currentGradient.color1} 0%, ${currentGradient.color2} 30%, ${currentGradient.color3} 70%, ${currentGradient.color4} 100%)`,
    transition: 'background 0.5s ease'
  };
  
  // Toggle dark mode and scroll handling
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  const scrollToSection = (ref) => {
    setIsScrolling(true);
    ref.current.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };
  
  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      
      const scrollPosition = window.scrollY + 100;
      
      // Check which section is currently visible
      if (homeRef.current && scrollPosition >= homeRef.current.offsetTop && 
          scrollPosition < aboutRef.current.offsetTop) {
        setActiveSection('home');
      } else if (aboutRef.current && scrollPosition >= aboutRef.current.offsetTop && 
                scrollPosition < projectsRef.current.offsetTop) {
        setActiveSection('about');
      } else if (projectsRef.current && scrollPosition >= projectsRef.current.offsetTop && 
                scrollPosition < contactRef.current.offsetTop) {
        setActiveSection('projects');
      } else if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setActiveSection('contact');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);
  
  const handleFormSubmit = () => {
    console.log('Form submitted:', { formName, formEmail, formMessage });
    alert('Message sent! (This is a demo)');
    setFormName('');
    setFormEmail('');
    setFormMessage('');
  };
  
  return (
    <div 
      className={`flex flex-col min-h-screen overflow-x-hidden transition-colors duration-500 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}
      style={gradientStyle}
    >
      {/* Preloader */}
      {loading && <Preloader setLoading={setLoading} darkMode={darkMode} />}
      
      {/* Dark Mode Toggle */}
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Scroll to top button */}
<ScrollToTopButton homeRef={homeRef} darkMode={darkMode} isMobile={isMobile} />

      
      {/* Transparent Navigation that changes on scroll */}
<Navigation 
  activeSection={activeSection} 
  scrollToSection={scrollToSection} 
  navItems={navItems} 
  darkMode={darkMode} 
  isMobile={isMobile}
  projectsRef={projectsRef}
/>
      
      {/* Main Content */}
      <main className="flex-grow pt-1">
        {/* Enhanced Home Section with Better Visual Appeal */}
        <section 
          ref={homeRef} 
          className={`min-h-screen flex items-center px-4 py-16 overflow-hidden relative`}
          style={{
            background: darkMode 
              ? 'radial-gradient(circle at 30% 70%, rgba(30, 64, 175, 0.15), transparent 70%), radial-gradient(circle at 70% 30%, rgba(79, 70, 229, 0.15), transparent 70%)'
              : 'radial-gradient(circle at 30% 70%, rgba(219, 234, 254, 0.7), transparent 70%), radial-gradient(circle at 70% 30%, rgba(199, 210, 254, 0.7), transparent 70%)'
          }}
        >
          {/* Enhanced Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Larger, more vibrant background elements */}
            <div className={`absolute -top-40 -right-40 w-144 h-144 rounded-full ${darkMode ? 'bg-blue-900 bg-opacity-40' : 'bg-blue-500 bg-opacity-25'} blur-3xl animate-float-slow`}></div>
            <div className={`absolute top-1/3 -left-32 w-96 h-96 rounded-full ${darkMode ? 'bg-indigo-900 bg-opacity-40' : 'bg-indigo-500 bg-opacity-25'} blur-3xl animate-float-medium`}></div>
            <div className={`absolute bottom-1/4 right-1/5 w-112 h-112 rounded-full ${darkMode ? 'bg-cyan-900 bg-opacity-40' : 'bg-cyan-500 bg-opacity-25'} blur-3xl animate-float-fast`}></div>
            <div className={`absolute top-2/3 left-1/4 w-80 h-80 rounded-full ${darkMode ? 'bg-purple-900 bg-opacity-40' : 'bg-purple-500 bg-opacity-25'} blur-3xl animate-float-medium`}></div>
            
            {/* Additional elements for more visual interest */}
            <div className={`absolute top-1/2 right-1/3 w-64 h-64 rounded-full ${darkMode ? 'bg-blue-800 bg-opacity-30' : 'bg-blue-300 bg-opacity-30'} blur-3xl animate-pulse-slow`}></div>
            <div className={`absolute bottom-1/3 left-1/2 w-48 h-48 rounded-full ${darkMode ? 'bg-indigo-800 bg-opacity-30' : 'bg-indigo-300 bg-opacity-30'} blur-3xl animate-float-slow-reverse`}></div>
          </div>

          {/* Content Container - Mobile: Image on Top, Desktop: Image on LEFT */}
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center z-10 px-4">
            {/* PHOTO ON LEFT (Desktop) / TOP (Mobile) */}
            <div className="w-full order-first md:w-1/2 flex justify-center mb-16 md:mb-0 pt-8 md:pt-0"> {/* Added pt-8 on mobile, none on desktop */}
                <AnimatedText direction={isMobile ? "down" : "left"} delay={0}>
                    <div className="transform transition-transform duration-700 hover:scale-105 relative">
                    {/* Improved photo container - responsive sizing with circle on mobile */}
                    <div className={`relative ${
                        // Circular on mobile, rectangular with rounded corners on desktop
                        isMobile 
                        ? "w-64 h-64 rounded-full overflow-hidden" 
                        : "w-96 h-96 md:w-112 md:h-140" /* Fixed the height class from md:h-10 to md:h-140 */
                    }`} style={isMobile ? {} : { width: '28rem', height: '35rem' }}>
                    {/* Decorative elements - enhanced glow */}
                    <div className={`absolute -inset-1 ${
                      isMobile 
                        ? "rounded-full" 
                        : "rounded-xl"
                    } bg-gradient-to-r from-white-500 via-blue-400 to-white-400 blur-lg opacity-40 animate-pulse-slow`}></div>
                    
                    {/* Main image container */}
                    <div className={`relative bg-gradient-to-r from-white-600 to-white-400 p-1 ${
                      isMobile 
                        ? "rounded-full" 
                        : "rounded-xl"
                    } shadow-2xl z-10`}>
                      <div className={`w-full h-full overflow-hidden ${
                        isMobile 
                          ? "rounded-full" 
                          : "rounded-lg"
                      } relative group bg-white`}>
                        {/* Main image with correct path */}
                        <img 
                          src="/images/image.png" 
                          alt="Ray's Graduation Photo" 
                          className={`w-full h-full object-cover ${isMobile ? "object-top" : "object-center"} transition-transform duration-500 group-hover:scale-105`}
                          onError={(e) => {
                            // Fallback if image fails to load
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-200 ${isMobile ? "rounded-full" : ""}"><div class="text-6xl font-bold text-blue-500">R</div></div>`;
                          }}
                        />
                        
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-400 opacity-0 transition-opacity duration-500 group-hover:opacity-20"></div>
                      </div>
                    </div>
                    
                    {/* Decorative floating elements - enhanced */}
                    <div className="absolute -top-8 -right-8 w-20 h-20 bg-blue-500 rounded-full blur-md opacity-70 animate-float-medium"></div>
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-500 rounded-full blur-md opacity-70 animate-float-slow"></div>
                    <div className="absolute top-1/2 right-0 w-16 h-16 bg-cyan-400 rounded-full blur-md opacity-60 animate-float-fast"></div>
                  </div>
                </div>
              </AnimatedText>
            </div>
            
            {/* TEXT CONTENT ON RIGHT (Desktop) / BELOW (Mobile) */}
            <div className="w-full order-last md:w-1/2 text-center md:text-left">
              <AnimatedText direction={isMobile ? "up" : "right"} delay={1}>
                <div className="md:pl-12">
                  {/* Enhanced typography with attention-grabbing design */}
                  <div className="text-container relative mb-6">
                    {/* Small badge above name */}
                    {/* <div className={`inline-block px-4 py-1 mb-4 rounded-full text-sm font-semibold tracking-wide ${darkMode ? 'bg-blue-900 bg-opacity-50 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
                    FULL-STACK DEVELOPER
                    </div> */}
                    
                    {/* Two-part heading with enhanced styling */}
                    <div className="headings-container relative">
                      {/* Main name with enhanced breathing effect */}
                      <h1 className={`text-6xl sm:text-7xl md:text-8xl font-extrabold mb-4 block breathing-title tracking-tight ${darkMode ? 'text-white' : 'text-blue-900'}`} style={{ textShadow: darkMode ? '0 0 15px rgba(147, 197, 253, 0.5)' : '0 0 5px rgba(30, 64, 175, 0.2)' }}>
                        I'M RAY
                      </h1>
                      
                      {/* MOBILEDEVELOPER as one word with enhanced shimmer effect */}
                      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-10 block relative`}>
                        <span className="enhanced-shimmer block">
                            {isMobile ? (
                            <>
                                MOBILE
                                DEVELOPER
                            </>
                            ) : (
                            "MOBILE DEVELOPER"
                            )}
                        </span>
                        {/* Decorative accent line - hidden on mobile */}
                        <span className={`absolute -left-6 top-1/2 w-4 h-1 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded-full hidden md:block`}></span>
                        </h2>
                    </div>
                  </div>
                  
                  {/* Enhanced paragraph with slightly larger text and better line height - mobile responsive */}
                  <p className={`mb-6 ${darkMode ? 'text-blue-100' : 'text-blue-900'} leading-relaxed text-base md:text-lg lg:text-xl px-4 md:px-0`}>
                    Bachelor of Science in Computer Science graduate with hands-on experience in 
                    mobile app development using Java, Kotlin, and Android Studio.
                  </p>
                  
                  <p className={`${darkMode ? 'text-blue-100' : 'text-blue-900'} leading-relaxed text-base md:text-lg mb-8 px-4 md:px-0`}>
                    Skilled in building scalable applications, API integrations, and leveraging 
                    machine learning for enhanced mobile functionality.
                  </p>
                  
                  {/* Improved call-to-action with more prominent styling - mobile centered */}
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 px-4 md:px-0">
                <button 
                    onClick={() => scrollToSection(projectsRef)}
                    className={`${darkMode ? 'bg-blue-400 hover:bg-blue-500 ' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-lg flex items-center shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
                >
                    View My Work
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-y-1 animate-bounce-subtle" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                    </svg>
                </button>
                    
                    {/* Social media links alongside button - smaller on mobile */}
                    <div className="flex space-x-2 mt-4 md:mt-0">
                      <a href="https://web.facebook.com/ray.santos.189893/" className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-blue-500 shadow-md transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                        </svg>
                      </a>
                      <a href="https://web.facebook.com/ray.santos.189893/" className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-blue-400 shadow-md transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                      <a href="https://web.facebook.com/ray.santos.189893/" className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-blue-700 shadow-md transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedText>
            </div>
          </div>
        
  </section>

       
{/* Projects Section with Working Filter Buttons and Show More/Less functionality */}
<section 
  ref={projectsRef} 
  className={`flex items-center px-4 py-12 overflow-hidden relative transition-all duration-500`}
  style={{
    minHeight: visibleProjects && visibleProjects.length <= 2 ? '800px' : '1200px',
    background: darkMode 
      ? 'radial-gradient(circle at 30% 70%, rgba(30, 64, 175, 0.15), transparent 70%), radial-gradient(circle at 70% 30%, rgba(79, 70, 229, 0.15), transparent 70%)'
      : 'radial-gradient(circle at 30% 70%, rgba(219, 234, 254, 0.7), transparent 70%), radial-gradient(circle at 70% 30%, rgba(199, 210, 254, 0.7), transparent 70%)'
  }}
>
  {/* Background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className={`absolute -top-40 -right-40 w-144 h-144 rounded-full ${darkMode ? 'bg-blue-900 bg-opacity-40' : 'bg-blue-500 bg-opacity-25'} blur-3xl animate-float-slow`}></div>
    <div className={`absolute top-1/3 -left-32 w-96 h-96 rounded-full ${darkMode ? 'bg-indigo-900 bg-opacity-40' : 'bg-indigo-500 bg-opacity-25'} blur-3xl animate-float-medium`}></div>
    <div className={`absolute bottom-1/4 right-1/5 w-112 h-112 rounded-full ${darkMode ? 'bg-cyan-900 bg-opacity-40' : 'bg-cyan-500 bg-opacity-25'} blur-3xl animate-float-fast`}></div>
    <div className={`absolute top-2/3 left-1/4 w-80 h-80 rounded-full ${darkMode ? 'bg-purple-900 bg-opacity-40' : 'bg-purple-500 bg-opacity-25'} blur-3xl animate-float-medium`}></div>
    <div className={`absolute top-1/2 right-1/3 w-64 h-64 rounded-full ${darkMode ? 'bg-blue-800 bg-opacity-30' : 'bg-blue-300 bg-opacity-30'} blur-3xl animate-pulse-slow`}></div>
    <div className={`absolute bottom-1/3 left-1/2 w-48 h-48 rounded-full ${darkMode ? 'bg-indigo-800 bg-opacity-30' : 'bg-indigo-300 bg-opacity-30'} blur-3xl animate-float-slow-reverse`}></div>
  </div>
  
  <div className="w-full max-w-7xl mx-auto">
    <div className="text-center mb-8">
      <h2 className={`text-4xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} inline-block relative`}>
        Featured Projects
        <span className={`absolute -bottom-2 left-0 w-full h-1 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded`}></span>
      </h2>
      <p className={`${darkMode ? 'text-blue-200' : 'text-blue-800'} mt-4 max-w-3xl mx-auto`}>
        Here are some of my recent mobile and web development projects. Each one demonstrates different skills and technologies.
      </p>
      
      {/* Filter Buttons */}
    {/* Filter Buttons */}
<div className="mt-10 mb-10 overflow-x-auto whitespace-nowrap px-2 sm:px-0">
  <div className="inline-flex gap-3 sm:justify-center">
    <div 
      onClick={() => setActiveFilter('all')} 
      className={`inline-block px-6 py-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        activeFilter === 'all' 
          ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} shadow-lg` 
          : `${darkMode ? 'bg-gray-800 bg-opacity-70 text-blue-300' : 'bg-white bg-opacity-80 text-blue-600'} backdrop-filter backdrop-blur-sm shadow-md`
      }`}
    >
      All
    </div>
    <div 
      onClick={() => setActiveFilter('mobile')} 
      className={`inline-block px-6 py-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        activeFilter === 'mobile' 
          ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} shadow-lg` 
          : `${darkMode ? 'bg-gray-800 bg-opacity-70 text-blue-300' : 'bg-white bg-opacity-80 text-blue-600'} backdrop-filter backdrop-blur-sm shadow-md`
      }`}
    >
      Mobile
    </div>
    <div 
      onClick={() => setActiveFilter('website')} 
      className={`inline-block px-6 py-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        activeFilter === 'website' 
          ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} shadow-lg` 
          : `${darkMode ? 'bg-gray-800 bg-opacity-70 text-blue-300' : 'bg-white bg-opacity-80 text-blue-600'} backdrop-filter backdrop-blur-sm shadow-md`
      }`}
    >
      Website
    </div>
    <div 
      onClick={() => setActiveFilter('system')} 
      className={`inline-block px-6 py-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        activeFilter === 'system' 
          ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'} shadow-lg` 
          : `${darkMode ? 'bg-gray-800 bg-opacity-70 text-blue-300' : 'bg-white bg-opacity-80 text-blue-600'} backdrop-filter backdrop-blur-sm shadow-md`
      }`}
    >
      System
    </div>
  </div>
</div>
</div>
    
    {/* Projects Container */}
    <div className="transition-all duration-500" style={{ minHeight: visibleProjects && visibleProjects.length <= 2 ? '600px' : 'auto' }}> 
      {/* Updated grid classes for better responsive behavior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
        {/* Map through only the visible projects */}
        {visibleProjects && visibleProjects.map((project, index) => (
          <AnimatedText key={project.id} direction="up" delay={index * 0.5}>
            <div 
              className={`relative ${darkMode ? 'bg-gray-800 bg-opacity-70' : 'bg-white bg-opacity-80'} backdrop-filter backdrop-blur-sm rounded-xl overflow-visible shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl h-full`}
              style={{backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)'}}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Left side content */}
                <div className="p-5 w-full md:w-3/4 relative z-10">
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'} mb-2`}>
                    {project.title}
                  </h3>
                  <div className="mb-3">
                    <span className={`inline-block text-sm ${project.tagColor(darkMode)}`}>
                      {project.tagText}
                    </span>
                  </div>
                  
                  {/* Features with exactly 2 displayed with consistent height */}
                  {project.features.slice(0, 2).map((feature, i) => (
  <li key={i} className="flex items-start">
    <span className="text-lg mr-2 mt-1">{feature.icon}</span>
    <div className={`${darkMode ? 'text-blue-100' : 'text-blue-900'} min-h-16 flex flex-col justify-center`}>
      <p className="mb-1">
        <strong className="block">{feature.title}</strong>
        <span>{feature.description}</span>
      </p>
      <p className="text-xs opacity-0">Spacer</p>
    </div>
  </li>
))}

                  {/* Technology tags - simplified version */}
                  <div className="mt-3 mb-3">
                    <div className="flex flex-wrap gap-2 min-h-20">
                      {project.technologies.slice(0, 6).map((tech, i) => (
                        <span 
                          key={i} 
                          className={`inline-flex items-center gap-2 ${tech.color(darkMode)} text-xs px-3 py-1 rounded-full`}
                        >
                          {tech.iconPath && !isMobile && (
                            <img 
                              src={tech.iconPath} 
                              alt={`${tech.name} icon`} 
                              className="h-4 w-4 object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/icons/default-icon.png";
                              }}
                            />
                          )}
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Button instead of link */}
                  <button 
                    onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                    className={`
                      group 
                      inline-flex items-center 
                      px-5 py-2 mt-4
                      rounded-lg 
                      relative
                      overflow-hidden
                      ${darkMode ? 
                        'bg-blue-200 text-blue-800 hover:bg-blue-900 hover:bg-opacity-40 hover:text-green-200' : 
                        'bg-blue-500 text-white hover:bg-blue-900 hover:text-yellow-200'
                      } 
                      shadow-sm
                      transition-all duration-300 
                      transform hover:scale-105 hover:shadow-md
                    `}
                  >
                    {/* Shimmer effect */}
                    <span 
                      className="absolute top-0 left-0 w-full h-full bg-white opacity-20
                      transform -translate-x-full skew-x-12
                      animate-shimmer-continuous
                      pointer-events-none"
                    ></span>
                    
                    <span className="font-medium relative z-10">View Project</span>
                    <span 
                      className={`
                        ml-2 w-5 h-5 rounded-full 
                        ${darkMode ? 'bg-blue-500' : 'bg-blue-400'} 
                        flex items-center justify-center 
                        transition-all duration-300 
                        transform group-hover:translate-x-2
                        relative z-10
                        animate-pulse-subtle
                      `}
                    >
                      <svg 
                        className="w-3 h-3 text-white animate-arrow-move" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </span>
                  </button>
                </div>

                {/* Image - Show on tablet and above (md+), hide on mobile */}
{!isMobile && (
  <div
    className="absolute top-1/2 transform -translate-y-1/2 rotate-6"
    style={{
      ...({
        "/images/iskoyanlaptop1.png": {
          right: window.innerWidth < 1024 ? "-290px" : "-320px",
          width: window.innerWidth < 1024 ? "75%" : "105%",
        },
        "/images/attendancefs1.png": {
          right: window.innerWidth < 1024 ? "-290px" : "-320px",
          width: window.innerWidth < 1024 ? "75%" : "105%",
        },
        "/images/ecposlaptop1.png": {
          right: window.innerWidth < 1024 ? "-290px" : "-320px",
          width: window.innerWidth < 1024 ? "75%" : "105%",
        },
      }[project.imagePath] || {
        right: window.innerWidth < 1024 ? "-350px" : "-350px",
        width: window.innerWidth < 1024 ? "100%" : "135%",
        zIndex: 30,
      }),
    }}
  >
    <img
      src={project.imagePath}
      alt={project.title}
      className="h-auto transform hover:rotate-0 transition-all duration-300"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/images/default-phone.png";
      }}
    />
  </div>
)}
              </div>
            </div>
          </AnimatedText>
        ))}
      </div>
      
      {/* Show More/Less Button */}
      {filteredProjects && filteredProjects.length > initialLimit && (
        <div className="flex justify-center mt-12">
          <button
            onClick={toggleShowMore}
            className={`
              px-8 py-3 rounded-full 
              ${darkMode ? 
                'bg-blue-600 hover:bg-blue-700 text-white' : 
                'bg-blue-600 hover:bg-blue-700 text-white'
              }
              transition-all duration-300 transform hover:scale-105 shadow-lg
              flex items-center space-x-2
            `}
          >
            <span>{showAll ? 'Show Less' : 'Show More'}</span>
            {showAll ? (
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  </div>

  {/* Project Modal */}
  {selectedProject && (
    <ProjectModal 
      project={selectedProject} 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      darkMode={darkMode} 
    />
  )}
</section>
         {/* About Section */}

{/* About Section with Resume Data */}
<section 
  ref={aboutRef} 
  className={`min-h-screen py-24 px-4 ${darkMode ? 'bg-gray-900 bg-opacity-20' : 'bg-white bg-opacity-70'} backdrop-filter backdrop-blur-sm`}
>
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className={`text-4xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} inline-block relative`}>
        About Me
        <span className={`absolute -bottom-2 left-0 w-full h-1 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded`}></span>
      </h2>
      <p className={`${darkMode ? 'text-blue-200' : 'text-blue-800'} mt-6 max-w-2xl mx-auto`}>
        Mobile developer with a strong foundation in computer science and a passion for building innovative applications that solve real-world problems.
      </p>
    </div>
    
    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
      
     {/* Column 1: Personal Info */}
 {/* Column 1: Personal Info */}
 <AnimatedText direction="left" delay={0}>
    <div className={`${darkMode ? 'bg-gray-800 bg-opacity-70' : 'bg-white bg-opacity-80'} backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-xl h-full transform transition-all duration-500 hover:scale-105 space-y-8`}>
      
      {/* Header with Name and Photo */}
      <div className={`${darkMode ? 'bg-gray-700 bg-opacity-40' : 'bg-blue-50'} p-10 rounded-lg`}>
  <div className="text-center">
    <h1
      className={`
        text-3xl sm:text-4xl md:text-4xl font-extrabold enhanced-shimmer block
        ${darkMode ? 'text-white' : 'text-blue-900'}
      `}
      style={{
        textShadow: darkMode
          ? '0 0 15px rgba(147, 197, 253, 0.5)'
          : '0 0 5px rgba(30, 64, 175, 0.2)'
      }}
    >
      RAY CHRISTIAN SANTOS
    </h1>
  </div>
</div>

          
        {/* Objective Section */}
        <div>
          {/* <div className={`${darkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-100'} p-5 rounded-lg ${darkMode ? 'text-blue-100' : 'text-gray-700'} space-y-4 leading-relaxed`}> */}
          <div className={`${darkMode ? 'bg-gray-700 bg-opacity-40' : 'bg-blue-50'} p-5 rounded-lg`}>
            <h3 className={`text-lg font-bold mb-4 pb-2 border-b ${darkMode ? 'border-gray-600 text-blue-300' : 'border-blue-200 text-blue-700'}`}>
             OBJECTIVE
            </h3>
            <div className="space-y-4">
            <p>
              Bachelor of Science in Computer Science graduate with hands-on experience in mobile app development using Java, Kotlin, and Android Studio.
            
              Skilled in building scalable applications, API integration, and leveraging machine learning for enhanced mobile functionality.
            
              Seeking a Mobile Developer position to apply my technical expertise in creating innovative, user-centric solutions that solve real-world problems.
            </p>
          </div>
          </div>
        </div>
        {/* Combined Contact Info and Core Technical Skills - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Contact Information */}
          <div className={`${darkMode ? 'bg-gray-700 bg-opacity-40' : 'bg-blue-50'} p-5 rounded-lg`}>
            <h3 className={`text-lg font-bold mb-4 pb-2 border-b ${darkMode ? 'border-gray-600 text-blue-300' : 'border-blue-200 text-blue-700'}`}>
              Contact Information
            </h3>
            <div className="space-y-4">
              {/* Location */}
              <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Location</div>
                  <div className={`${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>Sapang Tagalog, Tarlac City</div>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</div>
                  <div className={`${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>qqqraysantos@gmail.com</div>
                </div>
              </div>
              
              {/* GitHub */}
              <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>GitHub</div>
                  <div className={`${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>github.com/Raysantos22</div>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</div>
                  <div className={`${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>09941173418</div>
                </div>
              </div>
              
              {/* Birthday */}
              <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path>
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Birthday</div>
                  <div className={`${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>May 22, 2001</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* RIGHT: Core Technical Skills */}
          <div className={`${darkMode ? 'bg-gray-700 bg-opacity-40' : 'bg-blue-50'} p-5 rounded-lg`}>
            <h3 className={`text-lg font-bold mb-4 pb-2 border-b ${darkMode ? 'border-gray-600 text-blue-300' : 'border-blue-200 text-blue-700'}`}>
              Core Technical Skills
            </h3>
            <div className="space-y-4">
              {/* Mobile Development */}
              <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Mobile Development</div>
                  <div className={`${darkMode ? 'text-blue-100' : 'text-blue-900'} text-sm`}>Android, Java, Kotlin</div>
                </div>
              </div>
                            {/* Web development*/}

                <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-yellow-900 bg-opacity-50' : 'bg-yellow-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-5 14H4v-4h11zm0-5H4V9h11zm5 5h-4V9h4z"  />
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Web Development</div>
                  <div className={`${darkMode ? 'text-yellow-100' : 'text-yellow-900'} text-sm`}> Html, CSS, TailWind,Javascript, <br></br> React, Laravel (Php), Python</div>
                </div>
              </div>
                              
              {/* System development*/}
              <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-red-900 bg-opacity-50' : 'bg-red-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-red-300' : 'text-red-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-5 14H4v-4h11zm0-5H4V9h11zm5 5h-4V9h4z"  />
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>System Development</div>
                  <div className={`${darkMode ? 'text-red-100' : 'text-red-900'} text-sm`}>Python, Java</div>
                </div>
              </div>
              {/* Machine Learning */}
              <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-green-900 bg-opacity-50' : 'bg-green-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-green-300' : 'text-green-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Machine Learning</div>
                  <div className={`${darkMode ? 'text-green-100' : 'text-green-900'} text-sm`}>TensorFlow, PyTorch, OpenCV</div>
                </div>
              </div>
              
              {/* API Integration */}
              <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-purple-900 bg-opacity-50' : 'bg-purple-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>API Integration</div>
                  <div className={`${darkMode ? 'text-purple-100' : 'text-purple-900'} text-sm`}>RESTful, NodeJS, Firebase</div>
                </div>
              </div>
              
              {/* UI/UX Design */}
              <div className="flex items-center">
                <div className={`w-9 h-9 rounded-lg ${darkMode ? 'bg-indigo-900 bg-opacity-50' : 'bg-indigo-100'} flex items-center justify-center mr-3`}>
                  <svg className={`w-4 h-4 ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <div className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Database Integration</div>
                  <div className={`${darkMode ? 'text-indigo-100' : 'text-indigo-900'} text-sm`}>MySQL, Room Database, SQL, SQLite, MongoDB
                  </div>
                </div>
              </div>
              
              {/* Additional empty space to match height */}
              <div className="h-4"></div>
            </div>
          </div>
        </div>
        {/* Tech Stack Section - Centered and Using Icons */}
     {/* Tech Stack Section */}
         {/* Download CV Button */}
    <div className="flex justify-center mt-12">
      <AnimatedText direction="up" delay={0.8}>
        <a 
          href="images/csvray1.pdf" 
          className={`px-8 py-3 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold flex items-center space-x-2 transform transition-all duration-300 hover:scale-105 shadow-lg`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download CV</span>
        </a>
      </AnimatedText>
    </div>

</div>
    </AnimatedText>
      
      {/* Column 2: Education & Experience */}
       <AnimatedText direction="right" delay={0.4}>
        <div className={`${darkMode ? 'bg-gray-800 bg-opacity-70' : 'bg-white bg-opacity-80'} backdrop-filter backdrop-blur-sm p-6 rounded-xl shadow-xl h-full transform transition-all duration-500 hover:scale-105`}>
          {/* Education */}
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-blue-300' : 'text-blue-700'} flex items-center`}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            Education
          </h3>
          
          <div className="space-y-5 mb-8 relative">
            {/* Vertical timeline line */}
            <div className={`absolute left-3 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-blue-500 bg-opacity-30' : 'bg-blue-400 bg-opacity-30'}`}></div>
            
            <div className="ml-10 relative">
              {/* Timeline dot */}
              <div className={`absolute -left-7 top-1.5 w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'}`}></div>
              
              <h4 className={`font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Bachelor of Science in Computer Science
              </h4>
              <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                Tarlac State University
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                2020 - 2024
              </div>
              <div className={`text-xs italic ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                Winner of TSU 2024 Best Thesis Award in BSCS
              </div>
            </div>
            
            <div className="ml-10 relative">
              <div className={`absolute -left-7 top-1.5 w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'}`}></div>
              
              <h4 className={`font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                STI College Tarlac
              </h4>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                2018 - 2020
              </div>
            </div>
            
            <div className="ml-10 relative">
              <div className={`absolute -left-7 top-1.5 w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'}`}></div>
              
              <h4 className={`font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Maligaya Trinity Baptist Christian Academy
              </h4>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                2008 - 2018
              </div>
            </div>
          </div>
          
          {/* Experience */}
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-blue-300' : 'text-blue-700'} flex items-center`}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Experience
          </h3>
          
          <div className="space-y-6 relative">
            {/* Vertical timeline line */}
            <div className={`absolute left-3 top-0 bottom-0 w-0.5 ${darkMode ? 'bg-blue-500 bg-opacity-30' : 'bg-blue-400 bg-opacity-30'}`}></div>
            
            <div className="ml-10 relative">
              <div className={`absolute -left-7 top-1.5 w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'}`}></div>
              
              <h4 className={`font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                ELJIN CORPORATION (BW SUPERBAKESHOP)
              </h4>
              <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'} mb-1`}>
                IT Developer
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                SEPTEMBER 2024 - PRESENT
              </div>
              <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-gray-700'}`}>
                Developed and implemented ECPOS, an in-house Point of Sale system for 50 stores with inventory management, sales reporting, and customer loyalty programs.
              </p>
            </div>
            
            <div className="ml-10 relative">
              <div className={`absolute -left-7 top-1.5 w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'}`}></div>
              
              <h4 className={`font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Kaizenaire Outsourcing and Offshoring Consulting
              </h4>
              <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'} mb-1`}>
                Graphic Designer & Web Developer
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                JULY 2023
              </div>
              <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-gray-700'}`}>
                Created visual assets and implemented web solutions, collaborating with cross-functional teams.
              </p>
            </div>
            
            <div className="ml-10 relative">
              <div className={`absolute -left-7 top-1.5 w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-500'}`}></div>
              
              <h4 className={`font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                Tarlac City Health Office
              </h4>
              <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'} mb-1`}>
                Office Assistant
              </div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                FEBRUARY 2020
              </div>
            </div>
            </div>
        </div>
      </AnimatedText>
    </div>
   {/* Tech Stack Section - Enhanced */}

{/* Tech Stack Section - Enhanced with Dark Mode Support */}
<div className="text-center py-16 relative overflow-hidden">
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
    <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-green-600 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
    <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-yellow-600 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-3000"></div>
  </div>
    
  <h2 className={`text-5xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-2 relative z-10`}>
    Tech Stack
  </h2>
  <div className={`w-32 h-1 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} mx-auto mb-8 rounded-full`}></div>
  <p className={`max-w-2xl mx-auto ${darkMode ? 'text-blue-300' : 'text-blue-700'} mb-12 relative z-10 text-lg`}>
    Technologies and tools I've worked with throughout my development journey
  </p>
  
  {/* Main Tech Grid - Now with enhanced animations and 6 columns */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 max-w-6xl mx-auto relative z-10">
     {/* Kotlin */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-purple-500 to-purple-700">
        <img src="/images/kotlin.png" alt="Kotlin" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">90%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '98%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Kotlin</span>
    </div>
        {/* Java */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-indigo-600 to-indigo-800">
        <img src="/images/java.png" alt="Java" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">80%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '95%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Java</span>
    </div>
      {/* Python */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-blue-500 to-indigo-600">
        <img src="/images/python.png" alt="Python" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">80%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '88%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Python</span>
    </div>
        {/* Laravel */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-red-500 to-red-700">
        <img src="/images/laravel.png" alt="Laravel" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">80 %</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '79%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Laravel</span>
    </div>
        {/* PHP */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-indigo-400 to-indigo-600">
        <img src="/images/php.png" alt="PHP" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">80%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '80%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">PHP</span>
    </div>
        
    {/* React */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-blue-400 to-blue-600">
        <img src="/images/react.png" alt="React" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          
          <span className="rating-value">60%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '87%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">React</span>
    </div>


    
    {/* HTML */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-orange-500 to-orange-700">
        <img src="/images/html.png" alt="HTML" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
        {/* <svg className={`w-10 h-10 ${darkMode ? 'text-green-300' : 'text-green-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg> */}
          <span className="rating-value">85%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '95%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">HTML</span>
    </div>
    
    {/* CSS */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-blue-500 to-blue-700">
        <img src="/images/css3.png" alt="CSS" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">85%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '90%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">CSS</span>
    </div>
     {/* Tailwind */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-cyan-500 to-cyan-700">
        <img src="/images/tailwind.png" alt="Tailwind CSS" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">85%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '88%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Tailwind CSS</span>
    </div>
    {/* JavaScript */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-yellow-400 to-yellow-600">
        <img src="/images/javascriptlogo.png" alt="JavaScript" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">85%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '85%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">JavaScript</span>
    </div>
            {/* Node */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-green-600 to-green-800">
        <img src="/images/node.png" alt="Node JS" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">70%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '80%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Node JS</span>
    </div>
   
    
    {/* Express */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-purple-600 to-purple-800">
        <img src="/images/express.png" alt="Express JS" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">50%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '82%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Express JS</span>
    </div>
    
  {/* MySQL */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-blue-300 to-blue-500">
        <img src="/images/mysql.png" alt="MySQL" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">85%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '86%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">MySQL</span>
    </div>
    
    {/* Room DB */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-blue-700 to-blue-900 ">
        
        <img src="/images/roomdb1.jpg" alt="Room DB" className="tech-icon"/>
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">86%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '92%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Room DB</span>
    </div>
    
     {/* SQLite */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-blue-600 to-blue-800">
        <img src="/images/sqlite.png" alt="SQLite" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">90%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '89%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">SQLite</span>
    </div>
        
    {/* Firebase */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-yellow-600 to-amber-700">
        <img src="/images/firebase.png" alt="Firebase" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">90%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '85%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Firebase</span>
    </div>
    
    {/* MongoDB */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-green-700 to-green-900">
        <img src="/images/mongo.png" alt="MongoDB" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">50%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '78%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">MongoDB</span>
    </div>
    

    
   
    {/* Docker */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-blue-500 to-blue-700">
        <img src="/images/docker.png" alt="Docker" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">50%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '75%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Docker</span>
    </div>
    

    
    {/* Git */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-blue-800 to-indigo-900">
        <img src="/images/git.png" alt="Git" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">50%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '88%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Git</span>
    </div>

  
    {/* TensorFlow */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-orange-500 to-orange-700">
        <img src="/images/tensorflow.png" alt="TensorFlow" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">70%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '78%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">TensorFlow</span>
    </div>
    
    {/* PyTorch */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-red-600 to-red-800">
        <img src="/images/pytorch.png" alt="PyTorch" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">70%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '74%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">PyTorch</span>
    </div>
    
  {/* OpenCV */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-green-600 to-green-800">
        <img src="/images/opencv.png" alt="OpenCV" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">70%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '83%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">OpenCV</span>
    </div>
    
    
    
    {/* Postman */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-purple-400 to-purple-600">
        <img src="/images/postman.png" alt="Postman" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">80%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '91%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Postman</span>
    </div>

    {/* Android Studio */}
    <div className="tech-card group">
      <div className="tech-icon-container bg-gradient-to-br from-green-500 to-green-700">
        <img src="/images/androidstudio.png" alt="Android Studio" className="tech-icon" />
        
        {/* Rating that appears on hover */}
        <div className="tech-rating">
          <span className="rating-value">95%</span>
          <div className="rating-bar">
            <div className="rating-fill" style={{width: '96%'}}></div>
          </div>
        </div>
      </div>
      <span className="tech-label">Android Studio</span>
    </div>
    
    
   
  </div>
</div>
  {/* Add CSS styles */}
  <style jsx>{`
    /* Floating animation for the cards */
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    
    .animate-blob {
      animation: blob 7s infinite;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .animation-delay-3000 {
      animation-delay: 3s;
    }
    
    .animation-delay-4000 {
      animation-delay: 4s;
    }
    
    /* Tech card styling */
    .tech-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.3s ease;
      margin: 0.5rem;
      transform: translateY(0);
      animation: float 6s ease-in-out infinite;
      animation-delay: calc(var(--animation-order, 0) * 0.2s);
    }
    
    .tech-card:hover {
      transform: translateY(-10px);
    }
    
    /* Apply sequential animations */
    .tech-card:nth-child(1) { --animation-order: 1; }
    .tech-card:nth-child(2) { --animation-order: 2; }
    .tech-card:nth-child(3) { --animation-order: 3; }
    .tech-card:nth-child(4) { --animation-order: 4; }
    .tech-card:nth-child(5) { --animation-order: 5; }
    .tech-card:nth-child(6) { --animation-order: 6; }
    .tech-card:nth-child(7) { --animation-order: 7; }
    .tech-card:nth-child(8) { --animation-order: 8; }
    .tech-card:nth-child(9) { --animation-order: 9; }
    .tech-card:nth-child(10) { --animation-order: 10; }
    
    /* Icon container styling */
    .tech-icon-container {
      width: 8rem;
      height: 8rem;
      border-radius: 1rem;
      display: flex;
      align-items: center;
    
      justify-content: center;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      margin-bottom: 0.75rem;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .tech-icon-container::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0) 80%
      );
      transform: rotate(45deg);
      transition: all 0.6s ease;
      opacity: 0;
    }
    
    .tech-card:hover .tech-icon-container::before {
      opacity: 1;
      transform: rotate(45deg) translate(0, 0);
      animation: shine 1.5s;
    }
    
    @keyframes shine {
      0% {
        transform: rotate(45deg) translateY(-120%);
      }
      100% {
        transform: rotate(45deg) translateY(120%);
      }
    }
    //icon here
    .tech-card:hover .tech-icon-container {
      transform: scale(1.2);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    /* Icon styling */
    .tech-icon {
      width: 60%;
      height: 60%;
      object-fit: contain;
      filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));
      transition: all 0.3s ease;
    }
    
    .tech-card:hover .tech-icon {
      transform: scale(0.8);
      opacity: 0.8;
      
    }
    
    /* Label styling */
    .tech-label {
      font-size: 1rem;
      font-weight: 500;
      color: ${darkMode ? 'white' : 'black'}; /* gray-300 in dark mode, gray-600 in light mode */
      margin-top: 0.5rem;
      transition: all 0.3s ease;
    }
    
    .tech-card:hover .tech-label {
      color: ${darkMode ? '#93c5fd' : '#3b82f6'}; /* blue-300 in dark mode, blue-500 in light mode */
      transform: scale(1.05);
  
    }
    
    /* Floating animation */
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    
    /* Rating system styles */
    .tech-rating {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.75);
      opacity: 0;
      transition: all 0.3s ease;
      border-radius: 1rem;
      padding: 0.5rem;
    }
    
    .tech-card:hover .tech-rating {
      opacity: 1;
    }
    
    .rating-value {
      color: white;
      font-weight: bold;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    
    .rating-bar {
      width: 80%;
      height: 0.5rem;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 1rem;
      overflow: hidden;
    }
    
    .rating-fill {
      height: 100%;
      background: linear-gradient(to right, #3b82f6, #60a5fa);
      border-radius: 1rem;
      transition: width 0.5s ease-out;
    }
  `}</style>
</div>
</section>

  {/* Contact Section */}
<section 
  ref={contactRef} 
  className={`min-h-screen py-24 px-4 ${darkMode ? 'bg-gray-900 bg-opacity-30' : 'bg-white bg-opacity-70'} backdrop-filter backdrop-blur-sm`}
>
  <div className="max-w-5xl mx-auto">
    <div className="text-center mb-16">
      <h2 className={`text-4xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} inline-block relative`}>
        Get In Touch
        <span className={`absolute -bottom-2 left-0 w-full h-1 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded`}></span>
      </h2>
      <p className={`${darkMode ? 'text-blue-200' : 'text-blue-800'} mt-6 max-w-2xl mx-auto`}>
        Interested in working together? Feel free to contact me for any project or collaboration.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <AnimatedText direction="left" delay={0}>
        <div className={`${darkMode ? 'bg-gray-800 bg-opacity-70' : 'bg-white bg-opacity-80'} backdrop-filter backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105`}>
          <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Contact Information</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-blue-600 bg-opacity-20' : 'bg-blue-500 bg-opacity-20'} flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className={`text-lg font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>Email</h4>
                <p className={`${darkMode ? 'text-blue-100' : 'text-blue-900'} mt-1`}>qqqraysantos@example.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-blue-600 bg-opacity-20' : 'bg-blue-500 bg-opacity-20'} flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className={`text-lg font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>Phone</h4>
                <p className={`${darkMode ? 'text-blue-100' : 'text-blue-900'} mt-1`}>+63 9941173418</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-blue-600 bg-opacity-20' : 'bg-blue-500 bg-opacity-20'} flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className={`text-lg font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>Location</h4>
                <p className={`${darkMode ? 'text-blue-100' : 'text-blue-900'} mt-1`}>Sapang Tagalog, Tarlac City,Tarlac</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-blue-600 bg-opacity-20' : 'bg-blue-500 bg-opacity-20'} flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className={`text-lg font-semibold ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>Availability</h4>
                <p className={`${darkMode ? 'text-blue-100' : 'text-blue-900'} mt-1`}>Weekdays 9:00 AM - 6:00 PM (UTC+8)</p>
              </div>
            </div>
          </div>
          
          <h3 className={`text-2xl font-bold my-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Connect With Me</h3>
          <div className="flex space-x-4">
            <a 
              href="https://web.facebook.com/ray.santos.189893/" 
              className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-blue-600' : 'bg-gray-200 hover:bg-blue-600'} flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-white'}`}
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
            <a 
              href="https://web.facebook.com/ray.santos.189893/" 
              className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-blue-400' : 'bg-gray-200 hover:bg-blue-400'} flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-white'}`}
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a 
              href="https://web.facebook.com/ray.santos.189893/" 
              className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-blue-700' : 'bg-gray-200 hover:bg-blue-700'} flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-white'}`}
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a 
              href="https://web.facebook.com/ray.santos.189893/" 
              className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-900' : 'bg-gray-200 hover:bg-gray-800'} flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-6 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-white'}`}
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </AnimatedText>
      
      <AnimatedText direction="right" delay={0}>
        <div className={`${darkMode ? 'bg-gray-800 bg-opacity-70' : 'bg-white bg-opacity-80'} backdrop-filter backdrop-blur-sm p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105`}>
          <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Send a Message</h3>
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-700'} mb-2`}>Name</label>
              <input 
                type="text" 
                className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-700'} mb-2`}>Email</label>
              <input 
                type="email" 
                className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-blue-200' : 'text-blue-700'} mb-2`}>Message</label>
              <textarea 
                className={`w-full px-4 py-3 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-36 resize-none`}
                placeholder="Your message"
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
              ></textarea>
            </div>
            <button 
              // onClick={handleFormSubmit} 
              className={`w-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105 flex items-center justify-center group`}
            >
              Send Message
              <svg className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </AnimatedText>
    </div>

    {/* FAQ Section */}
    {/* <div className="mt-16">
      <h3 className={`text-2xl font-bold mb-8 text-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Frequently Asked Questions</h3>
      <div className={`${darkMode ? 'bg-gray-800 bg-opacity-70' : 'bg-white bg-opacity-80'} backdrop-filter backdrop-blur-sm rounded-xl overflow-hidden shadow-xl`}>
        <AnimatedText direction="up" delay={0}>
          <div className="border-b border-gray-700">
            <button className="w-full px-6 py-4 text-left focus:outline-none">
              <div className="flex items-center justify-between">
                <h4 className={`text-lg font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>What services do you offer?</h4>
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>+</span>
              </div>
              <div className={`mt-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                I specialize in mobile application development, focusing on Android and cross-platform solutions. My services include app development, UI/UX design, API integration, and app maintenance/updates.
              </div>
            </button>
          </div>
        </AnimatedText>

        <AnimatedText direction="up" delay={1}>
          <div className="border-b border-gray-700">
            <button className="w-full px-6 py-4 text-left focus:outline-none">
              <div className="flex items-center justify-between">
                <h4 className={`text-lg font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>What is your development process?</h4>
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>+</span>
              </div>
              <div className={`mt-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                My development process includes requirement gathering, planning, design, development, testing, deployment, and maintenance. I believe in an iterative approach with regular client feedback throughout the development lifecycle.
              </div>
            </button>
          </div>
        </AnimatedText>

        <AnimatedText direction="up" delay={2}>
          <div>
            <button className="w-full px-6 py-4 text-left focus:outline-none">
              <div className="flex items-center justify-between">
                <h4 className={`text-lg font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>How long does it take to develop an app?</h4>
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>+</span>
              </div>
              <div className={`mt-2 ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                The timeline varies based on the complexity and features required. A simple app might take 2-3 months, while a more complex one could take 4-6 months or longer. I'll provide a more specific timeline after understanding your project requirements.
              </div>
            </button>
          </div>
        </AnimatedText>
      </div>
    </div> */}
  </div>
</section>
      </main>
      
     {/* Footer */}
<footer className={`${darkMode ? 'bg-gray-900' : 'bg-blue-900'} text-white py-8`}>
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      {/* Logo and Brief Description */}
      <div className="col-span-1 md:col-span-1">
        <a 
          onClick={() => scrollToSection(homeRef)} 
          className="inline-block cursor-pointer mb-4"
        >
          <div className={`w-12 h-12 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110`}>
            <span className="text-white text-xl font-bold">R</span>
          </div>
        </a>
        <p className="text-gray-400 text-sm mt-4">
          Mobile developer with a passion for creating intuitive, 
          user-friendly applications that solve real-world problems.
        </p>
      </div>

      {/* Quick Links */}
      <div className="col-span-1">
        <h3 className="text-lg font-bold mb-4 text-blue-300">Quick Links</h3>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                onClick={() => scrollToSection(item.ref)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div className="col-span-1">
        <h3 className="text-lg font-bold mb-4 text-blue-300">Services</h3>
        <ul className="space-y-2 text-sm">
          <li className="text-gray-400">Mobile App Development</li>
          <li className="text-gray-400">UI/UX Design</li>
          <li className="text-gray-400">API Integration</li>
          <li className="text-gray-400">Cross-Platform Solutions</li>
          <li className="text-gray-400">App Maintenance</li>
        </ul>
      </div>

      {/* Newsletter */}
      <div className="col-span-1 md:col-span-1">
        <h3 className="text-lg font-bold mb-4 text-blue-300">Stay Updated</h3>
        <p className="text-gray-400 text-sm mb-4">
          Subscribe to my newsletter for latest updates and tech articles.
        </p>
        <div className="flex">
          <input
            type="email"
            placeholder="Your email"
            className="py-2 px-3 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-sm"
          />
          <button className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 rounded-r-lg transition-colors duration-300`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className={`w-full h-px bg-gray-700 my-6`}></div>

    {/* Copyright and Social Links */}
    <div className="flex flex-col md:flex-row justify-between items-center">
      <p className="text-gray-400 text-sm">
        © {new Date().getFullYear()} Ray | Mobile Developer. All rights reserved.
      </p>
      
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-300`} aria-label="Facebook">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
          </svg>
        </a>
        <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-300`} aria-label="Twitter">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
        </a>
        <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-300`} aria-label="LinkedIn">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-300 hover:text-blue-300'} transition-colors duration-300`} aria-label="GitHub">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      @keyframes shimmer-continuous {
    0% {
      transform: translateX(-100%) skewX(-15deg);
    }
    100% {
      transform: translateX(100%) skewX(-15deg);
    }
  }
  
  .animate-shimmer-continuous {
    animation: shimmer-continuous 2.5s ease-in-out infinite;
  }
  
  @keyframes pulse-subtle {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(3px);
    }
  }
  
  .animate-pulse-subtle {
    animation: pulse-subtle 1.5s ease-in-out infinite;
  }
  
  @keyframes arrow-move {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(2px);
    }
  }
  
  .animate-arrow-move {
    animation: arrow-move 1s ease-in-out infinite;
  }
  
  /* Make animations more pronounced on hover */
  .group:hover .animate-pulse-subtle {
    animation-duration: 0.8s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .group:hover .animate-arrow-move {
    animation-duration: 0.6s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
        /* Existing animations */
          @keyframes bounce-subtle {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(4px);
    }
  }
  
  .animate-bounce-subtle {
    animation: bounce-subtle 2s ease-in-out infinite;
  }
  
  /* Speed up animation on hover */
  .group:hover .animate-bounce-subtle {
    animation: bounce-subtle 1s ease-in-out infinite;
  }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes animate-loading-bar {
          0% { width: 0%; }
          20% { width: 20%; }
          40% { width: 40%; }
          60% { width: 60%; }
          80% { width: 80%; }
          100% { width: 100%; }
        }
        
        .animate-loading-bar {
          animation: animate-loading-bar 1.5s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        /* Enhanced animations for background elements */
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(25px, -15px); }
          50% { transform: translate(20px, -30px); }
          75% { transform: translate(-5px, -15px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-20px, 20px); }
          66% { transform: translate(10px, 25px); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, 15px); }
        }

        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-25px, -25px); }
        }

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 9s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 6s ease-in-out infinite;
        }

        .animate-float-slow-reverse {
          animation: float-slow-reverse 10s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Enhanced breathing animation for "I'M RAY" */
        @keyframes gentle-breathing {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.95;
          }
        }
          
        .breathing-title {
          animation: gentle-breathing 3s ease-in-out infinite;
          transform-origin: left center;
        }
          
        /* Enhanced shimmer effect for "MOBILE DEVELOPER" */
        .enhanced-shimmer {
        display: inline-block;
        position: relative;
        background: ${darkMode 
            ? 'linear-gradient(to right, #60a5fa 20%, #ffffff 40%, #ffffff 60%, #60a5fa 80%)' 
            : 'linear-gradient(to right, #1e40af 20%, #3b82f6 40%, #3b82f6 60%, #1e40af 80%)'};
        background-size: 200% auto;
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 2s linear infinite;
        width: 100%; /* Ensure it covers the full width for proper line breaks */
        }

        @keyframes shimmer {
        to {
            background-position: 200% center;
        }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;