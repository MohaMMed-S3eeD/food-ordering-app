import { formatCurrency } from "@/lib/formatters";
import { getProductById } from "@/server/db/products";
import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground">
            The requested product could not be found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Base Price
                </h3>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(product.basePrice)}
                </p>
              </div>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Available Sizes
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.sizes.map((size) => (
                      <div key={size.id} className="bg-muted rounded-lg p-3">
                        <div className="font-medium text-foreground">
                          {size.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(size.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Extras */}
              {product.extras && product.extras.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Available Extras
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {product.extras.map((extra) => (
                      <div
                        key={extra.id}
                        className="bg-muted rounded-lg p-3 flex justify-between items-center"
                      >
                        <span className="font-medium text-foreground">
                          {extra.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(extra.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Product Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Product ID:</span>
                    <span className="text-foreground font-mono">
                      {product.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created Date:</span>
                    <span className="text-foreground">
                      {new Date(product.createdAt).toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="text-foreground">
                      {new Date(product.updatedAt).toLocaleDateString("en-US")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
