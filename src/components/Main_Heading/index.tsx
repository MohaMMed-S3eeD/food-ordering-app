function MainHeading({ title, subTitle }: { title: string; subTitle: string }) {
    return (
      <>
        <span className='uppercase  font-semibold leading-4 text-zinc-400'>
          {subTitle}
        </span>
        <h2 className='text-primary font-bold text-4xl italic'>{title}</h2>
      </>
    );
  }
  
  export default MainHeading;
  