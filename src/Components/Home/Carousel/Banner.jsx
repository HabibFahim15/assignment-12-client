import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const Banner = () => {
  return (
    <Carousel>
                <div>
                    <img src="https://www.searchenginejournal.com/wp-content/uploads/2022/04/office-workers-not-happy-626feb3bdfe8f-sej-1280x720.png" />
                   
                </div>
                <div>
                    <img src="https://cdn-res.keymedia.com/cms/images/us/037/0292_637595469743067605.jpg" />
                </div>
                <div>
                    <img src="https://asset.gallup.com/p/WORKPLACEV9CMS/49821ce7-b62a-4bcb-9013-0a21bed58ed5.jpg" />
                </div>
            </Carousel>
  )
};

export default Banner;