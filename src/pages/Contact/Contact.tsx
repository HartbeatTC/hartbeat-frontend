import contactVid from '../../assets/video/contact_vid.mp4';
const Contact = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-start w-full max-w-7xl'>
      <div className='h-[200px] w-full'>
        <video
          src={contactVid}
          preload='auto'
          autoPlay
          loop
          muted
          playsInline
          className='object-cover w-full h-full object-center sm:rounded-lg '
        />
      </div>
      <div className='flex-1 flex flex-col items-center justify-start text-3xl gap-4 py-8 px-4'>
        <h2 className='text-6xl font-extrabold text-hb-red'> -- JOIN US -- </h2>
        <h3 className='text-4xl font-semibold'> SEND US A MESSAGE!</h3>
        <p>
          <span className='font-semibold'>Email:</span>{' '}
          <span>
            <a type='email' href='mailto:hartbeattc@gmail.com'>
              hartbeattc@gmail.com
            </a>
          </span>
        </p>
        <p>
          <span className='font-semibold'>Instagram:</span> @hartbeattc
        </p>
        <p>
          <span className='font-semibold'>X:</span> @hartbeattc
        </p>
      </div>
    </div>
  );
};

export default Contact;
