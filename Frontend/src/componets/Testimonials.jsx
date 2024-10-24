
const testimonialsData = [
  {
    name: 'John Doe',
    message: 'Fantastic service! They arrived in no time and got me back on the road quickly.',
  },
  {
    name: 'Jane Smith',
    message: 'Highly recommend! The staff was friendly and very professional.',
  },
  {
    name: 'Mark Johnson',
    message: 'I was stranded for hours, but they came to my rescue quickly. Thank you!',
  },
];

const Testimonials = () => {
  return (


    <div className="bg-gray-100 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
      <div className="container mx-auto flex flex-col items-center">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6 w-full max-w-md">
            <p className="text-lg italic">{testimonial.message}</p>
            <p className="text-right font-semibold mt-2">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>


  );
}

export default Testimonials;