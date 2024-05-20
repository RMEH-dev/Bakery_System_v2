import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function ProductCard({ product }) {
  return (
    <Card className="w-[250px] bg-white text-c3 hover:text-white hover:bg-deep-orange-900 hover:bg-opacity-80 hover:duration-200 hover:transition-transform hover:translate-y-2 duration-500 ease-in-out hover:scale-105  cursor-pointer shadow-md shadow-c3 h-[300px]">
      <CardHeader shadow={false} floated={false} className="h-[150px] hover:text-c2">
        <img
          src="https://countrywoodsmoke.com/wp-content/uploads/2020/03/IMG_20200130_154847-01-1536x734.jpeg"
          alt="card-image"
          className="h-full w-full object-cover hover:text-c2"
        />
      </CardHeader>
      <div className="grid hover:text-c2 grid:cols-2">
        <CardBody className="hover:text-c2">
          <div className="mb-1  flex justify-between">
            <Typography className="text-c1 hover:text-c2 font-bold font-[Montserrat] ">
              {product.proStockName}
            </Typography>
            <Typography className="font-bold font-[Montserrat] text-c1 text-opacity-100 text-nowrap">
              Rs. {product.pricePerItem}
            </Typography>
          </div>
          <Typography
            variant="small"
            className="text-c3 font-medium font-[Montserrat] text-wrap grid grid-cols-2 gap-y-2" // Use grid with gap
          >
            From: {product.availableFrom}
            <br />
            Till: {product.availableTill}
            <button class="flex items-center ml-10 justify-center bg-c3 w-14 h-8 rounded-3xl text-white hover:bg-c1 hover:text-c2 duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </Typography>
        </CardBody>
      </div>
    </Card>
  );
}
