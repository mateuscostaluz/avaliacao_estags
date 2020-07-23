const converter = require('../src/message/message.services')

describe('A simple test from converter method', () => {
  
  test('Should convert a text in a number sequence using oldest SMS method', async () => {
    const message = { letterMessage: 'TESTE DE MESA' }
    const response = await converter.conversion(message)
    expect(response.numberMessage).toBe('833777783303_33063377772')
  })

  test('Should convert a number sequence in a text using oldest SMS method', async () => {
    const message = { numberMessage: '833777783303_33063377772' }
    const response = await converter.conversion(message)
    expect(response.letterMessage).toBe('TESTE DE MESA')
  })
})
