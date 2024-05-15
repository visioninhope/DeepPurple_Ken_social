package com.deeppurple.deeppurple.Controller;

import com.deeppurple.deeppurple.DAO.ProductDAO;
import com.deeppurple.deeppurple.Service.CustomerUtil;
import com.deeppurple.deeppurple.dto.StripeRequestDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PaymentController {

    String STRIPE_API_KEY = System.getenv().get("STRIPE_API_KEY");

    @PostMapping("/subscriptions/new")
    String newSubscription(@RequestBody StripeRequestDTO requestDTO) throws StripeException {

        Stripe.apiKey = STRIPE_API_KEY;

        String clientBaseURL = System.getenv().get("CLIENT_BASE_URL");

        // Start by finding existing customer record from Stripe or creating a new one
        // if needed
        Customer customer = CustomerUtil.findOrCreateCustomer(requestDTO.getCustomerEmail(),
                requestDTO.getCustomerName());

        // Next, create a checkout session by adding the details of the checkout
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                // For subscriptions, you need to set the mode as subscription
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setCustomer(customer.getId())
                .setSuccessUrl(clientBaseURL + "/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(clientBaseURL + "/failure");

        Product product = ProductDAO.getProduct(requestDTO.getSubscriptionId());

        paramsBuilder.addLineItem(
                SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(
                                PriceData.builder()
                                        .setProductData(
                                                PriceData.ProductData.builder()
                                                        .putMetadata("app_id", product.getId())
                                                        .setName(product.getName())
                                                        .build())
                                        .setCurrency(ProductDAO.getProduct(product.getId()).getDefaultPriceObject()
                                                .getCurrency())
                                        .setUnitAmountDecimal(ProductDAO.getProduct(product.getId())
                                                .getDefaultPriceObject().getUnitAmountDecimal())
                                        // For subscriptions, you need to provide the details on how often they
                                        // would recur
                                        .setRecurring(PriceData.Recurring.builder()
                                                .setInterval(PriceData.Recurring.Interval.MONTH).build())
                                        .build())
                        .build());

        Session session = Session.create(paramsBuilder.build());

        return session.getUrl();
    }

}