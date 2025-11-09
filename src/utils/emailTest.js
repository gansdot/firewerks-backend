import { sendOrderEmail } from "./emailService.ts";

(async () => {
  try {
    await sendOrderEmail("gansdot@yahoo.com", {
      _id: "TEST123",
      user: { name: "Tester" },
      items: [{ name: "Sample Item", quantity: 1, price: 99 }],
      total: 99,
      status: "Processing",
      createdAt: new Date(),
    });
    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
  }
})();
