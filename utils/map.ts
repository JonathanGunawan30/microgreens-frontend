export function getLeafletTileConfig(maptilerApiKey?: string) {
  const trimmedKey = (maptilerApiKey || '').trim()

  if (trimmedKey) {
    return {
      url: `https://api.maptiler.com/maps/base-v4/256/{z}/{x}/{y}.png?key=${encodeURIComponent(trimmedKey)}`,
      options: {
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20,
      },
    }
  }

  return {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    },
  }
}
