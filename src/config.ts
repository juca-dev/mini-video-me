const userPreferences = window.MiniVideoMe.config

const config = {
  width: Number(userPreferences.camera.width),
  height: Number(userPreferences.camera.height),
  frameRate: Number(userPreferences.camera.frameRate),
  flipHorizontal: Boolean(userPreferences.flipHorizontal),
  rounded: Boolean(userPreferences.rounded),
  scale: Number(userPreferences.zoom ?? 1),
  horizontal: Number(userPreferences.anchor.x ?? 0),
  vertical: Number(userPreferences.anchor.y ?? 0),
  borderColorCss: userPreferences.borderColorCss,
  showBorder: userPreferences.showBorder,
  clipPath: userPreferences.clipPath,
}

export { config }
