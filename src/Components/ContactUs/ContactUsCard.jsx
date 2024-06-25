
const ContactUsCard = ({item}) => {
  console.log(item);
  const {image,comment,name, email} = item;
  return (
    <div className="flex justify-center relative top-1/3">




    
    <div className="relative grid w-[1000px] grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
        <div className="relative flex gap-4">
            <img src={image} className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
            <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">{name}</p>
                    <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
                </div>
                <p className="text-gray-400 text-sm">{email}</p>
            </div>
        </div>
        <p className="-mt-4 text-gray-500">{comment}</p>
    </div>
    
    
    
    </div>
  );
};

export default ContactUsCard;