export function Estrelas({ nota }) {
  return (
    <span className="text-warning">
      {[1, 2, 3, 4, 5].map(n => (
        <i key={n} className={n <= nota ? 'bi bi-star-fill' : 'bi bi-star'}></i>
      ))}
    </span>
  )
}
