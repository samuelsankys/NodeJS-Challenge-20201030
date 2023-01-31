exports.error = (message) => {
  return {
    type: 'Error',
    message: message,
  }
}
