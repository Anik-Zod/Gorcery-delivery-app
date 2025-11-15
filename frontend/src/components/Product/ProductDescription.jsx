import React from "react";

function ProductDescription({ product }) {
  const { name, category, price, offerPrice } = product;

  return (
    <div className="border-y border-gray-400/90 py-10 text-gray-700 mt-15 leading-relaxed space-y-2">
        <h1 className="border-l-6 text-[26px] px-5 border-primary">Description</h1>
        
    <div className="text-[20px] flex flex-col gap-3  text-gray-500">
      <p className="mt-5">
        {name} is selected with great care to ensure excellent freshness and
        consistent quality. It belongs to the {category} category, making it
        suitable for daily grocery needs.
      </p>

      <p>
        This product is perfect for a wide range of recipes, snacks, or
        beverages, depending on its usage. Each piece is carefully handled and
        packed to preserve natural flavor and nutritional value.
      </p>

      <p>
        Priced at{" "}
        <span className="font-semibold text-primary">
          ${offerPrice || price}
        </span>
        , it offers great value for families, quick meals, and everyday
        consumption.
      </p>

      {offerPrice && (
          <p className="text-xl text-green-600">
          (Regular price: ${price} — You save $
          {price - offerPrice})
        </p>
      )}
      </div>
    </div>
  );
}

export default ProductDescription;
