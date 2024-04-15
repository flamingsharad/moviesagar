export default function manifest() {
    return {
      name: 'MovieSagar',
      short_name: 'MovieSagar is only profilio',
      description: 'Hello Brother',
      start_url: '/',
      display: 'standalone',
      background_color: '#fff',
      theme_color: '#fff',
      icons: [
        {
          src: '/favicon.ico',
          sizes: 'any',
          type: 'image/x-icon',
        },
      ],
    }
  }