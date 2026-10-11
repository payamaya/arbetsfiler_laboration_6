'use strict'
/*
 * Laboration 6 - Receptsökaren
 * Namn: Paul Yashouh
 */

// Hämta element från DOM
const searchForm = document.querySelector('#searchform')
const searchInput = document.querySelector('#search')
const searchButton = document.querySelector('#searchbutton')

const recipeOutput = document.querySelector('#recipe')

const apiMessage = document.querySelector('#message')
const formError = document.querySelector('#error')

let errors = []
let messages = []

/**
 * Validera formulöaärts inmatning
 * @returns {boolean}
 *
 */
//läsa den sökfras som användaren skriver i formuläret
function validateForm() {
  errors = []
  formError.innerHTML = ''
  let search = searchInput.value.trim()
  console.log('search :>> ', search)
  // Om sökfältet är tomt
  if (search === '') {
    // lLägg till felmeddelandet i errors-arrayen
    errors.push('Du måste fylla i sökfras')
    console.log('errors :>> ', errors)
  }

  // Om det finns errors
  if (errors.length > 0) {
    // Visa felmedellande här
    console.error(errors)
    // NOTE Display Error
    // Join används för att göra arrayen 'errors' till textsträng
    formError.textContent = errors.join(', ')
    return false
  }
  // retunera true om sökföltet är fylld

  return true
}
// Validering av sökfältet
searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  // Lagra validateForm funktionen i en valriabel
  const isValid = validateForm()
  // Om formuläret INTE är giltigt
  if (!isValid) {
    console.log('errors :>> ', errors)
    // Om sökfäletet är tom avryt exekvering
    return
  }
})
