const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const input = document.querySelector('input').value
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetch(`/weather?address=${input}`).then(res => res.json().then(data => {
    if (data.error) {
      messageOne.textContent = data.error
    } else {
      messageOne.textContent = data.location
      messageTwo.textContent = data.forecast
    }
  }))
})
