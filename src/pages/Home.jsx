import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Product from "./Products/Product";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Home = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const productList = [];

      // Generate 40 static products
      for (let i = 1; i <= 40; i++) {
        productList.push({
          _id: i.toString(),
          name: `Product ${i}`,
          price: (i * 10).toFixed(2),
          image: `/e-commerce-project/assets/uploads/product-${i}.jpg`,
        });
      }

      setProducts(productList);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }, [keyword]);

  return (
    <>
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">Failed to load products.</Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[3rem] text-[3rem]">Special Products</h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[3rem]"
            >
              Shop
            </Link>
          </div>

          <div className="flex flex-wrap justify-between px-10 mt-[3rem]">
            {products.map((product, index) => (
              <div
                key={product._id}
                className={`w-full md:w-[45%] lg:w-[30%] px-2 mb-8 ${
                  index === products.length - 1 ? "" : "mb-8"
                }`}
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
