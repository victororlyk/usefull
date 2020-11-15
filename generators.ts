// // import fetch from "node-fetch";
//
type Result = {
  title: string,
  url: string,
  abstract: string
}
//
// type SearchFn = (
//   query: string, tags?: string[] | undefined
// ) => Promise<Result[]>
//
// // declare function displaySearch(inputId: 'string',
// //   outputId: 'string',
// //   search: SearchFn
// // ): void;
//
// function inputChangeHandler(this: HTMLElement) {
// // We have no clue what this can be // that's why we get red squigglies
//   this.parentElement?.classList.add('active')
// }
//
// function displaySearch(
//   inputId: string,
//   outputId: string,
//   search: SearchFn): void {
//   document.getElementById(inputId)
//           ?.addEventListener('change', inputChangeHandler)
// }
//
// const term = 'Ember'
// const results = `You searched for ${term}, and got ${no} results`
//
// const result = {
//   title: 'A guide to @@starthl@@Ember@@endhl@@.js', url: '/a-guide-to-ember',
//   description: 'The framework @@starthl@@Ember@@ endhl@@.js in a nutshell'
// }
// console.log('sdf')
// let markup = highlight`<li>${result.title}</li>`
//
// function highlight(strings: TemplateStringsArray, ...values: string[]) {
//   let str = '';
//   strings.forEach((templ, i) => {
//     let expr = values[i]?.replace('@@start@@', '<em>')
//                         .replace('@@end@@', '</em>') ?? ''
//     str += templ + expr
//   })
//   return str
// }
//
// console.log(markup)
//
// function createResultTemplate(results: Result[]): string {
//   return `<ul> ${results.map(result =>
//     highlight`<li>${result.title}</li>`)} </ul>`
// }
//
// declare function search(term: string, tags?: string[]):
//   Promise<Result[]>
//
// async function search(query: string, tags?: string[]
// ) {
//   let queryString = `?query=${query}`
//   if (tags && tags.length) {
//     queryString += `&tags=${tags.join()}`
//   }
// // Instead of thenable promise calls // we await results
//   const response
//     = await fetch(`/search${queryString}`)
//   const results = await response.json()
// // The return type becomes Promise<Result[]>
//   return results as Result[]
// }
//
// const results = await search('Ember') // Yass!
//
// function search(term: string, tags?: string[]): Promise<Result[]>
//
// function search(
//   term: string,
//   callback: (results: Result[]) => void,
//   tags?: string[]
// ): void
//
// function search(
//   term: string, p2?: (results: Result[]) => void | string[], p3?: string[]
// ) {
//   const callback = typeof p2 === "function" ? p2 : undefined
//   const tags =
//     typeof p2 !== 'undefined' && Array.isArray(p2) ? p2 : typeof p3 !== 'undefined' && Array.isArray(p3) ? p3 : undefined
//   let queryString = `?query=${term}`
//   if (tags && tags.length) {
//     queryString += `&tags=${tags.join()}`
//   }
//   const results = fetch(`/search${queryString}`)
//     .then(response => response.json())
//
//   if (callback) {
//     return void results.then(res => callback(res))
//   } else {
//     return results
//   }
// }
//
// search('s', () => console.log('hello'))
//
// export {}
//
// type SearchOverloadFn = {
// // Function overload number 1
//   (
//     term: string,
//     tags?: string[] | undefined): Promise<Result[]>;
// // Function overload number 2
//   (
//     term: string,
//     callback: (results: Result[]) => void,
//     tags?: string[] | undefined
//   ): void;
// }

function* generateStuff() {
  yield 1
  yield 2
  let proceed = yield 3
  if (proceed) {
    yield 4
  }
  return 'done'
}

const generator = generateStuff()
console.log(generator.next().value)
console.log(generator.next().value)
console.log(generator.next().value)
console.log(generator.next(true).value)
console.log(generator.next().value)

type PollingResults = {
  results: Result[],
  done: boolean
}

async function polling(term: string): Promise<PollingResults> {
  return fetch(`/pollingSearch?query=${term}`)
    .then(res => res.json())
}

function append(result: Result) {
  const node = document.createElement('li')
  node.innerHTML = `<a href="${result.url}">${result.title}</a>`
  document.querySelector("#results")
          ?.append(node)
}

async function* getResults(term: string): AsyncGenerator<Result[], void, boolean> {
  let state, stop = false
  do {
    state = await polling(term)
    stop = yield state.results
  } while (!state.done || stop)
}

document.getElementById("searchField")
        ?.addEventListener('change', handleChange)

async function handleChange(this: HTMLElement, ev: Event) {
  if (this instanceof HTMLInputElement) {
    let resultsGen = getResults(this.value)
    let next
    let count = 0
    do {
      next = await resultsGen.next(count >= 5)
      if (typeof next.value !== 'undefined') {
        next.value.map(append)
        count += next.value.length
      }
    } while (!next.done)
    // option 1
    /*
    let resultsGen = getResults(this.value)
    for await (const results of resultsGen) {
      results.map(append)
    }
     */
    // option 2
    /*
    let next
    do {
      next = await resultsGen.next()
      if (typeof next.value !== 'undefined') {
        next.value.map(append)
      }
    } while (!next.done)

     */
  }
}
