import Link from 'next/link'

export default function Footer() {
  return (
    <Link
      href="https://github.com/herol3oy/meet-with-git"
      target="_blank"
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '3rem',
      }}
    >
      Github
    </Link>
  )
}
