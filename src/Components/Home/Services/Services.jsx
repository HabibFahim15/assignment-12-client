import { Link } from "react-router-dom";

const Services = () => {
  return (
    <section className="bg-gray-100 text-gray-800">
	<div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
		<h1 className="text-3xl font-bold leading-none sm:text-4xl">Welcome to
			<span className="text-green-600"> Met Office</span>
		</h1>
		<p className=" mt-8 mb-12 text-lg">This is our official website for our Employee and Human Resource Executive(Hr).Our all staff can work here and also see their work progress..And his Will get Salaray after every month.
		<br />
		If you want to join with us first you have create a account. <br />
		Then go to The DashBoard you will see your task
		</p>
		<div className="flex flex-wrap justify-center">
			<Link to={'register'} className="px-8 py-3 m-2 text-lg font-semibold rounded bg-green-600 text-gray-50">Register now</Link>
			<Link to={'dashboard'} className="px-8 py-3 m-2 text-lg border rounded text-gray-900 border-gray-300"> Go Dashboard</Link>
		</div>
	</div>
</section>
  );
};

export default Services;