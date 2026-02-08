import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import ProblemSolving from './components/ProblemSolving'
import Experience from './components/Experience'
import Education from './components/Education'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true)

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 divide-y divide-gray-200 dark:divide-gray-800">
                <section id="hero" className="py-20">
                    <Hero />
                </section>

                <section id="about" className="py-20">
                    <About />
                </section>

                <section id="skills" className="py-20">
                    <TechStack />
                </section>

                <section id="achievements" className="py-20">
                    <ProblemSolving />
                </section>

                <section id="experience" className="py-20">
                    <Experience />
                </section>

                <section id="education" className="py-20">
                    <Education />
                </section>

                <section id="projects" className="py-20">
                    <Projects />
                </section>

                <section id="contact" className="py-20">
                    <Contact />
                </section>
            </main>

            <footer className="py-10 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
                <p>© {new Date().getFullYear()} Mishu Rahman. Built with React & Tailwind.</p>
            </footer>
        </div>
    )
}

export default App
