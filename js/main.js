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

const API_URL = 'https://dummyjson.com/recipes'

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
  formError.textContent = ''
  apiMessage.innerHTML = ''
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
  // Skicka sökordet 'search' som argument
  readData(search)
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

// Hantera API-svaret
async function getData(query) {
  const response = await fetch(`${API_URL}/search?q=${query}`)
  // Konvertera json till javascript objekt
  const data = await response.json()
  return data
}
// Tar emot sökordet och plockar rätt data från API-et
async function readData(query) {
  // Rensa gamla sökresultat från skärmen direkt när sökningen startar
  recipeOutput.innerHTML = ''

  const data = await getData(query)
  // Kontrollera om listan saknas eller är helt tom
  if (!data.recipes || data.recipes.length === 0) {
    messages = [] // Tömer vi arrayen så vi inte spara det galma meddelande
    messages.push('Inget recept hittades. prova en ny sökfras...')
    apiMessage.textContent = messages.join(',')
    return
  }
  // Om vi hittade recept, rensa bort det gamla felmeddelandet från skärmen
  apiMessage.textContent = ''
  console.log('Första matchande receptet :>> ', data.recipes[0])
  console.log('Hela listan av matchade recept :>> ', data.recipes)
}
