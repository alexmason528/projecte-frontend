export const validate = images => {
  if (!images || images.length < 2) {
    return 'Please select at least two images'
  }

  for (let image of images) {
    if (!image.description || image.description === '') {
      return 'Please add description to all images'
    }
  }

  return undefined
}
