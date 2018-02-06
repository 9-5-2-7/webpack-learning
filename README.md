webpack src/app.js dist/bundle.js --watch

setting npm script
```js
...
"script": {
    "build: "webpack src/app.js dist/bundle.js",
    "watch": "webpack src/app.js dist/bundle.js --watch"
}
```

## "Modules are simply files" can expose anything to outside world