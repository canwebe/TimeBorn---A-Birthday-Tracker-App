export default function Fallback() {
  return (
    <div
      className='wrapper'
      style={{
        padding: '77px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        Oh oh , You are Offline
        <br />
        No Cache found for this route
      </p>
    </div>
  )
}
