import Image from "next/image";

const products = [
  {
    imageSrc: "/mock/mock-product.png",
    productName: "Hinoki",
    size: 30,
    price: 349,
    currency: "SEK",
  },
  {
    imageSrc: "/mock/mock-product.png",
    productName: "Matcha",
    size: 50,
    price: 429,
    currency: "SEK",
  },
  {
    imageSrc: "/mock/mock-product.png",
    productName: "Organic",
    size: 80,
    price: 599,
    currency: "SEK",
  },
  {
    imageSrc: "/mock/mock-product.png",
    productName: "Ceremonial",
    size: 30,
    price: 389,
    currency: "SEK",
  },
  {
    imageSrc: "/mock/mock-product.png",
    productName: "Classic",
    size: 40,
    price: 319,
    currency: "SEK",
  },
  {
    imageSrc: "/mock/mock-product.png",
    productName: "Reserve",
    size: 60,
    price: 679,
    currency: "SEK",
  },
  {
    imageSrc: "/mock/mock-product.png",
    productName: "Zen",
    size: 30,
    price: 299,
    currency: "SEK",
  },
  {
    imageSrc: "/mock/mock-product.png",
    productName: "Forest",
    size: 70,
    price: 549,
    currency: "SEK",
  },
  {
    imageSrc: "/mock/mock-product.png",
    productName: "Yuzu",
    size: 25,
    price: 269,
    currency: "SEK",
  },
  {
    imageSrc: "/mock/mock-product.png",
    productName: "Stone",
    size: 50,
    price: 459,
    currency: "SEK",
  },
];

export function ProductsPage() {
  return (
    <div aria-label="Products page" className="bg-[#F5F0E8]">
      <section className="flex h-[195px] flex-col justify-between px-[48px] pt-[48px] pb-[20px]">
        <h1 className="font-libre text-5xl leading-[31px] text-[#1C1C1A]">
          All Products
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <p className="font-hanken text-base text-[#1C1C1A]">All products</p>
            <p className="font-hanken text-base text-[#1C1C1A99]">Matcha</p>
            <p className="font-hanken text-base text-[#1C1C1A99]">Books</p>
            <p className="font-hanken text-base text-[#1C1C1A99]">Toys</p>
          </div>

          <button
            type="button"
            className="cursor-pointer font-hanken text-[16px] uppercase text-black underline"
          >
            Filter
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={`${product.productName}-${product.size}`}
            className="flex flex-col gap-2 border border-[#E8E3DC] px-5"
          >
            <div className="flex justify-center">
              <Image
                src={product.imageSrc}
                alt={product.productName}
                width={220}
                height={300}
                className="h-[300px] w-[220px] object-contain"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-hanken text-[28px] font-bold uppercase text-[#1C1C1A]">
                {product.productName}
              </p>
              <p className="font-hanken text-[24px] text-[#1C1C1A]">
                {product.size}g - {product.price} {product.currency}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
