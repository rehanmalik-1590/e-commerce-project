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

    const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL || "/assets/uploads";

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
                    <Slider
                        {...settings}
                        className="w-[100%] xl:w-[70rem] lg:w-[60rem] md:w-[50rem] sm:w-[40rem]"
                    >
                        {productList.map(
                            ({
                                image,
                                _id,
                                name,
                                price,
                                description,
                                brand,
                                createdAt,
                                numReviews,
                                rating,
                                countInStock,
                            }) => (
                                <div key={_id} className="relative">
                                    <img
                                        src={`${image}`}
                                        alt={name}
                                        className="w-full object-cover h-full max-h-[30rem] max-w-[100%]"
                                        onError={(e) => {
                                            e.target.src = `${imageBaseUrl}/default-product.jpg`;
                                            e.target.onerror = null;
                                        }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                                        <h3 className="text-xl font-bold">{name}</h3>
                                        <p className="text-sm">{description}</p>
                                        <div className="flex items-center mt-2">
                                            <FaStar className="text-yellow-400 mr-1" />
                                            <span>{rating} ({numReviews} reviews)</span>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-lg font-bold">${price.toFixed(2)}</span>
                                            <span className="text-sm">{countInStock} in stock</span>
                                        </div>
                                        <div className="flex items-center mt-2 text-sm">
                                            <FaStore className="mr-1" />
                                            <span className="mr-3">{brand}</span>
                                            <FaBox className="mr-1" />
                                            <span>Added {moment(createdAt).fromNow()}</span>
                                        </div>
                                    </div>
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
