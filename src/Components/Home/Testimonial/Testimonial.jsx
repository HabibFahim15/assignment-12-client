
const Testimonial = () => {
  return (
    <div>
      <section className="p-6">
	<div className="container max-w-xl mx-auto">
		<div className="flex flex-col items-center w-full p-6 space-y-8 rounded-md lg:h-full lg:p-8 dark:bg-gray-50 dark:text-gray-800">
			<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS9WDX7JlmoXx1-KXqPeJAwiS0xWGDmjBEWw&s" alt="" className="w-32 h-32 rounded-full dark:bg-gray-500" />
			<blockquote className="max-w-lg text-lg italic font-medium text-center">"Our team's dedication and hard work have propelled us to achieve remarkable milestones, from pioneering advancements in [specific field or industry] to building lasting relationships with our clients. At [Met Office], we pride ourselves on fostering a culture of collaboration and integrity, where every employee is valued and empowered to contribute their best."</blockquote>
			<div className="text-center dark:text-gray-600">
				<p>Admin</p>
				<p>CEO of Company Co.</p>
			</div>
			<div className="flex space-x-2">
				<button type="button" aria-label="Page 1" className="w-2 h-2 rounded-full dark:bg-gray-900"></button>
				<button type="button" aria-label="Page 2" className="w-2 h-2 rounded-full dark:bg-gray-400"></button>
				<button type="button" aria-label="Page 3" className="w-2 h-2 rounded-full dark:bg-gray-400"></button>
				<button type="button" aria-label="Page 4" className="w-2 h-2 rounded-full dark:bg-gray-400"></button>
			</div>
		</div>
	</div>
</section>
    </div>
  );
};

export default Testimonial;