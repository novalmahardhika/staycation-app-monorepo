import ApartmentListItems from './apartment-list-items'

export default function ApartmentListSection() {
  return (
    <section className='grid gap-5'>
      <h2 className='title-section'>Apartments with kitchen set</h2>
      <ApartmentListItems />
    </section>
  )
}
