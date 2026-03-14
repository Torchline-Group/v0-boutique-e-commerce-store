"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Truck, ShieldCheck, Lock, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, totalItems } = useCart()
  const router = useRouter()
  const [step, setStep] = useState<"information" | "shipping" | "payment" | "confirmation">("information")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    shippingMethod: "standard",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    saveInfo: false,
  })

  const shippingCost = formData.shippingMethod === "express" ? 15.99 : formData.shippingMethod === "overnight" ? 29.99 : 5.99
  const tax = totalPrice * 0.08 // 8% tax
  const grandTotal = totalPrice + shippingCost + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitInformation = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("shipping")
  }

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate order number
    const orderNum = `DB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    setOrderNumber(orderNum)
    
    clearCart()
    setIsProcessing(false)
    setStep("confirmation")
  }

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart before checking out.</p>
            <Link href="/shop">
              <Button className="bg-primary hover:bg-primary/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl mb-2">Thank you for your order!</h1>
            <p className="text-muted-foreground mb-6">
              Your order has been confirmed and will be shipped soon.
            </p>
            <div className="bg-secondary/50 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="font-mono text-xl font-bold text-foreground">{orderNumber}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/shop">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Link href="/">
                <Button className="bg-primary hover:bg-primary/90">Back to Home</Button>
              </Link>
            </div>
          </div>
        </main>
        
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <Link href="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to shopping</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Forms */}
            <div className="order-2 lg:order-1">
              {/* Progress Steps */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`flex items-center gap-2 ${step === "information" ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === "information" ? "bg-primary text-primary-foreground" : 
                    step === "shipping" || step === "payment" ? "bg-green-500 text-white" : "bg-secondary"
                  }`}>
                    {step === "shipping" || step === "payment" ? <Check className="w-4 h-4" /> : "1"}
                  </div>
                  <span className="text-sm font-medium">Information</span>
                </div>
                <div className="h-px flex-1 bg-border" />
                <div className={`flex items-center gap-2 ${step === "shipping" ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === "shipping" ? "bg-primary text-primary-foreground" : 
                    step === "payment" ? "bg-green-500 text-white" : "bg-secondary"
                  }`}>
                    {step === "payment" ? <Check className="w-4 h-4" /> : "2"}
                  </div>
                  <span className="text-sm font-medium">Shipping</span>
                </div>
                <div className="h-px flex-1 bg-border" />
                <div className={`flex items-center gap-2 ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === "payment" ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}>
                    3
                  </div>
                  <span className="text-sm font-medium">Payment</span>
                </div>
              </div>

              {/* Information Step */}
              {step === "information" && (
                <form onSubmit={handleSubmitInformation} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone (optional)</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 555-5555"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Main St"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                        <Input
                          id="apartment"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          placeholder="Apt 4B"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            required
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, saveInfo: checked as boolean }))}
                    />
                    <Label htmlFor="saveInfo" className="text-sm text-muted-foreground">
                      Save this information for next time
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6">
                    Continue to Shipping
                  </Button>
                </form>
              )}

              {/* Shipping Step */}
              {step === "shipping" && (
                <form onSubmit={handleSubmitShipping} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl mb-6">Shipping Method</h2>
                    <RadioGroup
                      value={formData.shippingMethod}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, shippingMethod: value }))}
                      className="space-y-3"
                    >
                      <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.shippingMethod === "standard" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-muted-foreground">5-7 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">$5.99</span>
                      </label>
                      
                      <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.shippingMethod === "express" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="express" id="express" />
                          <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-sm text-muted-foreground">2-3 business days</p>
                          </div>
                        </div>
                        <span className="font-medium">$15.99</span>
                      </label>
                      
                      <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                        formData.shippingMethod === "overnight" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}>
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="overnight" id="overnight" />
                          <div>
                            <p className="font-medium">Overnight Shipping</p>
                            <p className="text-sm text-muted-foreground">Next business day</p>
                          </div>
                        </div>
                        <span className="font-medium">$29.99</span>
                      </label>
                    </RadioGroup>
                  </div>

                  <div className="bg-secondary/30 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Shipping to:</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}{formData.apartment && `, ${formData.apartment}`}<br />
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <button 
                      type="button"
                      onClick={() => setStep("information")}
                      className="text-sm text-primary hover:underline mt-2"
                    >
                      Edit address
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep("information")} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              )}

              {/* Payment Step */}
              {step === "payment" && (
                <form onSubmit={handleSubmitPayment} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl mb-6">Payment Details</h2>
                    
                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                      <Lock className="w-4 h-4" />
                      <span>All transactions are secure and encrypted</span>
                    </div>

                    <div className="border border-border rounded-lg p-4 space-y-4">
                      <div className="flex items-center gap-3 pb-4 border-b border-border">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <span className="font-medium">Credit Card</span>
                        <div className="ml-auto flex gap-2">
                          <div className="w-10 h-6 bg-[#1a1f71] rounded flex items-center justify-center text-white text-[8px] font-bold">VISA</div>
                          <div className="w-10 h-6 bg-[#eb001b] rounded flex items-center justify-center">
                            <div className="w-3 h-3 bg-[#f79e1b] rounded-full -mr-1" />
                            <div className="w-3 h-3 bg-[#eb001b] rounded-full" />
                          </div>
                          <div className="w-10 h-6 bg-[#006fcf] rounded flex items-center justify-center text-white text-[6px] font-bold">AMEX</div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          required
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          required
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            required
                            value={formData.expiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            type="password"
                            required
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength={4}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Shipping to:</span>
                      <button type="button" onClick={() => setStep("information")} className="text-primary hover:underline">
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formData.firstName} {formData.lastName}, {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span>Shipping method:</span>
                      <button type="button" onClick={() => setStep("shipping")} className="text-primary hover:underline">
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formData.shippingMethod === "standard" ? "Standard (5-7 days)" : 
                       formData.shippingMethod === "express" ? "Express (2-3 days)" : "Overnight (Next day)"} - ${shippingCost.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep("shipping")} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-primary hover:bg-primary/90"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        `Pay $${grandTotal.toFixed(2)}`
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Truck className="w-5 h-5" />
                  <span className="text-sm">Free Returns</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm">SSL Encrypted</span>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="order-1 lg:order-2">
              <div className="bg-secondary/30 rounded-xl p-6 sticky top-28">
                <h2 className="font-serif text-xl mb-6">Order Summary</h2>
                
                <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                        {item.product.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-muted-foreground text-xs">No image</span>
                          </div>
                        )}
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.product.collection}</p>
                      </div>
                      <span className="font-medium text-sm">
                        ${(item.product.displayPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
    </div>
  )
}
