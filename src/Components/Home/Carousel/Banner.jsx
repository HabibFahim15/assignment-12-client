import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const Banner = () => {
  return (
    <Carousel>
                <div>
                    <img src="https://asset.gallup.com/p/WORKPLACEV9CMS/49821ce7-b62a-4bcb-9013-0a21bed58ed5.jpg" />
                   
                </div>
                <div>
                    <img src="https://media.istockphoto.com/id/1283955441/photo/smiling-female-employee-sit-in-coworking-space-and-working-on-the-project.jpg?s=612x612&w=0&k=20&c=KpqbMuAtZ9ahPR09cvX1dNFY1qGqU4IQLY-Y9C45RkE=" />
                </div>
                <div>
                    <img src="https://st3.depositphotos.com/9880800/17524/i/450/depositphotos_175242348-stock-photo-happy-colleagues-having-fun-modern.jpg" />
                </div>
            </Carousel>
  )
};

export default Banner;