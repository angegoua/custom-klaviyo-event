// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { email, size, product } = JSON.parse(req.body);


  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      revision: "2024-06-15",
      "content-type": "application/json",
      Authorization: `Klaviyo-API-Key ${process.env.KLAVIYO_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties: { abCartKey: "ch-started" },
          time: new Date().toISOString(),
          value: product?.price,
          value_currency: "EUR",
          metric: {
            data: {
              type: "metric",
              attributes: { name: "Custom Checkout Started" },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes: {
                phone_number: "+15005550006",
                first_name: "Teeest Klavio",
                last_name: "Test",
                organization: "Example Corporation",
                title: "Regional Manager",
                image: "",
                location: {
                  address1: "89 E 42nd St",
                  address2: "1st floor",
                  city: "New York",
                  country: "United States",
                  region: "NY",
                  zip: "10017",
                },
                properties: { size, ...product },
                meta: {
                  patch_properties: {
                    append: { newKey: "New Value" },
                    unappend: { newKey: "New Value" },
                    unset: "skus",
                  },
                },
                email,
              },
            },
          },
        },
      },
    }),
  };
  if (req.method === "POST") {
    try {
      const response = await fetch(
        "https://a.klaviyo.com/api/events/",
        options,
      );

      if (!response.ok) {
        const error = await response.text();
        console.error("Error response from Klaviyo API:", error);
        res.status(response.status).json({ message: "Error from Klaviyo API" });
        return;
      }

      res.status(200).json({ message: "Event sent to Klaviyo API" });
    } catch (err) {
      console.error("Fetch error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
