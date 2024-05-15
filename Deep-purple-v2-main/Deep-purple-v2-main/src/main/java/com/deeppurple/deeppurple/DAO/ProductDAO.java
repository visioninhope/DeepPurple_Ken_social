package com.deeppurple.deeppurple.DAO;

import com.stripe.model.Price;
import com.stripe.model.Product;

import java.math.BigDecimal;

public class ProductDAO {

    static Product[] products;

    static {
        products = new Product[3];

        Product sampleProduct = new Product();
        Price samplePrice = new Price();

        sampleProduct.setName("Basic");
        sampleProduct.setId("Basic");
        samplePrice.setCurrency("usd");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(0));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[0] = sampleProduct;

        sampleProduct = new Product();
        samplePrice = new Price();

        sampleProduct.setName("Pro");
        sampleProduct.setId("Pro");
        samplePrice.setCurrency("usd");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(1000));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[1] = sampleProduct;

        sampleProduct = new Product();
        samplePrice = new Price();

        sampleProduct.setName("Enterprise");
        sampleProduct.setId("Enterprise");
        samplePrice.setCurrency("usd");
        samplePrice.setUnitAmountDecimal(BigDecimal.valueOf(2000));
        sampleProduct.setDefaultPriceObject(samplePrice);
        products[2] = sampleProduct;

    }

    public static Product getProduct(String id) {

        if ("Basic".equals(id)) {
            return products[0];
        } else if ("Pro".equals(id)) {
            return products[1];
        } else if ("Enterprise".equals(id)) {
            return products[2];
        } else
            return new Product();

    }
}