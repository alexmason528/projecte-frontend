export const validate = images => {
  if (!images || images.length < 1) {
    return 'Please add at least one image'
  }

  return undefined
}
