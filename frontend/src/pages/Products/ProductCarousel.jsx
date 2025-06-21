import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaStar, FaStore, FaShoppingCart, FaBox } from "react-icons/fa";

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                },
            },
        ],
    };

    const productList = Array.isArray(products) ? products : [];

    return (
        <div className="mb-8 flex justify-center mr-12">
            {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.message}
                </Message>
            ) : productList.length === 0 ? (
                <p className="text-center text-white">No products available</p>
            ) : (
                <div className="relative">
                    <Slider {...settings} className="w-[100%] xl:w-[70rem] lg:w-[60rem] md:w-[50rem] sm:w-[40rem]">
                        {productList.map(
                            ({ image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
                                <div key={_id} className="relative">
                                    <img 
                                      src={`/assets/uploads/${image}`} 
                                      alt={name} 
                                      className="w-full object-cover h-full max-h-[30rem] max-w-[100%]" 
                                      onError={(e) => {
                                        e.target.src = '/assets/uploads/default-product.jpg';
                                      }}
                                    />
                                    {/* ... rest of the carousel code ... */}
                                </div>
                            )
                        )}
                    </Slider>
                </div>
            )}
        </div>
    );
};

export default ProductCarousel;