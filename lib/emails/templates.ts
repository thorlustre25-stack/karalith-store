// Email templates for KaraLITH

const baseStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1a1a1a; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { text-align: center; padding: 30px 0; border-bottom: 1px solid #e5e5e5; }
  .logo { font-size: 28px; font-weight: bold; color: #254849; letter-spacing: 2px; }
  .content { padding: 40px 0; }
  .footer { text-align: center; padding: 30px 0; border-top: 1px solid #e5e5e5; font-size: 12px; color: #737373; }
  .button { display: inline-block; padding: 12px 30px; background-color: #254849; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
  .order-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  .order-table th, .order-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e5e5; }
  .total-row { font-weight: bold; }
  h1 { color: #254849; margin-bottom: 10px; }
  h2 { color: #254849; font-size: 18px; margin-top: 30px; margin-bottom: 15px; }
  .highlight { background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
`;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
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

export function orderConfirmationEmail(data: OrderEmailData): string {
  const itemRows = data.items
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td style="text-align: center;">${item.quantity}</td>
        <td style="text-align: right;">€${item.price.toFixed(2)}</td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">KaraLITH</div>
        </div>

        <div class="content">
          <h1>Thank you for your order!</h1>
          <p>Hi ${data.customerName},</p>
          <p>We've received your order and are getting it ready. We'll send you another email when your order ships.</p>

          <div class="highlight">
            <strong>Order Number:</strong> ${data.orderNumber}
          </div>

          <h2>Order Summary</h2>
          <table class="order-table">
            <thead>
              <tr>
                <th>Item</th>
                <th style="text-align: center;">Qty</th>
                <th style="text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
              <tr>
                <td colspan="2">Subtotal</td>
                <td style="text-align: right;">€${data.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2">Shipping</td>
                <td style="text-align: right;">${
                  data.shipping === 0 ? 'Free' : `€${data.shipping.toFixed(2)}`
                }</td>
              </tr>
              <tr class="total-row">
                <td colspan="2">Total</td>
                <td style="text-align: right;">€${data.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <h2>Shipping Address</h2>
          <p>
            ${data.shippingAddress.street}<br>
            ${data.shippingAddress.city}, ${data.shippingAddress.postalCode}<br>
            ${data.shippingAddress.country}
          </p>

          <p style="margin-top: 30px;">
            <a href="https://karalith.com/account/orders" class="button">
              View Order Status
            </a>
          </p>
        </div>

        <div class="footer">
          <p>KaraLITH - Sustainable Luxury Jewelry</p>
          <p>Carrer de Valencia, 123, 08011 Barcelona, Spain</p>
          <p>
            <a href="https://karalith.com">Visit our store</a> |
            <a href="https://karalith.com/contact">Contact us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function orderShippedEmail(
  orderNumber: string,
  customerName: string,
  trackingNumber: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">KaraLITH</div>
        </div>

        <div class="content">
          <h1>Your order is on its way!</h1>
          <p>Hi ${customerName},</p>
          <p>Great news! Your order has been shipped and is on its way to you.</p>

          <div class="highlight">
            <strong>Order Number:</strong> ${orderNumber}<br>
            <strong>Tracking Number:</strong> ${trackingNumber}
          </div>

          <p>You can track your package using the tracking number above.</p>

          <p style="margin-top: 30px;">
            <a href="https://karalith.com/account/orders" class="button">
              View Order Details
            </a>
          </p>
        </div>

        <div class="footer">
          <p>KaraLITH - Sustainable Luxury Jewelry</p>
          <p>Carrer de Valencia, 123, 08011 Barcelona, Spain</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function welcomeEmail(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">KaraLITH</div>
        </div>

        <div class="content">
          <h1>Welcome to KaraLITH!</h1>
          <p>Hi ${firstName},</p>
          <p>Thank you for creating an account with KaraLITH. We're thrilled to have you join our community of jewelry lovers.</p>

          <p>With your account, you can:</p>
          <ul>
            <li>Track your orders easily</li>
            <li>Save items to your wishlist</li>
            <li>Manage your shipping addresses</li>
            <li>Get early access to new collections</li>
          </ul>

          <p style="margin-top: 30px;">
            <a href="https://karalith.com/shop" class="button">
              Start Shopping
            </a>
          </p>
        </div>

        <div class="footer">
          <p>KaraLITH - Sustainable Luxury Jewelry</p>
          <p>Carrer de Valencia, 123, 08011 Barcelona, Spain</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function orderStatusEmail(
  orderNumber: string,
  customerName: string,
  status: string,
  statusMessage: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">KaraLITH</div>
        </div>

        <div class="content">
          <h1>Order Update</h1>
          <p>Hi ${customerName},</p>
          <p>${statusMessage}</p>

          <div class="highlight">
            <strong>Order Number:</strong> ${orderNumber}<br>
            <strong>Status:</strong> ${status}
          </div>

          <p style="margin-top: 30px;">
            <a href="https://karalith.com/account/orders" class="button">
              View Order Details
            </a>
          </p>
        </div>

        <div class="footer">
          <p>KaraLITH - Sustainable Luxury Jewelry</p>
          <p>Carrer de Valencia, 123, 08011 Barcelona, Spain</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
