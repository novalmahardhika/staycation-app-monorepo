import MostPickedItems from './most-picked-items'

export default function MostPickedSection() {
  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Most Picked</h2>
      <div className='grid gap-6 md:grid-cols-3'>
        <MostPickedItems />
      </div>
    </section>
  )
}
