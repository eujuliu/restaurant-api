import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Restaurant API",
  description: "A Restaurant API",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/user/create-user' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          {
            text: 'User',
            items: [
              {
                text: 'Create a new user',
                link: '/guide/user/create-user'
              },
              {
                text: 'Login',
                link: '/guide/user/login'
              },
              {
                text: 'Change password',
                link: '/guide/user/change-user-password'
              }
            ]
          },
          {
            text: 'Address',
            items: [
              {
                text: 'Create a new address',
                link: '/guide/address/create-address'
              },
              {
                text: 'Get user addresses',
                link: '/guide/address/get-addresses'
              },
              {
                text: 'Update an address',
                link: '/guide/address/update-address'
              },
              {
                text: 'Delete an address',
                link: '/guide/address/delete-address'
              }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eujuliu/restaurant-api' }
    ]
  }
})
