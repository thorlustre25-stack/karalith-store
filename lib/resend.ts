import { Resend } from 'resend';
import {
  orderConfirmationEmail,
  orderShippedEmail,
  welcomeEmail,
  orderStatusEmail,
} from './emails/templates';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = 'KaraLITH <orders@karalith.com>';

export interface OrderConfirmationEmailProps {
  to: string;
  orderNumber: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface OrderStatusEmailProps {
  to: string;
  orderNumber: string;
  customerName: string;
  status: string;
  statusMessage: string;
  trackingNumber?: string;
}

export interface WelcomeEmailProps {
  to: string;
  firstName: string;
}

export async function sendOrderConfirmationEmail(props: OrderConfirmationEmailProps) {
  const html = orderConfirmationEmail({
    orderNumber: props.orderNumber,
    customerName: props.customerName,
    items: props.items,
    subtotal: props.subtotal,
    shipping: props.shipping,
    total: props.total,
    shippingAddress: props.shippingAddress,
  });

  return resend.emails.send({
    from: FROM_EMAIL,
    to: props.to,
    subject: `Order Confirmation - ${props.orderNumber}`,
    html,
  });
}

export async function sendOrderShippedEmail(
  to: string,
  orderNumber: string,
  customerName: string,
  trackingNumber: string
) {
  const html = orderShippedEmail(orderNumber, customerName, trackingNumber);

  return resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Your Order Has Shipped - ${orderNumber}`,
    html,
  });
}

export async function sendOrderStatusEmail(props: OrderStatusEmailProps) {
  const html = orderStatusEmail(
    props.orderNumber,
    props.customerName,
    props.status,
    props.statusMessage
  );

  return resend.emails.send({
    from: FROM_EMAIL,
    to: props.to,
    subject: `Order Update - ${props.orderNumber}`,
    html,
  });
}

export async function sendWelcomeEmail(props: WelcomeEmailProps) {
  const html = welcomeEmail(props.firstName);

  return resend.emails.send({
    from: FROM_EMAIL,
    to: props.to,
    subject: 'Welcome to KaraLITH!',
    html,
  });
}
