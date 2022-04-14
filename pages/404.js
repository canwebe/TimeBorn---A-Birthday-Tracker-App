import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()
  return (
    <div
      className='wrapper'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '86vh',
      }}
    >
      <div style={{ width: '80%' }}>
        <Image
          src='/404.svg'
          width='300px'
          height='300px'
          alt='404 Error Image'
          layout='responsive'
        />
        <button
          style={{
            backgroundColor: 'white',
            padding: '8px 20px',
            display: 'block',
            width: 'fit-content',
            margin: '10px auto',
            borderRadius: '8px',
          }}
          onClick={() => router.push('/')}
        >
          Back To Home
        </button>
      </div>
    </div>
  )
}
