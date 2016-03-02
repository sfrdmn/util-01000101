export default function simpleStrip (html, tags) {
  const tagOptions = `(${tags.join('|')})`
  return html.replace(new RegExp(`<\s*/?\s*${tagOptions}[^>]*>`, 'g'), '')
}
