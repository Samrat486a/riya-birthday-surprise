# Photos Directory

Place your personal photos for Riya here!

### Suggested Photo Mapping:
1. `hero.jpg` - High quality portrait for the Hero section.
2. `lock.jpg` - Sharp portrait for the Secret PIN Lock Screen.
3. `letter.jpg` - Photo to display next to the personal Birthday Letter.
4. `finale.jpg` - Grand finale portrait for the final celebration section.
5. `timeline-1.jpg`, `timeline-2.jpg`, etc. - Photos for the friendship timeline memories.
6. `gallery-1.jpg`, `gallery-2.jpg`, etc. - Photos for the interactive gallery.

### How to use your photos in the website:
Open `src/config/siteConfig.ts` and change the photo paths:
```ts
photos: {
  lockScreen: '/photos/lock.jpg',
  hero: '/photos/hero.jpg',
  letter: '/photos/letter.jpg',
  finale: '/photos/finale.jpg',
  timeline: [
    { ... photo: '/photos/timeline-1.jpg' },
    ...
  ]
}
```

*Note: All current images are set with high-resolution default aesthetic portrait fallbacks so you can test the site right away without missing images!*
