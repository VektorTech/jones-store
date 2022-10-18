import { useAuthState } from "@Lib/contexts/AuthContext";
import { Product as ProductType } from "@prisma/client";
import Link from "next/link";

import Product from "../common/Product";

export default function ProductsSection({
  title,
  products,
  url,
}: {
  title: string;
  products: ProductType[];
  url: string;
}) {
  const { addToWishlist, removeFromWishlist, user } = useAuthState();

  const handleWishlistAction = (id: string, isWishlistItem: boolean) => {
    isWishlistItem ? removeFromWishlist(id) : addToWishlist(id);
  };

  return (
    <section className="products-section">
      <div className="products-section__container">
        <h2 className="products-section__heading">#shop {title}</h2>
        <div className="products-section__products">
          {products?.map((product) => (
            <Product
              {...product}
              onWishlistAction={handleWishlistAction}
              isOnWishlist={user?.wishlist?.some(item => item.productId == product.id)}
              key={product.id} />
          ))}
        </div>
        <p className="products-section__products-link">
          <Link href={url}>
            <a>View All {title}</a>
          </Link>
        </p>
      </div>
    </section>
  );
}
