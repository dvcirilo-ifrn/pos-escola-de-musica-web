import { Image } from 'react-bootstrap'

export function Foto({ src, icone = 'bi-person-circle', tamanho = 48 }) {
  if (src) {
    return <Image src={src} roundedCircle width={tamanho} height={tamanho} className="object-fit-cover align-middle" />
  }
  return <i className={`bi ${icone} text-secondary align-middle`} style={{ fontSize: tamanho, lineHeight: 1 }}></i>
}
