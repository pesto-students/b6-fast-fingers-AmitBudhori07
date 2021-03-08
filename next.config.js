module.exports={
    async rewrites() {
        return [
          {
            source: '/fastfinger/:slug*',
            destination: 'http://localhost:5000/fastfinger/:slug*',
          },
        ]
      }
}