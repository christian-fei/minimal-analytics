import { h } from 'preact'

export default function ({ searchTerm = '', updateSearchTerm = Function.prototype } = {}) {
  return (
    <div className="contain">
      <input
        className="search"
        placeholder="Filter by page or referrer"
        onKeyUp={(e) => {
          console.log('changed', e.target.value)
          updateSearchTerm(e.target.value)
        }}
      />
    </div>
  )
}
