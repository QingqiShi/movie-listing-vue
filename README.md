# movie-listing-vue

🎬 This is a little demo project that uses the TMDB API to list some movies.

🖖 Implemented with Vue!

👇 Check it out 👇

https://movie-listing-vue.qingqi.dev/

## Features

- Lazy loaded components with spinner for quick interaction time
- Sort movies by popularity and rating
- Filter movies by rating and genres
- Sorting and filtering are persisted and sharable through url
- Optimised smooth animations
- Responsive (to some extent)
- 100% test coverage (mostly I got lazy and used snapshots, but still)

## Some assumptions

- Everything is in English and I can just hardcode texts
- There's no need to make a ui library for base components
- It's ok to not scope the CSS since this is a pretty small application

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

Take away: Doesn't support IE. (because it uses Fetch API, CSS grid etc)

## Other notes

- There's some issues with jest coverage collection with Vue functional
  components
- I'm finding logic in sass a bit uncomfortable because it can't be unit tested.
  Maybe this is finally the reason for me to try styled components.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```
