package com.deeppurple.deeppurple.dto;

import com.stripe.model.Product;

public class StripeRequestDTO {
    String subscriptionId;
    String customerName;
    String customerEmail;

    public String getSubscriptionId() {
        return subscriptionId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }
}
