// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  updateYear()
  initTypewriter()
  initProjectFilters()
  initModal()
  initScrollAnimations()
  initSkillBars()
  initSmoothScroll()
}

// ===== ATUALIZAR ANO =====
function updateYear() {
  const yearElement = document.getElementById("year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }
}

// ===== EFEITO TYPEWRITER =====
function initTypewriter() {
  const phrases = [
    "Desenvolvo soluções inovadoras",
    "Escrevo código limpo e eficiente",
    "Apaixonada por tecnologia",
    "Estudante de Engenharia da Computação",
  ]

  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  const typedElement = document.getElementById("typed")

  if (!typedElement) return

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      typedElement.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
    } else {
      typedElement.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000 // Pausa no final
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typeSpeed = 500 // Pausa antes da próxima frase
    }

    setTimeout(typeWriter, typeSpeed)
  }

  typeWriter()
}

// ===== FILTROS DE PROJETOS =====
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".chip")
  const projects = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")

      const filter = button.dataset.filter

      projects.forEach((project) => {
        if (filter === "all" || project.dataset.cat === filter) {
          project.style.display = "block"
          project.style.animation = "fadeInUp 0.5s ease-out"
        } else {
          project.style.display = "none"
        }
      })
    })
  })
}

// ===== MODAL =====
function initModal() {
  const modal = document.getElementById("modal")
  const modalTitle = document.getElementById("modal-title")
  const modalImg = document.getElementById("modal-img")
  const modalDesc = document.getElementById("modal-desc")
  const modalClose = document.getElementById("modal-close")
  const modalBackdrop = document.querySelector(".modal-backdrop")

  if (!modal) return

  // Abrir modal
  document.querySelectorAll('[data-action="preview"]').forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      modal.classList.add("open")
      modal.setAttribute("aria-hidden", "false")

      modalTitle.textContent = button.dataset.title
      modalImg.src = button.dataset.img
      modalImg.alt = button.dataset.title
      modalDesc.textContent = button.dataset.desc

      // Prevent body scroll
      document.body.style.overflow = "hidden"
    })
  })

  // Fechar modal
  function closeModal() {
    modal.classList.remove("open")
    modal.setAttribute("aria-hidden", "true")
    document.body.style.overflow = "auto"
  }

  modalClose.addEventListener("click", closeModal)
  modalBackdrop.addEventListener("click", closeModal)

  // Fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal()
    }
  })
}

// ===== ANIMAÇÕES DE SCROLL =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  }, observerOptions)

  // Observar elementos para animação
  const elementsToAnimate = document.querySelectorAll(".card, .project-card, .skill-item")
  elementsToAnimate.forEach((el) => {
    el.classList.add("scroll-reveal")
    observer.observe(el)
  })
}

// ===== BARRAS DE SKILL =====
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-level")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.setProperty("--animate", "1")
        }
      })
    },
    { threshold: 0.5 },
  )

  skillBars.forEach((bar) => observer.observe(bar))
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = target.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// ===== HEADER SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }
})

// ===== MENU MOBILE =====
const menuToggle = document.getElementById("m-toggle")
const nav = document.querySelector("nav")

if (menuToggle && nav) {
  menuToggle.addEventListener("change", () => {
    if (menuToggle.checked) {
      nav.style.transform = "translateX(0)"
    } else {
      nav.style.transform = "translateX(-100%)"
    }
  })

  // Fechar menu ao clicar em link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.checked = false
      nav.style.transform = "translateX(-100%)"
    })
  })
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy loading para imagens
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// ===== EASTER EGG =====
let konamiCode = []
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code)

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg ativado!
    document.body.style.animation = "rainbow 2s infinite"
    setTimeout(() => {
      document.body.style.animation = ""
    }, 5000)
    konamiCode = []
  }
})

// Animação rainbow para easter egg
const style = document.createElement("style")
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`
document.head.appendChild(style)
