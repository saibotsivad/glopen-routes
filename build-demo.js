#!/usr/bin/env node

import { join } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { EOL } from 'node:os'
import { dump } from 'js-yaml'

const NAME = process.argv.slice(2)
const HTML_FILE = './' + join('demo', `${NAME}.html`)
const JS_FILE = './' + join('demo', `${NAME}.js`)
const JSON_FILE = './' + join('demo', `${NAME}.json`)
const YAML_FILE = './' + join('demo', `${NAME}.yaml`)

const lines = []

const writeGeneratedFiles = () => writeFile(JS_FILE, lines.join('\n'), 'utf8')
	.then(() => import(JS_FILE))
	.then(js => Promise.all([
		writeFile(JSON_FILE, JSON.stringify(js.definition, undefined, 4), 'utf8'),
		writeFile(YAML_FILE, dump(JSON.parse(JSON.stringify(js.definition))), 'utf8'),
	]))
	.then(() => readFile(join('demo', 'swagger', 'index.html'), 'utf8'))
	.then(html => writeFile(
		HTML_FILE,
		html
			.replace(/\.\//g, './swagger/')
			.replace('dom_id:', `url: "./${NAME}.yaml",\n      dom_id:`),
		'utf8',
	))

process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
	let chunk = process.stdin.read()
	if (chunk === null) return
	chunk = chunk.split(EOL)
	lines.push(...chunk)
})
process.stdin.on('end', writeGeneratedFiles)
