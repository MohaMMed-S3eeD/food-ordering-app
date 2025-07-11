import MainHeading from '@/components/Main_Heading'
import React from 'react'

const menu = () => {
  return (
    <main className='section-gap'>
      <div className='container'>
        <MainHeading title="Menu" subTitle="Menu" />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='col-span-1'>
            <h2>Pizza</h2>
          </div>
        </div>
      </div>
    </main>
  )
}

export default menu