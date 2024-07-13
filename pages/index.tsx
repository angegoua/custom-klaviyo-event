import React, { useState } from "react";
import { X, ShoppingCartIcon } from "lucide-react";
import { Toaster } from "@/components/ui/toaster"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ShoppingCart = () => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [price] = useState(249);
  const [email, setEmail] = useState("");

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const { toast } = useToast()

  const sendKlaviyoABCartEvent = () => {
    fetch("/api/create-klaviyo-event", {
      method: "POST",
      body: JSON.stringify({price, email, size}),
    });


      toast({
        variant: "success",
        title: "Abandoned Cart Flow has been triggered",
        description: "Check your mail, you must receive an abandoned cart template mail in 5mins.",
      })
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster  />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">DEUXDONNA</h1>
        <button onClick={toggleCart} className="p-2">
          <ShoppingCartIcon />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src="https://cdn.prod.website-files.com/6650785c948382ff94f56977/665891c1b6d73d627f820928_1.jpg"
            alt="Leopard Print Mermaid Dress"
            className="w-full"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">
            Leopard Print Mermaid Dress
          </h2>
          <p className="text-xl mb-4">€ 249.00 EUR</p>
          <p className="mb-2">Tax included.</p>
          <div className="mb-4">
            <p className="mb-2">Size</p>
            <div className="flex gap-2">
              {["XS", "S", "M", "L"].map((s) => (
                <Button
                  key={s}
                  variant={size === s ? "default" : "outline"}
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
          <Button className="w-full mb-2" onClick={toggleCart}>
            Add to Bag
          </Button>
          <p className="mt-4">Handmade in Paris</p>
          <p>Model is 5'6 wearing an XS</p>
          <p>Worldwide shipping</p>
          <p>Size not listed ? Contact us for a custom order</p>
        </div>
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
          <Card className="w-full max-w-md h-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Your Cart
                <Button variant="ghost" size="icon" onClick={toggleCart}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <img
                  src="https://cdn.prod.website-files.com/6650785c948382ff94f56977/665891c1b6d73d627f820928_1.jpg"
                  alt="Leopard Print Mermaid Dress"
                  className="w-24"
                />
                <div>
                  <h3 className="font-bold">Leopard Print Mermaid Dress</h3>
                  <p>€ 249.00 EUR</p>
                  <p>Size: {size}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-16"
                    />
                    <Button variant="outline" size="icon">
                      <img
                        src="/api/placeholder/16/16"
                        alt="Delete"
                        className="w-4 h-4"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex justify-between w-full mb-4">
                <span>Subtotal</span>
                <span>€ {(249 * quantity).toFixed(2)} EUR</span>
              </div>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
              />
              <Button
                disabled={!email}
                onClick={sendKlaviyoABCartEvent}
                className="w-full mt-3"
              >
                Continue to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
