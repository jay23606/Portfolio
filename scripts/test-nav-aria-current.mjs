#!/usr/bin/env node

/**
 * Regression test: the active nav link must carry aria-current="page".
 * Renders components/Nav.tsx to static markup with next/link and
 * next/navigation stubbed, so no test framework or new dependency is needed.
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'
import { createRequire } from 'module'
import ts from 'typescript'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)

const source = readFileSync(resolve(process.cwd(), 'components/Nav.tsx'), 'utf-8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true,
  },
})

let currentPath = '/'
const stubs = {
  'next/link': {
    __esModule: true,
    default: ({ href, children, ...rest }) => React.createElement('a', { href, ...rest }, children),
  },
  'next/navigation': { __esModule: true, usePathname: () => currentPath },
  // Start the mobile menu open so its links are rendered alongside the desktop links.
  react: { ...React, useState: (initial) => [initial === false ? true : initial, () => {}] },
}

const mod = { exports: {} }
const fakeRequire = (id) => stubs[id] ?? require(id)
new Function('require', 'module', 'exports', outputText)(fakeRequire, mod, mod.exports)
const Nav = mod.exports.default

function renderAt(path) {
  currentPath = path
  return renderToStaticMarkup(React.createElement(Nav))
}

function linkTags(html, href) {
  return html.match(new RegExp(`<a[^>]*href="${href}"[^>]*>`, 'g')) ?? []
}

const cases = [
  { path: '/about', active: '/about', inactive: '/case-studies' },
  { path: '/case-studies/redline', active: '/case-studies', inactive: '/about' },
  { path: '/', active: null, inactive: '/about' },
]

const failures = []

for (const { path, active, inactive } of cases) {
  const html = renderAt(path)
  for (const href of [active, inactive].filter(Boolean)) {
    const tags = linkTags(html, href)
    const shouldBeCurrent = href === active
    // Index 0 is the desktop link, index 1 the mobile link.
    if (tags.length !== 2) {
      failures.push(`FAIL: expected desktop and mobile links to ${href} at ${path}, found ${tags.length}`)
    }
    tags.forEach((tag, i) => {
      const placement = i === 0 ? 'desktop' : 'mobile'
      const isCurrent = tag.includes('aria-current="page"')
      if (shouldBeCurrent && !isCurrent) {
        failures.push(`FAIL: ${placement} link to ${href} at ${path} is missing aria-current="page"`)
      } else if (!shouldBeCurrent && isCurrent) {
        failures.push(`FAIL: ${placement} link to ${href} at ${path} has aria-current="page" but is not the active page`)
      }
    })
  }
}

if (failures.length > 0) {
  failures.forEach((msg) => console.log(msg))
  process.exit(1)
}

console.log('PASS: active nav links expose aria-current="page"')
