class OpenAiError extends Error {
  constructor(message: string) {
    super(message)
  }

  response = {
    status: 500,
    data: {
      error: {
        message: 'An error ocurred during your request.'
      }
    }
  }
}

export default OpenAiError;
